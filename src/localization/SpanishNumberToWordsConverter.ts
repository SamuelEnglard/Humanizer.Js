import { GenderlessNumberToWordsConverter } from './GenderlessNumberToWordsConverter';

const unitsMap = [
    "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince", "diecis�is", "diecisiete", "dieciocho", "diecinueve",
    "veinte", "veintiuno", "veintid�s", "veintitr�s", "veinticuatro", "veinticinco", "veintis�is", "veintisiete", "veintiocho", "veintinueve"];
const tensMap = ["cero", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const hundredsMap = ["cero", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

function convert(num: number, isOrdinal: boolean): string {

    if (isOrdinal === true) {
        throw 'ordinal numbers for Spanish are not implemented';
    }

    if (num === 0) {
        return "cero";
    }

    if (num < 0) {
        return "menos " + convert(Math.abs(num), false);
    }

    const parts: string[] = [];

    if (Math.floor(num / 1000000000) > 0) {
        parts.push(Math.floor(num / 1000000000) === 1
            ? "mil millones"
            : convert(Math.floor(num / 1000000000), false) + "mil millones");

        num %= 1000000000;
    }

    if (Math.floor(num / 1000000) > 0) {
        parts.push(Math.floor(num / 1000000) === 1
            ? "un mill�n"
            : convert(Math.floor(num / 1000000), false) + " millones");

        num %= 1000000;
    }

    if (Math.floor(num / 1000) > 0) {
        parts.push(Math.floor(num / 1000) === 1
            ? "mil"
            : convert(Math.floor(num / 1000), false) + " mil");

        num %= 1000;
    }

    if (Math.floor(num / 100) > 0) {
        parts.push(num === 100 ? "cien" : hundredsMap[Math.floor(num / 100)]);
        num %= 100;
    }

    if (num > 0) {
        if (num < 30)
            parts.push(unitsMap[num]);
        else if (num > 20 && num < 30) {
            let lastPart = tensMap[Math.floor(num / 10)];
            if ((num % 10) > 0)
                lastPart += " " + unitsMap[num % 10];

            parts.push(lastPart);
        }
        else {
            let lastPart = tensMap[Math.floor(num / 10)];
            if ((num % 10) > 0)
                lastPart += " y " + unitsMap[num % 10];

            parts.push(lastPart);
        }
    }

    let result = parts.shift() || "";

    for (var i = 1; i < parts.length; i++) {
        result += ' ' + parts[i];
    }

    return result;
}

export class SpanishNumberToWordsConverter extends GenderlessNumberToWordsConverter {
    convert_number(num: number): string {
        return convert(num, false);
    }

    convertToOrdinal_number(num: number): string {
        return convert(num, true);
    }
}