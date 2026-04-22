import {getBaseUrl, getInnerBaseUrl} from "../../common/environment.js";
import {CONFIG} from "../../common/envVars.js";

const baseUrl = getBaseUrl();
const innerBaseUrl = getInnerBaseUrl();

export const cieConfig = {
  innerBaseUrl: `${innerBaseUrl}/p4pacie`,
  baseUrl: CONFIG.USE_INTERNAL_ACCESS_ENV
      ? `${innerBaseUrl}/p4pacie`
      : `${baseUrl}/pu/cie`
};
