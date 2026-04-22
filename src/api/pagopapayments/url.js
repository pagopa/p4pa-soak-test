import {getBaseUrl, getInnerBaseUrl} from "../../common/environment.js";
import {CONFIG} from "../../common/envVars.js";

const baseUrl = getBaseUrl();
const innerBaseUrl = getInnerBaseUrl();

export const pagopaPaymentsConfig = {
  innerBaseUrl: `${innerBaseUrl}/p4papagopapayments`,
  baseUrl: CONFIG.USE_INTERNAL_ACCESS_ENV
      ? `${innerBaseUrl}/p4papagopapayments`
      : `${baseUrl}/payhub`
};
