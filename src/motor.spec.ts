import { isValidIBAN, getIBANInfo } from "./motor";

describe("isValidIBAN", () => {
  it("valida correctamente un IBAN español válido", () => {
    // Arrange
    const iban = "ES7921000813610123456789";

    // Act
    const result = isValidIBAN(iban);

    // Assert
    expect(result).toBe(true);
  });

  it("rechaza un IBAN con checksum incorrecto", () => {
    // Arrange
    const iban = "ES0021000813610123456789"; // checksum incorrecto

    // Act
    const result = isValidIBAN(iban);

    // Assert
    expect(result).toBe(false);
  });
});

describe("getIBANInfo", () => {
  it("devuelve información completa para IBAN válido", () => {
    // Arrange
    const iban = "ES79 2100 0813 61 0123456789";

    // Act
    const result = getIBANInfo(iban);

    // Assert
    expect(result).toContain("IBAN válido:");
    expect(result).toContain("Banco: Caixabank");
    expect(result).toContain("Código de banco: 2100");
  });

  it("devuelve error si el IBAN tiene mal formato", () => {
    // Arrange
    const iban = "XX001234";

    // Act
    const result = getIBANInfo(iban);

    // Assert
    expect(result).toBe("El formato del IBAN no es válido.");
  });

  it("devuelve error si el IBAN no pasa el algoritmo", () => {
    // Arrange
    const iban = "ES0021000813610123456789"; // checksum incorrecto

    // Act
    const result = getIBANInfo(iban);

    // Assert
    expect(result).toBe("IBAN no válido según el algoritmo estándar.");
  });
});
