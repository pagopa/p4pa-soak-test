import {getBaseUrl, getInnerBaseUrl} from "../../common/environment.js";
import {CONFIG} from "../../common/envVars.js";

const baseUrl = getBaseUrl();
const innerBaseUrl = getInnerBaseUrl();

const authConfig = {
  innerBaseUrl: `${innerBaseUrl}/p4paauth/payhub`,
  baseUrl: CONFIG.USE_INTERNAL_ACCESS_ENV
      ? `${innerBaseUrl}/p4paauth/payhub`
      : `${baseUrl}/payhub-auth`
};

export default authConfig;