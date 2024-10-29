import { assert, statusOk } from "../../common/assertions.js";
import { getUserInfo, AUTH_API_NAMES } from "../../api/auth.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../common/utils.js";

const application = "auth";
const testName = "getUserInfo";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [AUTH_API_NAMES.getUserInfo] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// BeforeAll
export function setup() {
  return { token: getAuthToken() };
}

// Test
export default (data) => {
  const result = getUserInfo(data.token);

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected getUserInfo status`, result, true);
  }
};
