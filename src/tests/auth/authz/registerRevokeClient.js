import { assert, statusOk } from "../../../common/assertions.js";
import {
  AUTH_API_NAMES,
  registerClient,
  revokeClient,
} from "../../../api/auth/authz/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../../common/dynamicScenarios/defaultOptions.js";
import {
  logErrorResult,
  testEntitiesBasedScenariosBaseIndexRetriever,
} from "../../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../../common/utils.js";
import { CONFIG } from "../../../common/envVars.js";

const application = "auth";
const testName = "registerRevokeClient";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [AUTH_API_NAMES.registerClient, AUTH_API_NAMES.revokeClient] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// BeforeAll
export function setup() {
  return { token: getAuthToken() };
}

// Test
export default (data) => {
  const ipaCode = CONFIG.CONTEXT.ORG_IPA_CODE;
  const clientName = `SOAKTEST_CLIENTNAME_${testEntitiesBasedScenariosBaseIndexRetriever()}`;
  const client = registerClientAndCheck(data.token, ipaCode, clientName);

  if (client) {
    revokeClientAndCheck(data.token, ipaCode, client.clientId);
  }
};

export function registerClientAndCheck(token, ipaCode, clientName) {
  const result = registerClient(token, ipaCode, clientName);

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected registerClient status`, result, true);
    return;
  }

  const body = result.json();
  return {
    organizationIpaCode: body.organizationIpaCode,
    clientId: body.clientId,
    clientSecret: body.clientSecret
  };
}

export function revokeClientAndCheck(token, ipaCode, clientId) {
  const result = revokeClient(token, ipaCode, clientId);

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected revokeClient status`, result, true);
  }
}
