import http from "k6/http";
import { logResult } from "../../../common/dynamicScenarios/utils.js";
import {buildDefaultParams, CONFIG} from "../../../common/envVars.js";
import authConfig from "../url.js";

export const AUTH_API_NAMES = {
  registerClient: "auth/registerClient",
  revokeClient: "auth/revokeClient",
  deleteOrganizationOperator: "auth/deleteOrganizationOperator",
  getClients: "auth/getClients",
  getClientSecret: "auth/getClientSecret",
  getOrganizationOperator: "auth/getOrganizationOperator",
  getOrganizationOperators: "auth/getOrganizationOperators",
  getUserInfoFromMappedExternaUserId: "auth/getUserInfoFromMappedExternaUserId"
};

const baseUrl = CONFIG.USE_INTERNAL_ACCESS_ENV
    ? authConfig.fullInnerBaseUrl
    : authConfig.fullBaseUrl;

export function registerClient(token, ipaCode, clientName) {
  const apiName = AUTH_API_NAMES.registerClient;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.post(
    `${baseUrl}/auth/clients/${ipaCode}`,
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
    `${baseUrl}/auth/clients/${ipaCode}/${clientId}`,
    undefined,
    myParams
  );
  logResult(apiName, res);
  return res;
}

export function deleteOrganizationOperator(token, organizationIpaCode, mappedExternalUserId) {
  const apiName = AUTH_API_NAMES.deleteOrganizationOperator;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrl}/am/operators/${organizationIpaCode}/${mappedExternalUserId}`;

  const res = http.del(
      url,
      null,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getClients(token, organizationIpaCode) {
  const apiName = AUTH_API_NAMES.getClients;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrl}/auth/clients/${organizationIpaCode}`;

  const res = http.get(
      url,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getClientSecret(token, organizationIpaCode, clientId) {
  const apiName = AUTH_API_NAMES.getClientSecret;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrl}/auth/clients/${organizationIpaCode}/${clientId}`;

  const res = http.get(
      url,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getOrganizationOperator(token, organizationIpaCode, mappedExternalUserId) {
  const apiName = AUTH_API_NAMES.getOrganizationOperator;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrl}/am/operators/${organizationIpaCode}/${mappedExternalUserId}`;

  const res = http.get(
      url,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getOrganizationOperators(token, organizationIpaCode) {
  const apiName = AUTH_API_NAMES.getOrganizationOperators;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrl}/am/operators/${organizationIpaCode}`;

  const res = http.get(
      url,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getUserInfoFromMappedExternaUserId(token, mappedExternalUserId) {
  const apiName = AUTH_API_NAMES.getUserInfoFromMappedExternaUserId;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrl}/auth/userinfo/${mappedExternalUserId}`;

  const res = http.get(
      url,
      myParams);
  logResult(apiName, res);

  return res;
}