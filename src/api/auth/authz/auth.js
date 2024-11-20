import http from "k6/http";
import { logResult } from "../../../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../../../common/envVars.js";
import {getBaseUrlAuth} from "../../../common/environment.js";
import {randomFiscalCode} from "../../../common/utils.js";

export const AUTH_API_NAMES = {
  registerClient: "auth/registerClient",
  revokeClient: "auth/revokeClient",
  createOrganizationOperator: "auth/createOrganizationOperator",
  deleteOrganizationOperator: "auth/deleteOrganizationOperator",
  getClientSecret: "auth/getClientSecret",
  getClients: "auth/getClients",
  getOrganizationOperator: "auth/getOrganizationOperator",
  getOrganizationOperators: "auth/getOrganizationOperators",
  getUserInfoFromMappedExternaUserId: "auth/getUserInfoFromMappedExternaUserId"
};

const baseUrlAuth = `${getBaseUrlAuth()}`;

export function registerClient(token, ipaCode, clientName) {
  const apiName = AUTH_API_NAMES.registerClient;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.post(
    `${baseUrlAuth}/auth/clients/${ipaCode}`,
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
    `${baseUrlAuth}/auth/clients/${ipaCode}/${clientId}`,
    undefined,
    myParams
  );
  logResult(apiName, res);
  return res;
}

export function deleteOrganizationOperator(token, organizationIpaCode, mappedExternalUserId) {
  const apiName = AUTH_API_NAMES.deleteOrganizationOperator;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrlAuth}/am/operators/${organizationIpaCode}/${mappedExternalUserId}`;

  const res = http.del(
      url,
      null,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getClientSecret(token, organizationIpaCode, clientId) {
  const apiName = AUTH_API_NAMES.getClientSecret;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrlAuth}/auth/clients/${organizationIpaCode}/${clientId}`;

  const res = http.get(
      url,
      null,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getClients(token, organizationIpaCode) {
  const apiName = AUTH_API_NAMES.getClientSecret;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrlAuth}/auth/clients/${organizationIpaCode}`;

  const res = http.get(
      url,
      null,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getOrganizationOperator(token, organizationIpaCode, mappedExternalUserId) {
  const apiName = AUTH_API_NAMES.getOrganizationOperator;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrlAuth}/am/operators/${organizationIpaCode}/${mappedExternalUserId}`;

  const res = http.get(
      url,
      null,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getOrganizationOperators(token, organizationIpaCode) {
  const apiName = AUTH_API_NAMES.getOrganizationOperators;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrlAuth}/am/operators/${organizationIpaCode}`;
  url.searchParams.append("fiscalCode", randomFiscalCode());

  const res = http.get(
      url,
      null,
      myParams);
  logResult(apiName, res);

  return res;
}

export function getUserInfoFromMappedExternaUserId(token, mappedExternalUserId) {
  const apiName = AUTH_API_NAMES.getUserInfoFromMappedExternaUserId;
  const myParams = buildDefaultParams(apiName, token);

  const url = `${baseUrlAuth}/auth/userinfo/${mappedExternalUserId}`;

  const res = http.get(
      url,
      null,
      myParams);
  logResult(apiName, res);

  return res;
}