import { assert, statusOk } from "../../../common/assertions.js";
import { AUTH_API_NAMES, postToken_clientCredentials } from "../../../api/auth/authn/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../../common/dynamicScenarios/utils.js";
import { CONFIG } from "../../../common/envVars.js";

const application = "auth";
const testName = "postToken_clientCredentials_PU";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [AUTH_API_NAMES.postToken] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// Test
export default () => {
  const result = postToken_clientCredentials(
    `${CONFIG.CONTEXT.AUTH.PU.CLIENT_ID}_${CONFIG.CONTEXT.ORG_IPA_CODE}`,
    CONFIG.CONTEXT.AUTH.PU.CLIENT_SECRET
  );

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected postToken status`, result, true);
  }
};
