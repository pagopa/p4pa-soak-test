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
const testName = "getClientsAndClientSecret";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
    application,
    testName,
    [AUTH_API_NAMES.getClients] // applying apiName tags to thresholds
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

    const client = getClientsAndCheck(data.token, ipaCode);

    if (client) {
        getClientSecretAndCheck(data.token, ipaCode, client.clientId);
    }
};

export function getClientsAndCheck(token, ipaCode) {
    const result = getClients(token, ipaCode);

    assert(result, [statusOk()]);

    if (result.status !== 200) {
        logErrorResult(testName, `Unexpected getClients status`, result, true);
        return;
    }

    const body = result.json();
    return {
        clientId: body[0].clientId,
        clientName: body[0].clientName,
        organizationIpaCode: body[0].organizationIpaCode
    };
}

export function getClientSecretAndCheck(token, ipaCode, clientId) {
    const result = getClientSecret(token, ipaCode, clientId);

    assert(result, [statusOk()]);

    if (result.status !== 200) {
        logErrorResult(testName, `Unexpected getClientSecret status`, result, true);
    }
}