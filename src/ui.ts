import { getIBANInfo } from "./motor";

export function setupUI(): void {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("iban-form") as HTMLFormElement | null;
    const input = document.getElementById(
      "iban-input"
    ) as HTMLInputElement | null;
    const resultBox = document.getElementById("result") as HTMLElement | null;

    if (!form || !input || !resultBox) {
      console.error("Elementos del formulario no encontrados");
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const iban = input.value.trim();
      const result = getIBANInfo(iban);
      resultBox.textContent = result;
    });
  });
}
