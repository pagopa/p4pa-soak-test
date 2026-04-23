export function buildPaDemandPaymentNoticeXml(
  delegateOrgFiscalCode,
  brokerId,
  stationId,
  serviceId,
  serviceSubjectId,
  requestData,
) {
  return `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:paf="http://pagopa-api.pagopa.gov.it/pa/paForNode.xsd">
  <soapenv:Header/>
  <soapenv:Body>
    <paf:paDemandPaymentNoticeRequest>
      <idPA>${delegateOrgFiscalCode}</idPA>
      <idBrokerPA>${brokerId}</idBrokerPA>
      <idStation>${stationId}</idStation>
      <idServizio>${serviceId}</idServizio>
      <idSoggettoServizio>${serviceSubjectId}</idSoggettoServizio>
      <datiSpecificiServizioRequest>${requestData}</datiSpecificiServizioRequest>
    </paf:paDemandPaymentNoticeRequest>
  </soapenv:Body>
</soapenv:Envelope>`;
}

export function buildDatiSpecificiServiziXml(
  debtPositionTypeOrgCode,
  cieOrgFiscalCode,
  debtorFiscalCode,
  debtorFullName,
) {
  return ` 
  <?xml version="1.0" encoding="UTF-8"?>
  <pagamentoCIE xmlns="http://PuntoAccessoPSP.spcoop.gov.it/pagamentoCIE">
    <codiceCausale>${debtPositionTypeOrgCode}</codiceCausale>
    <codiceFiscaleComune>${cieOrgFiscalCode}</codiceFiscaleComune>
    <intestatario>
      <codiceFiscaleIntestatario>${debtorFiscalCode}</codiceFiscaleIntestatario>
      <denominazioneIntestatario>${debtorFullName}</denominazioneIntestatario>
    </intestatario>
  </pagamentoCIE>`;
}

