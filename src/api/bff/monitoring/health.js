import http from "k6/http";
import { logResult } from "../../../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../../../common/envVars.js";
import bffConfig from "../url.js";

export const PU_BFF_API_NAMES = {
  getHealthStatus: "bff/monitoring/getHealthStatus",
};

const baseUrl = bffConfig.baseUrl;

export function getHealthStatus() {
  const apiName = PU_BFF_API_NAMES.getHealthStatus;
  const myParams = buildDefaultParams(apiName);

  const res = http.get(
    `${baseUrl}/core-health`,
    myParams
  );
  logResult(apiName, res);
  return res;
}
