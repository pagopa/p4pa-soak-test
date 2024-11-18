import { assert, statusOk } from "../../../common/assertions.js";
import { logout, AUTH_API_NAMES } from "../../../api/auth/authn/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../../common/utils.js";
import {CONFIG} from "../../../common/envVars.js";

const application = "auth";
const testName = "logout";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
    application,
    testName,
    [AUTH_API_NAMES.logout]
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// BeforeAll
export function setup() {
  return { token: getAuthToken() };
}

// Test
export default (data) => {
  const clientId = `${CONFIG.CONTEXT.AUTH.PU.CLIENT_ID}_${CONFIG.CONTEXT.ORG_IPA_CODE}`;
  const result = logout(clientId, data.token);

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected logout status`, result, true);
  }
};
