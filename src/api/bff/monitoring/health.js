import http from "k6/http";
import { logResult } from "../../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../../../common/envVars.js";
import authConfig from "../url.js";

export const PU_BFF_API_NAMES = {
  coreHealth: "bff/monitoring/getHealthStatus",
};

const baseUrl = authConfig.baseUrl;

export function getHealthStatus() {
  const apiName = PU_BFF_API_NAMES.coreHealth;
  const myParams = buildDefaultParams(apiName);

  const res = http.get(
    `${baseUrl}/pu/bff/core-health`,
    myParams
  );
  logResult(apiName, res);
  return res;
}
