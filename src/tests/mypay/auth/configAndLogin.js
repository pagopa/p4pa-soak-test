import { assert, statusOk } from "../../../common/assertions.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../../common/dynamicScenarios/utils.js";
import {
  configAndLogin,
  MYPAY_AUTH_API_NAMES,
} from "../../../api/mypay/auth.js";

const application = "mypay/auth";
const testName = "configAndLogin";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [MYPAY_AUTH_API_NAMES.configAndLogin] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// Test
export default () => {
  const result = configAndLogin();

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected configAndLogin status`, result, true);
  }
};
