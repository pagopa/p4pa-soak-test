import {getBaseUrl, getInnerBaseUrl} from "../../common/environment.js";
import {CONFIG} from "../../common/envVars.js";

const baseUrl = getBaseUrl();
const innerBaseUrl = getInnerBaseUrl();

export const fileshareConfig = {
  innerBaseUrl: `${innerBaseUrl}/p4pafileshare`,
  baseUrl: CONFIG.USE_INTERNAL_ACCESS_ENV
      ? `${innerBaseUrl}/p4pafileshare`
      : `${baseUrl}/pu/fileshare`
};
