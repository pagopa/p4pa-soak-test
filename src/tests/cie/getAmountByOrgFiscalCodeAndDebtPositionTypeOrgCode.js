import { assert, statusOk } from "../../common/assertions.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getTestEntity } from "../../common/utils.js";
import { CIE_API_NAMES, getOrganizations } from "../../api/cie/organizationCie.js";
import { getAmountByOrgFiscalCodeAndDebtPositionTypeOrgCode } from "../../api/cie/organizationCie.js"
import { getRandomDebtPositionTypeOrgCodeCie } from "../../common/debtPositionUtils.js";

const application = "cie/organizationCie";
const testName = "getAmountByOrgFiscalCodeAndDebtPositionTypeOrgCode";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [CIE_API_NAMES.getAmountByOrgFiscalCodeAndDebtPositionTypeOrgCode] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export function setup() {
  const organizations = getOrganizations().json().result;

  if(organizations.length === 0){
    abort("No elements found in organizations list please restart test with at least one element");
  }

  const debtPositionTypeOrgCode = getRandomDebtPositionTypeOrgCodeCie();
  return {
    orgFiscalCodes: organizations.map(o => o.value),
    debtPositionTypeOrgCode
  };

}

// Test
export default (data) => {
  const orgFiscalCode = getTestEntity(data.orgFiscalCodes);
  const result = getAmountByOrgFiscalCodeAndDebtPositionTypeOrgCode(orgFiscalCode, data.debtPositionTypeOrgCode);

  assert(result, [statusOk()]);

  if (result.status !== 200) {
    logErrorResult(testName, `Unexpected ${testName} status`, result, true);
  }
};
