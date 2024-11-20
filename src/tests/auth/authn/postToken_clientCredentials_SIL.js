import { assert, statusOk } from "../../../common/assertions.js";
import { AUTH_API_NAMES, postToken_clientCredentials } from "../../../api/auth/authn/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../../common/dynamicScenarios/utils.js";
import { CONFIG } from "../../../common/envVars.js";
import {
  registerClientAndCheck,
  revokeClientAndCheck,
} from "../authz/registerRevokeClient.js";
import { getAuthToken } from "../../../common/utils.js";

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

// BeforeAll
export function setup() {
  const token = getAuthToken();
  return {
    token,
    client: registerClientAndCheck(
      token,
      CONFIG.CONTEXT.ORG_IPA_CODE,
      "postToken_clientCredentials_PU"
    ),
  };
}

// AfterAll
export function teardown(data) {
  revokeClientAndCheck(
    data.token,
    data.client.organizationIpaCode,
    data.client.clientId
  );
}

// Test
export default (data) => {
  const result = postToken_clientCredentials(
    data.client.clientId,
    data.client.clientSecret
  );

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected postToken status`, result, true);
  }
};
