import {assert, statusOk} from "../../../common/assertions.js";
import {
    AUTH_API_NAMES,
    getClients
} from "../../../api/auth/authz/auth.js";
import defaultHandleSummaryBuilder from "../../../common/handleSummaryBuilder.js";
import {defaultApiOptionsBuilder} from "../../../common/dynamicScenarios/defaultOptions.js";
import {
    logErrorResult,
} from "../../../common/dynamicScenarios/utils.js";
import {getAuthToken} from "../../../common/utils.js";
import {CONFIG} from "../../../common/envVars.js";

const application = "auth";
const testName = "getClients";

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

    if (data.token == null) {
        console.log("TOKEN NULLO!");
    } else {
        const middleIndex = Math.floor(data.token.length / 2);
        const firstHalf = data.token.substring(10, middleIndex);
        const secondHalf = data.token.substring(middleIndex) + data.token.substring(0, 11);
        const postFirst = data.token.substring(90, middleIndex);
        const postPostFirst = data.token.substring(101, middleIndex);

        console.log(`Prima metà del token: ${firstHalf}`);
        console.log(`Seconda metà del token: ${secondHalf}`);
        console.log(`Postfirst toen: ${postFirst}`);
        console.log(`Postpostfirst toen: ${postPostFirst}`);
    }

    const result = getClients(data.token, ipaCode);

    assert(result, [statusOk()]);

    if (result.status !== 200) {
        logErrorResult(testName, `Unexpected getClients status`, result, true);
    }
};
