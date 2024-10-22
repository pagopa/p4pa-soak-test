import http from "k6/http";
import { URL } from "https://jslib.k6.io/url/1.0.0/index.js";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams, CONFIG } from "../common/envVars.js";
import { getBaseUrl, getInnerBaseUrl } from "../common/environment.js";

export const AUTH_API_NAMES = {
  postToken: "auth/postToken",
  getUserInfo: "auth/getUserInfo",
};

const innerBaseUrl = `${getInnerBaseUrl()}/p4paauth`;
const baseUrl = `${getBaseUrl()}/auth`;

export function postToken(
  grant_type,
  client_id,
  client_secret,
  subject_token,
  subject_issuer,
  subject_token_type
) {
  const apiName = AUTH_API_NAMES.postToken;
  const myParams = buildDefaultParams(apiName);

  const url = new URL(`${innerBaseUrl}/payhub/auth/token`);

  url.searchParams.append("grant_type", grant_type);
  url.searchParams.append("client_id", client_id);
  url.searchParams.append("client_secret", client_secret);
  url.searchParams.append("subject_token", subject_token);
  url.searchParams.append("subject_issuer", subject_issuer);
  url.searchParams.append("subject_token_type", subject_token_type);
  url.searchParams.append("scope", "openid");

  const res = http.post(url.toString(), null, myParams);
  logResult(apiName, res);
  return res;
}

export function postToken_tokenExchange(
  client_id,
  subject_token,
  subject_issuer,
  subject_token_type = "urn:ietf:params:oauth:token-type:jwt"
) {
  return postToken(
    "urn:ietf:params:oauth:grant-type:token-exchange",
    client_id,
    undefined,
    subject_token,
    subject_issuer,
    subject_token_type
  );
}

export function postToken_tokenExchangeFake(
  externalUserId = CONFIG.CONTEXT.EXTERNAL_USER_ID
) {
  return postToken_tokenExchange(
    "piattaforma-unitaria",
    externalUserId,
    "soak-test",
    "FAKE-AUTH"
  );
}

export function postToken_clientCredentials(client_id, client_secret) {
  return postToken("client_credentials", client_id, client_secret);
}

export function getUserInfo(token) {
  const apiName = AUTH_API_NAMES.getUserInfo;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/payhub/auth/userinfo`, myParams);
  logResult(apiName, res);
  return res;
}
