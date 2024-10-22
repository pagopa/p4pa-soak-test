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

export function setup() {
  return { token: getAuthToken() };
}

export default (data) => {
  const getAuthTokenResult = getUserInfo(data.token);

  assert(getAuthTokenResult, [statusOk()]);

  if (getAuthTokenResult.status !== 200) {
    logErrorResult(
      testName,
      `Unexpected getAuthToken status`,
      getAuthTokenResult,
      true
    );
  }
};
