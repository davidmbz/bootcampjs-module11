export interface IBAN {
  countryCode: string;
  checkDigits: string;
  bankCode: string;
  branchCode: string;
  controlDigits: string;
  accountNumber: string;
}

export interface Bank {
  code: string;
  name: string;
}

export const BANK_LIST: Bank[] = [
  { code: "2080", name: "Abanca Corporación Bancaria" },
  { code: "0061", name: "Banca March" },
  { code: "0188", name: "Banco Alcalá" },
  { code: "0182", name: "Banco Bilbao Vizcaya Argentaria" },
  { code: "0130", name: "Banco Caixa Geral" },
  { code: "0234", name: "Banco Caminos" },
  { code: "2105", name: "Banco Castilla-La Mancha" },
  { code: "0240", name: "Banco de Crédito Social Cooperativo" },
  { code: "0081", name: "Banco de Sabadell" },
  { code: "0487", name: "Banco Mare Nostrum" },
  { code: "0186", name: "Banco Mediolanum" },
  { code: "0238", name: "Banco Pastor" },
  { code: "0075", name: "Banco Popular Español" },
  { code: "0049", name: "Banco Santander" },
  { code: "3873", name: "Banco Santander Totta" },
  { code: "2038", name: "Bankia" },
  { code: "0128", name: "Bankinter" },
  { code: "0138", name: "Bankoa" },
  { code: "0152", name: "Barclays Bank PLC" },
  { code: "3842", name: "BNP Paribas Paris" },
  { code: "3025", name: "Caixa de Credit del Enginyers" },
  { code: "2100", name: "Caixabank" },
  { code: "2045", name: "Caja de Ahorros y Monte de Piedad de Ontinyent" },
  { code: "3035", name: "Caja Laboral Popular CC" },
  { code: "3081", name: "Caja Rural Castilla-La Mancha" },
  { code: "3058", name: "Cajamar Caja Rural" },
  { code: "2000", name: "Cecabank" },
  { code: "1474", name: "Citibank Europe PLC" },
  { code: "3821", name: "Commerzbank AG" },
  { code: "3877", name: "Danske Bank A/S" },
  { code: "0019", name: "Deutsche Bank SAE" },
  { code: "0239", name: "EVO Banco" },
  { code: "2085", name: "Ibercaja Banco" },
  { code: "1465", name: "ING Bank NV" },
  { code: "2095", name: "Kutxabank" },
  { code: "2048", name: "Liberbank" },
  { code: "0131", name: "Novo Banco" },
  { code: "0073", name: "Open Bank" },
  { code: "0108", name: "Société Générale" },
  { code: "2103", name: "Unicaja Banco" },
];

export function sanitizeIBAN(input: string): string {
  return input.replace(/[\s-]/g, "").toUpperCase();
}

export const isValidIBANFormat = (iban: string): boolean => {
  const sanitized = iban.replace(/\s+/g, "").toUpperCase();
  return /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(sanitized);
};

export function parseIBAN(iban: string): IBAN | null {
  const clean = sanitizeIBAN(iban);
  if (!isValidIBANFormat(clean)) return null;

  const match = clean.match(/^([A-Z]{2})(\d{2})(\d{4})(\d{4})(\d{2})(\d{10})$/);
  if (!match) return null;

  const [
    ,
    countryCode,
    checkDigits,
    bankCode,
    branchCode,
    controlDigits,
    accountNumber,
  ] = match;

  return {
    countryCode,
    checkDigits,
    bankCode,
    branchCode,
    controlDigits,
    accountNumber,
  };
}

export function findBankName(code: string): string {
  const found = BANK_LIST.find((bank) => bank.code === code);
  return found ? found.name : "Banco desconocido";
}
