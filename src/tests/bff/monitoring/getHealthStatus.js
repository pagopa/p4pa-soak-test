import { assert, statusOk } from "../../../common/assertions.js";
import { getHealthStatus, PU_BFF_API_NAMES } from "../../../api/bff/monitoring/health.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../../common/dynamicScenarios/utils.js";

const application = "bff/monitoring";
const testName = "getHealthStatus";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [PU_BFF_API_NAMES.getHealthStatus] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// Test
export default () => {
  const result = getHealthStatus();

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected getHealthStatus status`, result, true);
  }
};
