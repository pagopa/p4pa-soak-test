import { assert, statusOk } from "../../common/assertions.js"
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { CIE_API_NAMES } from "../../api/cie/organizationCie.js";
import { getOrganizations } from "../../api/cie/organizationCie.js"

const application = "cie/organizationCie";
const testName = "getOrganizations";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [CIE_API_NAMES.getOrganizations] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// Test
export default () => {
  const result = getOrganizations();

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected ${testName} status`, result, true);
  }
};
