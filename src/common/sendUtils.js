import crypto from "k6/crypto";
import {strToU8, zipSync,} from "https://cdn.jsdelivr.net/npm/fflate@0.8.2/esm/browser.js";
import {SEND_NOTIFICATION_FILE, SendNotificationRow,} from "../model/send/sendNotificationFile.js";

const documentFile = open("../resources/send/notification.pdf", "b");
const f24MetadataFile = open("../resources/send/f24_metadata.json", "b");

export function buildSendNotificationRows(
  notificationsNumber,
  protocolNumberPrefix,
  externalCampaignId,
  organization,
) {
  return Array.from(
    { length: notificationsNumber },
    (_, index) =>
      new SendNotificationRow(
        `${protocolNumberPrefix}_${index + 1}`,
        externalCampaignId,
        organization.orgName,
        organization.orgFiscalCode,
        crypto.sha256(f24MetadataFile, "base64"),
        crypto.sha256(documentFile, "base64"),
      ),
  );
}

export function buildSendNotificationZip(csvFileName, rows) {
  const files = { [csvFileName]: strToU8(buildSendNotificationCsv(rows)) };
  rows.forEach((_, index) => {
    files[`${index + 1}/${SEND_NOTIFICATION_FILE.DOCUMENT_FILE_NAME}`] =
      new Uint8Array(documentFile);
    files[`${index + 1}/${SEND_NOTIFICATION_FILE.F24_METADATA_FILE_NAME}`] =
      new Uint8Array(f24MetadataFile);
  });

  return zipSync(files, { level: 0 }).buffer;
}

function buildSendNotificationCsv(rows) {
  const separator = SEND_NOTIFICATION_FILE.CSV_SEPARATOR;
  return [
    Object.keys(rows[0]).join(separator),
    ...rows.map((row) => Object.values(row).join(separator)),
  ].join("\n");
}
