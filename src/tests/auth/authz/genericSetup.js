import {getAuthToken} from "../../../common/utils.js";
import {logErrorResult} from "../../../common/dynamicScenarios/utils.js";
import {CONFIG} from "../../../common/envVars.js";
import {getOrganizationOperators} from "../../../api/auth/authz/auth.js";

// Utility function to set up the test environment
export function setupTestEnvironment(testName) {
    const ipaCode = CONFIG.CONTEXT.ORG_IPA_CODE;
    const token = getAuthToken();
    const result = getOrganizationOperators(token, ipaCode);
    const body = result.json();

    // Validate the response content
    if (!body.content || !Array.isArray(body.content) || body.content.length === 0) {
        logErrorResult(testName, `Invalid or empty content in response getOrganizationOperators`, result, true);
        return null;
    }

    const firstOperator = body.content[0];
    if (!firstOperator.mappedExternalUserId) {
        logErrorResult(testName, `Missing required fields in the first operator of getOrganizationOperators`, result, true);
        return null;
    }

    return {
        token: token,
        mappedExternalUserId: firstOperator.mappedExternalUserId,
        ipaCode
    };
}
