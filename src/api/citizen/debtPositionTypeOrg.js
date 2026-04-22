import http from "k6/http";
import { logResult } from "../../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../../common/envVars.js";
import { citizenConfig } from "./url.js";

export const DEBT_POSITION_TYPE_ORG_API_NAMES = {
  getDebtPositionTypeOrgsWithSpontaneous:
    "citizen/getDebtPositionTypeOrgsWithSpontaneous",
};

const baseUrl = citizenConfig.innerBaseUrl;

export function getDebtPositionTypeOrgsWithSpontaneous(
  brokerId,
  organizationId,
  token,
) {
  const apiName = DEBT_POSITION_TYPE_ORG_API_NAMES.getDebtPositionTypeOrgsWithSpontaneous;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(
    `${baseUrl}/brokers/${brokerId}/spontaneous/organizations/${organizationId}/debt-position-type-orgs`,
    myParams,
  );
  logResult(apiName, res);
  return res;
}
