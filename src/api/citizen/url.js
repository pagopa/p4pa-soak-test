import { getBaseUrl, getInnerBaseUrl } from "../../common/environment.js";
import { CONFIG } from "../../common/envVars.js";

const innerBaseUrl = getInnerBaseUrl();

export const citizenConfig = {
  innerBaseUrl: `${innerBaseUrl}/p4pacitizen`,
};
