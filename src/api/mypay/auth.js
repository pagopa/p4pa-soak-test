import http from "k6/http";
import { logResult } from "../../common/dynamicScenarios/utils.js";
import { buildDefaultParams, CONFIG } from "../../common/envVars.js";
import { getBaseUrl } from "../../common/environment.js";

export const MYPAY_AUTH_API_NAMES = {
  configAndLogin: "mypay/auth/configAndLogin",
};

const baseUrl = `${getBaseUrl()}/payhub`;

export function configAndLogin() {
  const apiName = MYPAY_AUTH_API_NAMES.configAndLogin;
  const myParams = buildDefaultParams(apiName);

  const res = http.post(
    `${baseUrl}/public/info/configAndLogin`,
    CONFIG.CONTEXT.AUTH.SELFCARE.TOKEN_EXCHANGE,
    myParams
  );
  logResult(apiName, res);
  return res;
}
