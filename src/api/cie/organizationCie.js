import http from "k6/http";
import { logResult } from "../../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../../common/envVars.js";
import { cieConfig } from "./url.js";

export const CIE_API_NAMES = {
 getAmountByOrgFiscalCodeAndDebtPositionTypeOrgCode: "cie/getAmountByOrgFiscalCodeAndDebtPositionTypeOrgCode",
 getOrganizations: "src/tests/cie/getOrganizations"
};

const baseUrl = cieConfig.baseUrl;

export function getAmountByOrgFiscalCodeAndDebtPositionTypeOrgCode(orgFiscalCode, debtPositionTypeOrgCode) {
  const apiName = CIE_API_NAMES.getAmountByOrgFiscalCodeAndDebtPositionTypeOrgCode;
  const myParams = buildDefaultParams(apiName);
  
  const res = http.get(
    `${baseUrl}/public/organizations/${orgFiscalCode}/amount?debtPositionTypeOrgCode=${debtPositionTypeOrgCode}`,
    myParams
  );
  logResult(apiName, res);
  return res;
}

export function getOrganizations() {
  const apiName = CIE_API_NAMES.getOrganizations;
  const myParams = buildDefaultParams(apiName);

  const res = http.get(
    `${baseUrl}/public/organizations`,
    myParams
  );
  logResult(apiName, res);
  return res;
}