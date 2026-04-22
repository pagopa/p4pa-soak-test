import {getBaseUrl, getInnerBaseUrl} from "../../common/environment.js";
import {CONFIG} from "../../common/envVars.js";

const baseUrl = getBaseUrl();
const innerBaseUrl = getInnerBaseUrl();

export const organizationConfig = {
  innerBaseUrl: `${innerBaseUrl}/p4paorganization`,
  baseUrl: CONFIG.USE_INTERNAL_ACCESS_ENV
      ? `${innerBaseUrl}/p4paorganization`
      : `${baseUrl}/pu/organization`
};
