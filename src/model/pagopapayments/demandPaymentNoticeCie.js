export class RequestData {
  debtPositionTypeOrgCode;
  cieOrgFiscalCode;
  debtorFiscalCode;
  debtorFullName;
  constructor(
    debtPositionTypeOrgCode,
    cieOrgFiscalCode,
    debtorFiscalCode,
    debtorFullName,
  ) {
    this.debtPositionTypeOrgCode = debtPositionTypeOrgCode;
    this.cieOrgFiscalCode = cieOrgFiscalCode;
    this.debtorFiscalCode = debtorFiscalCode;
    this.debtorFullName = debtorFullName;
  }
}

export class DemandPaymentNotice {
  delegateOrgFiscalCode;
  brokerFiscalCode;
  serviceId;
  stationId;
  serviceSubjectId;
  requestData;
  constructor(
    delegateOrgFiscalCode,
    brokerFiscalCode,
    serviceId,
    stationId,
    serviceSubjectId,
    requestData,
  ) {
    this.delegateOrgFiscalCode = delegateOrgFiscalCode;
    this.brokerFiscalCode = brokerFiscalCode;
    this.serviceId = serviceId;
    this.stationId = stationId;
    this.serviceSubjectId = serviceSubjectId;
    this.requestData = requestData;
  }
}
