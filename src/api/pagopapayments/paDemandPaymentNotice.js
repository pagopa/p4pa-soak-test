import http from "k6/http";
import { logResult } from "../../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../../common/envVars.js";
import { pagopaPaymentsConfig } from "./url.js";
import {
  buildDatiSpecificiServiziXml,
  buildPaDemandPaymentNoticeXml,
} from "../../common/pagopapaymentsUtils.js";
import encoding from "k6/encoding";

export const PAGOPA_PAYMENTS_API_NAMES = {
  paDemandPaymentNotice: "pagopapayments/paDemandPaymentNotice",
};

const baseUrl = pagopaPaymentsConfig.innerBaseUrl;

export function paDemandPaymentNotice(demandPaymentNotice, token) {
  const apiName = PAGOPA_PAYMENTS_API_NAMES.paDemandPaymentNotice;
  const myParams = buildDefaultParams(apiName, token);
  myParams.headers["Content-Type"] = "text/xml";

  const datiSpecificiServiziXml = buildDatiSpecificiServiziXml(
    demandPaymentNotice.requestData.debtPositionTypeOrgCode,
    demandPaymentNotice.requestData.cieOrgFiscalCode,
    demandPaymentNotice.requestData.debtorFiscalCode,
    demandPaymentNotice.requestData.debtorFullName,
  );
  const datiSpecificiServizioRequestBase64 = encoding.b64encode(datiSpecificiServiziXml);

  const xmlBody = buildPaDemandPaymentNoticeXml(
    demandPaymentNotice.delegateOrgFiscalCode,
    demandPaymentNotice.brokerId,
    demandPaymentNotice.stationId,
    demandPaymentNotice.serviceId,
    demandPaymentNotice.serviceSubjectId,
    datiSpecificiServizioRequestBase64,
  );

  const res = http.post(`${baseUrl}/soap/node/wsdl/PaForNode`, xmlBody, myParams);
  logResult(apiName, res);
  return res;
}
