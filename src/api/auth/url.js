import {getBaseUrl, getInnerBaseUrl} from "../../common/environment.js";

const baseUrl = getBaseUrl();
const innerBaseUrl = getInnerBaseUrl();

const authConfig = {
  fullBaseUrl: `${baseUrl}/payhub-auth`,
  fullInnerBaseUrl: `${innerBaseUrl}/p4paauth`
};

export default authConfig;