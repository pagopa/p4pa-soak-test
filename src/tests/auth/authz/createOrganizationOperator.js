import { assert, statusOk } from "../../../common/assertions.js";
import {
  AUTH_API_NAMES,
  createOrganizationOperator
} from "../../../api/auth/authz/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../../common/dynamicScenarios/defaultOptions.js";
import {
  logErrorResult,
  testEntitiesBasedScenariosBaseIndexRetriever,
} from "../../../common/dynamicScenarios/utils.js";
import {getAuthToken, randomFiscalCode} from "../../../common/utils.js";
import { CONFIG } from "../../../common/envVars.js";

const application = "auth";
const testName = "createOrganizationOperator";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [AUTH_API_NAMES.createOrganizationOperator] // applying apiName tags to thresholds
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
  let createOperatorRequest = {
      firstName: 'Mario',
      lastName: 'Rossi',
      externalUserId: CONFIG.CONTEXT.EXTERNAL_USER_ID,
      fiscalCode: randomFiscalCode(),
      organizationIpaCode: ipaCode,
      email: 'rossi@mail.it',
      roles: []
  };

  const result = createOrganizationOperator(data.token, ipaCode, createOperatorRequest);

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected createOrganizationOperator status`, result, true);
  }
};
