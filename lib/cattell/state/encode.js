import { BitStream } from 'bit-buffer';
import { toBase64 } from "./base64";
function answerToBit2(answer) {
    switch (answer) {
        case '': return 0b00;
        case 'A': return 0b01;
        case 'B': return 0b10;
        case 'C': return 0b11;
    }
}
function genderToBit2(gender) {
    switch (gender) {
        case '': return 0b00;
        case 'M': return 0b01;
        case 'F': return 0b10;
    }
}
export function encodeState(state) {
    const bitStream = new BitStream(new ArrayBuffer(49));
    {
        const byte = state.position;
        bitStream.writeUint8(byte);
    }
    for (const answer of state.answers) {
        const bit2 = answerToBit2(answer);
        bitStream.writeBits(bit2, 2);
    }
    {
        const bit2 = genderToBit2(state.profile.gender);
        bitStream.writeBits(bit2, 2);
    }
    {
        const bit6 = state.profile.age === 0 ? 0 : state.profile.age - 15;
        bitStream.writeBits(bit6, 6);
    }
    bitStream.index = 0;
    let base64Data = '';
    for (let i = 0; i < 65; i++) {
        base64Data += toBase64(bitStream.readBits(6, false));
    }
    const base64Name = btoa(unescape(encodeURIComponent(state.profile.name)));
    return base64Data + base64Name;
}
