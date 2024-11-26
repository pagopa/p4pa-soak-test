import {assert, statusOk} from "../../../common/assertions.js";
import {
    AUTH_API_NAMES,
    getClients,
    getClientSecret
} from "../../../api/auth/authz/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import {defaultApiOptionsBuilder} from "../../../common/dynamicScenarios/defaultOptions.js";
import {
    logErrorResult,
} from "../../../common/dynamicScenarios/utils.js";
import {getAuthToken} from "../../../common/utils.js";
import {CONFIG} from "../../../common/envVars.js";

const application = "auth";
const testName = "getClientSecret";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
    application,
    testName,
    [AUTH_API_NAMES.getClientSecret] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

// BeforeAll
export function setup() {
    const ipaCode = CONFIG.CONTEXT.ORG_IPA_CODE;
    const token = getAuthToken();
    const result = getClients(token, ipaCode);

    const body = result.json();
    return {
        token,
        clientId: body[0].clientId,
        ipaCode: body[0].organizationIpaCode
    };
}

// Test
export default (data) => {
    const result = getClientSecret(data.token, data.ipaCode, data.clientId);

    assert(result, [statusOk()]);

    if (result.status !== 200) {
        logErrorResult(testName, `Unexpected getClientSecret status`, result, true);
    }
};