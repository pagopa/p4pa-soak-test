import http from "k6/http";
import { logResult } from "../../../common/dynamicScenarios/utils.js";
import { buildDefaultParams, CONFIG } from "../../../common/envVars.js";
import { getBaseUrl, getInnerBaseUrl } from "../../../common/environment.js";

export const AUTH_API_NAMES = {
  registerClient: "auth/registerClient",
  revokeClient: "auth/revokeClient",
  createOrganizationOperator: "auth/createOrganizationOperator"
};

const innerBaseUrl = `${getInnerBaseUrl()}/p4paauth`;
const baseUrl = CONFIG.USE_INTERNAL_ACCESS_ENV ? innerBaseUrl : `${getBaseUrl()}`;

export function registerClient(token, ipaCode, clientName) {
  const apiName = AUTH_API_NAMES.registerClient;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.post(
    `${baseUrl}/payhub/auth/clients/${ipaCode}`,
    JSON.stringify({ clientName }),
    myParams
  );
  logResult(apiName, res);
  return res;
}

export function revokeClient(token, ipaCode, clientId) {
  const apiName = AUTH_API_NAMES.revokeClient;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.del(
    `${baseUrl}/payhub/auth/clients/${ipaCode}/${clientId}`,
    undefined,
    myParams
  );
  logResult(apiName, res);
  return res;
}

export function createOrganizationOperator(token, organizationIpaCode, clientOperatorRequest) {
  const apiName = AUTH_API_NAMES.createOrganizationOperator;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrl}/payhub/am/operators/${organizationIpaCode}`;

  const res = http.post(
      url,
      JSON.stringify(clientOperatorRequest),
      myParams);
  logResult(apiName, res);

  return res;
}