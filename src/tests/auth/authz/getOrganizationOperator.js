import {assert, statusOk} from "../../../common/assertions.js";
import {
    AUTH_API_NAMES,
    getOrganizationOperator
} from "../../../api/auth/authz/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import {defaultApiOptionsBuilder} from "../../../common/dynamicScenarios/defaultOptions.js";
import {
    logErrorResult,
} from "../../../common/dynamicScenarios/utils.js";
import {getAuthToken} from "../../../common/utils.js";
import {CONFIG} from "../../../common/envVars.js";

const application = "auth";
const testName = "getOrganizationOperator";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
    application,
    testName,
    [AUTH_API_NAMES.getOrganizationOperator] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// BeforeAll
export function setup() {
    return {token: getAuthToken()};
}

// Test
export default (data) => {
    const ipaCode = CONFIG.CONTEXT.ORG_IPA_CODE;
    const mappedExternalUserId = CONFIG.CONTEXT.EXTERNAL_USER_ID;

    const result = getOrganizationOperator(data.token, ipaCode, mappedExternalUserId);

    assert(result, [statusOk()]);

    if (result.status !== 200) {
        logErrorResult(testName, `Unexpected getOrganizationOperator status`, result, true);
    }
};