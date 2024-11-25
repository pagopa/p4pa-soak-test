import {assert, statusOk} from "../../../common/assertions.js";
import {
    AUTH_API_NAMES, getOrganizationOperator
} from "../../../api/auth/authz/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import {defaultApiOptionsBuilder} from "../../../common/dynamicScenarios/defaultOptions.js";
import {
    logErrorResult,
} from "../../../common/dynamicScenarios/utils.js";
import {setupTestEnvironment} from "./genericSetup.js";

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
    return setupTestEnvironment(testName);
}

// Test
export default (data) => {
    const result = getOrganizationOperator(data.token, data.ipaCode, data.mappedExternalUserId);

    assert(result, [statusOk()]);

    if (result.status !== 200) {
        logErrorResult(testName, `Unexpected getOrganizationOperator status`, result, true);
    }
};
