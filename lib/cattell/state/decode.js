import { BitStream } from 'bit-buffer';
import { fromBase64 } from "./base64";
function decodeAnswer(bitStream) {
    const bit2 = bitStream.readBits(2, false);
    switch (bit2) {
        case 0b01: return 'A';
        case 0b10: return 'B';
        case 0b11: return 'C';
        default: return '';
    }
}
function decodeGender(bitStream) {
    const bit2 = bitStream.readBits(2, false);
    switch (bit2) {
        case 0b01: return 'M';
        case 0b10: return 'F';
        default: return '';
    }
}
function decodeAge(bitStream) {
    const bit6 = bitStream.readBits(6, false);
    return bit6 === 0 ? 0 : 15 + bit6;
}
export function decodeState(base64) {
    const base64Data = base64.substring(0, 65);
    const bitStream = new BitStream(new ArrayBuffer(49));
    for (let i = 0; i < 65; i++) {
        const code = fromBase64(base64Data[i]);
        bitStream.writeBits(code, 6);
    }
    bitStream.index = 0;
    const position = bitStream.readUint8();
    const answers = new Array(187);
    for (let i = 0; i < 187; i++) {
        answers[i] = decodeAnswer(bitStream);
    }
    const gender = decodeGender(bitStream);
    const age = decodeAge(bitStream);
    const name = decodeURIComponent(escape(atob(base64.substring(65))));
    return {
        position,
        answers,
        profile: {
            gender,
            age,
            name,
        },
    };
}
