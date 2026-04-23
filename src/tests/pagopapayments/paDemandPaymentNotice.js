import { assert, statusOk } from "../../common/assertions.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import {
  paDemandPaymentNotice,
  PAGOPA_PAYMENTS_API_NAMES,
} from "../../api/pagopapayments/paDemandPaymentNotice.js";
import { getOrganizations } from "../../api/cie/organizationCie.js";
import { abort, getAuthToken, getRandom } from "../../common/utils.js";
import { getDebtPositionTypeOrgsWithSpontaneous } from "../../api/citizen/debtPositionTypeOrg.js";
import { getBroker } from "../../api/organization/brokerEntity.js"
import { getOrganizationsWithSpontaneous } from "../../api/citizen/organization.js";
import { CONFIG } from "../../common/envVars.js";
import { getUserInfo } from "../../api/auth/authn/auth.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { DemandPaymentNotice, RequestData } from "../../model/pagopapayments/demandPaymentNoticeCie.js";
import { getRandomDebtPositionTypeOrgCodeCie } from "../../common/debtPositionUtils.js";

const application = "pagopapayments/paDemandPaymentNotice";
const testName = "paDemandPaymentNotice";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [PAGOPA_PAYMENTS_API_NAMES.paDemandPaymentNotice], // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export function setup() {
  const authToken = getAuthToken();
  const userinfo = getUserInfo(authToken);
  const brokerId = CONFIG.CONTEXT.BROKER_ID_CIE;

  const organizationCie = getRandomCieOrganization();
  const debtPositionTypeOrgCode = getRandomDebtPositionTypeOrgCodeCie();
  const organizationWithSpontaneous = getRandomOrganizationWithSpontaneousResult(brokerId, authToken);
  const debtPositionTypeOrgsWithSpontaneous =
    getDebtPositionTypeOrgsWithSpontaneousResult(
      brokerId,
      organizationWithSpontaneous.organizationId,
      debtPositionTypeOrgCode,
      authToken
    );
  const broker = getBrokerResult(brokerId, authToken);

  const paDemandPaymentNoticeRequest = new DemandPaymentNotice(
    organizationWithSpontaneous.orgFiscalCode,
    broker.fiscalCode,
    CONFIG.CONTEXT.PAGOPA_PAYMENTS.SERVICE_ID,
    broker.stationId,
    CONFIG.CONTEXT.PAGOPA_PAYMENTS.SERVICE_SUBJECT_ID,
    new RequestData(
      debtPositionTypeOrgCode,
      organizationCie.value,
      userinfo.fiscalCode,
      userinfo.familyName,
    )
  );

  return {
    token: authToken,
    paDemandPaymentNoticeRequest
  };
}

// Test
export default (data) => {
  const result = paDemandPaymentNotice(
    data.paDemandPaymentNoticeRequest,
    data.token
  );

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected ${testName} status`, result, true);
  }
};

const getRandomCieOrganization = () => {
  const organizations = getOrganizations().json().result;
  if (organizations.length === 0) {
    abort(
      "No elements found in organizations CIE list please restart test with at least one element",
    );
  }

  return getRandom(organizations);
};

const getRandomOrganizationWithSpontaneousResult = (brokerId, authToken) => {
  const organizations = getOrganizationsWithSpontaneous(brokerId, authToken).json();
  if (organizations.length === 0) {
    abort(
      "No elements found in organizations list please restart test with at least one element",
    );
  }

  return getRandom(organizations);
};

const getDebtPositionTypeOrgsWithSpontaneousResult = (
  brokerId,
  organizationId,
  code,
  authToken,
) => {
  const debtPositionTypeOrgsWithSpontaneous =
    getDebtPositionTypeOrgsWithSpontaneous(
      brokerId,
      organizationId,
      authToken,
    ).json();
  if (debtPositionTypeOrgsWithSpontaneous.length === 0) {
    abort(
      "No elements found in debtPositionTypeOrgsWithSpontaneous list please restart test with at least one element",
    );
  }
  const debtPositionTypeOrg = debtPositionTypeOrgsWithSpontaneous.find(
    (dpto) => dpto.code == code,
  );
  if (debtPositionTypeOrg == null) {
    abort("No debtPositionTypeOrg found");
  }

  return debtPositionTypeOrg;
};

const getBrokerResult = (brokerId, authToken) => {
  const broker = getBroker(brokerId, authToken).json();
  if (broker == null) {
    abort("No broker found");
  }

  return broker;
};
