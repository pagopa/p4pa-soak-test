import {assert, statusOk} from "../../../common/assertions.js";
import {
    AUTH_API_NAMES,
    getOrganizationOperator,
    getOrganizationOperators
} from "../../../api/auth/authz/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import {defaultApiOptionsBuilder} from "../../../common/dynamicScenarios/defaultOptions.js";
import {
    logErrorResult,
} from "../../../common/dynamicScenarios/utils.js";
import {getAuthToken} from "../../../common/utils.js";
import {CONFIG} from "../../../common/envVars.js";

const application = "auth";
const testName = "getAllOperatorsAndSingle";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
    application,
    testName,
    [AUTH_API_NAMES.getOrganizationOperators] // applying apiName tags to thresholds
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
    const allOperators = getAllOrganizationOperators(data.token, ipaCode);

    if (allOperators) {
        getSingleOrganizationOperator(data.token, ipaCode, allOperators.mappedExternalUserId);
    }
};

export function getAllOrganizationOperators(token, ipaCode) {
    const result = getOrganizationOperators(token, ipaCode);

    assert(result, [statusOk()]);

    if (result.status !== 200) {
        logErrorResult(testName, `Unexpected getOrganizationOperators status`, result, true);
        return;
    }

    const body = result.json();
    if (!body.content || !Array.isArray(body.content) || body.content.length === 0) {
        logErrorResult(testName, `Invalid or empty content in response`, result, true);
        return;
    }

    const firstOperator = body.content[0];

    if (!firstOperator.userId ||
        !firstOperator.mappedExternalUserId ||
        !firstOperator.organizationIpaCode
    ) {
        logErrorResult(testName, `Missing required fields in the first operator`, result, true);
        return;
    }

    return {
        userId: firstOperator.userId,
        mappedExternalUserId: firstOperator.mappedExternalUserId,
        organizationIpaCode: firstOperator.organizationIpaCode
    };
}

export function getSingleOrganizationOperator(token, ipaCode, mappedExternalUserId) {
    const result = getOrganizationOperator(token, ipaCode, mappedExternalUserId);

    assert(result, [statusOk()]);

    if (result.status !== 200) {
        logErrorResult(testName, `Unexpected getOrganizationOperator status`, result, true);
    }
}