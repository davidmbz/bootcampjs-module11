import {
  sanitizeIBAN,
  isValidIBANFormat,
  parseIBAN as parseIBANFromModel,
  findBankName,
} from "./model";

export const isValidIBAN = (iban: string): boolean => {
  const sanitized = sanitizeIBAN(iban);

  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(sanitized)) {
    return false;
  }

  const rearranged = sanitized.slice(4) + sanitized.slice(0, 4);

  const converted = rearranged
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code >= 65 && code <= 90 ? (code - 55).toString() : char;
    })
    .join("");

  let remainder = "";
  for (let i = 0; i < converted.length; i += 7) {
    remainder = String(
      parseInt(remainder + converted.substring(i, i + 7), 10) % 97
    );
  }

  return Number(remainder) === 1;
};

export function getIBANInfo(iban: string): string {
  const sanitized = sanitizeIBAN(iban);

  if (!isValidIBANFormat(sanitized)) {
    return "El formato del IBAN no es válido.";
  }

  if (!isValidIBAN(sanitized)) {
    return "IBAN no válido según el algoritmo estándar.";
  }

  const parsed = parseIBANFromModel(sanitized);
  if (!parsed) {
    return "No se pudo extraer la información del IBAN.";
  }

  const bankName = findBankName(parsed.bankCode);

  return `El IBAN está bien formado
El IBAN es válido
Banco: ${bankName}
Código sucursal: ${parsed.branchCode}
Dígitos de control: ${parsed.controlDigits}
Número de cuenta: ${parsed.accountNumber}`;
}
