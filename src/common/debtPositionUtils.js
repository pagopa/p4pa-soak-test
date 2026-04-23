export const VALID_CIE_DEBT_POSITION_TYPE_ORG_CODES = [
  "1",
  "2",
  "4",
  "7",
  "9",
  "10",
  "11",
];

export const getRandomDebtPositionTypeOrgCodeCie = () => {
  const validCodes = VALID_CIE_DEBT_POSITION_TYPE_ORG_CODES;
  const randomIndex = Math.floor(Math.random() * validCodes.length);
  return validCodes[randomIndex];
};