import {assert, statusOk} from "../../common/assertions.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import {defaultApiOptionsBuilder} from "../../common/dynamicScenarios/defaultOptions.js";
import {FILESHARE_API_NAMES, uploadIngestionFlowFile,} from "../../api/fileshare/ingestionFlowFile.js";
import {getOrganizationByIpaCode} from "../../api/organization/organization.js";
import {abort, getAuthToken} from "../../common/utils.js";
import {CONFIG} from "../../common/envVars.js";
import {buildSendNotificationRows, buildSendNotificationZip,} from "../../common/sendUtils.js";

const application = "send";
const testName = "uploadSendNotificationFile";

// Dynamic scenarios' K6 configuration
export const options = Object.assign(
  defaultApiOptionsBuilder(
    application,
    testName,
    [FILESHARE_API_NAMES.uploadIngestionFlowFile],
  ),
  {
    scenarios: {
      [testName]: { executor: "per-vu-iterations", vus: 1, iterations: 1 },
    },
  },
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export function setup() {
  if (!isNotificationsNumberSet()) {
    console.log(
      `${testName} -> Skipped: SEND_NOTIFICATIONS_NUMBER_ENV must be greater than 0`,
    );
    return {};
  }

  const authToken = getAuthToken();

  return {
    token: authToken,
    organization: getOrganizationResult(authToken),
    timestamp: Date.now(),
  };
}

// Test
export default (data) => {
  if (!isNotificationsNumberSet()) {
    return;
  }

  const fileName = `SendCampaignSoakTest_${data.timestamp}-1_0`;
  const rows = buildSendNotificationRows(
    CONFIG.CONTEXT.SEND.NOTIFICATIONS_NUMBER,
    `PROT_SOAK_${data.timestamp}`,
    `SOAK_TEST_${data.timestamp}`,
    data.organization,
  );

  const result = uploadIngestionFlowFile(
    data.organization.organizationId,
    "SEND_NOTIFICATION",
    `${fileName}.zip`,
    buildSendNotificationZip(`${fileName}.csv`, rows),
    data.token,
  );

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    console.error(
      `${testName} -> Unexpected ${testName} status (${result.status}) - ${result.body}`,
    );
  }
};

const getOrganizationResult = (authToken) => {
  const result = getOrganizationByIpaCode(CONFIG.CONTEXT.ORG_IPA_CODE, authToken);
  if (result.status !== 200) {
    abort(`No organization found with ipaCode ${CONFIG.CONTEXT.ORG_IPA_CODE}`);
  }

  return result.json();
};

const isNotificationsNumberSet = () =>
  CONFIG.CONTEXT.SEND.NOTIFICATIONS_NUMBER > 0;
