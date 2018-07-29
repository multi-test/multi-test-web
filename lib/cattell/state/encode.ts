import {BitStream} from 'bit-buffer';
import {CattellState} from "./type";

function answerToBit2(answer: '' | 'A' | 'B' | 'C'): 0 | 1 | 2 | 3 {
    switch (answer) {
        case '':  return 0b00;
        case 'A': return 0b01;
        case 'B': return 0b10;
        case 'C': return 0b11;
    }
}

function genderToBit2(gender: 'M' | 'F' | ''): 0 | 1 | 2 {
    switch (gender) {
        case '':  return 0b00;
        case 'M': return 0b01;
        case 'F': return 0b10;
    }
}

export function encodeState(state: CattellState): string {
    const bitStream = new BitStream(new ArrayBuffer(49));
    bitStream.writeUint8(state.position);

    for (const answer of state.answers) {
        bitStream.writeBits(answerToBit2(answer), 2);
    }

    bitStream.writeBits(genderToBit2(state.profile.gender), 2);
    bitStream.writeUint8(state.profile.age);

    bitStream.index = 0;
    const bits49 = bitStream.readArrayBuffer(49);
    const bitsString = String.fromCharCode.apply(null, bits49);
    const hash = bitsString + state.profile.name;

    return btoa(unescape(encodeURIComponent(hash)));
}