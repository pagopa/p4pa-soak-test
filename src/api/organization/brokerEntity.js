import http from "k6/http";
import { logResult } from "../../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../../common/envVars.js";
import { organizationConfig } from "./url.js";

export const BROKER_ENTITY_API_NAMES = {
  getBroker: "organization/brokerEntity"
};

const baseUrl = organizationConfig.baseUrl;

export function getBroker(id, token) {
  const apiName = BROKER_ENTITY_API_NAMES.getBroker;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/crud/brokers/{id}`, myParams);
  logResult(apiName, res);
  return res;
}
