import http from "k6/http";
import {logResult} from "../../common/dynamicScenarios/utils.js";
import {buildDefaultParams} from "../../common/envVars.js";
import {fileshareConfig} from "./url.js";

export const FILESHARE_API_NAMES = {
  uploadIngestionFlowFile: "fileshare/uploadIngestionFlowFile",
};

const baseUrl = fileshareConfig.baseUrl;

export function uploadIngestionFlowFile(
  organizationId,
  ingestionFlowFileType,
  fileName,
  fileContent,
  token,
) {
  const apiName = FILESHARE_API_NAMES.uploadIngestionFlowFile;
  const myParams = buildDefaultParams(apiName, token);
  delete myParams.headers["Content-Type"];

  const res = http.post(
    `${baseUrl}/organization/${organizationId}/ingestionflowfiles?ingestionFlowFileType=${ingestionFlowFileType}&fileOrigin=PORTAL`,
    { ingestionFlowFile: http.file(fileContent, fileName, "application/zip") },
    myParams,
  );
  logResult(apiName, res);
  return res;
}
