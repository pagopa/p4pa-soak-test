export const SEND_NOTIFICATION_FILE = {
  CSV_SEPARATOR: ";",
  DOCUMENT_FILE_NAME: "notification.pdf",
  DOCUMENT_CONTENT_TYPE: "application/pdf",
  F24_METADATA_FILE_NAME: "f24_metadata.json",
  F24_METADATA_CONTENT_TYPE: "application/json",
};

export class SendNotificationRow {
  paProtocolNumber;
  externalCampaignId;
  campaignName;
  notificationFeePolicy = "DELIVERY_MODE";
  physicalCommunicationType = "AR_REGISTERED_LETTER";
  subject = "Soak-test send massive import";
  senderDenomination;
  senderTaxId;
  taxonomyCode = "030101P";
  paFeeCents = 100;
  vat = 22;
  pagoPaIntMode = "ASYNC";
  recipientType = "PF";
  taxId = "FRRMRA90A41F205D";
  denomination = "Maria Ferrero";
  address = "Via Larga, 10";
  zip = "00186";
  municipality = "Roma";
  province = "RM";
  f24PaymentTitle_1 = "Soak-test F24";
  f24PaymentApplyCost_1 = true;
  metadataAttachmentFileName_1 = SEND_NOTIFICATION_FILE.F24_METADATA_FILE_NAME;
  metadataAttachmentDigest_1;
  metadataAttachmentContentType_1 = SEND_NOTIFICATION_FILE.F24_METADATA_CONTENT_TYPE;
  documentFileName_1 = SEND_NOTIFICATION_FILE.DOCUMENT_FILE_NAME;
  documentDigest_1;
  documentContentType_1 = SEND_NOTIFICATION_FILE.DOCUMENT_CONTENT_TYPE;
  constructor(
    paProtocolNumber,
    externalCampaignId,
    senderDenomination,
    senderTaxId,
    metadataAttachmentDigest,
    documentDigest,
  ) {
    this.paProtocolNumber = paProtocolNumber;
    this.externalCampaignId = externalCampaignId;
    this.campaignName = externalCampaignId;
    this.senderDenomination = senderDenomination;
    this.senderTaxId = senderTaxId;
    this.metadataAttachmentDigest_1 = metadataAttachmentDigest;
    this.documentDigest_1 = documentDigest;
  }
}
