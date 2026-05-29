import http from "k6/http";
import { logResult } from "../../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../../common/envVars.js";
import { organizationConfig } from "./url.js";

export const ORGANIZATION_ENTITY_API_NAMES = {
  getOrganizationStation: "organization/organization",
};

const baseUrl = organizationConfig.innerBaseUrl;

export function getOrganizationStation(organizationId, token) {
  const apiName = ORGANIZATION_ENTITY_API_NAMES.getOrganizationStation;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(
    `${baseUrl}/organization/${organizationId}/organization-station`,
    myParams,
  );

  logResult(apiName, res);
  return res;
}
