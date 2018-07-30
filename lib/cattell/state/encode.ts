import {BitStream} from 'bit-buffer';
import {CattellState} from "./type";
import {toBase64} from "./base64";
import * as koi8u from 'koi8-u';

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

function bitStreamToBase64(bitStream: BitStream): string {
    let base64Data = '';
    let bit6: number;

    while (bitStream.bitsLeft >= 6) {
        bit6 = bitStream.readBits(6, false);
        base64Data += toBase64(bit6);
    }

    const bitsLeft = bitStream.bitsLeft;

    if (bitsLeft > 0) {
        bit6 = bitStream.readBits(bitsLeft, false);
        base64Data += toBase64(bit6);
    }

    return base64Data;
}

export function encodeState(state: CattellState): string {
    const koi8uName: string = koi8u.encode(state.profile.name);
    const bitStream = new BitStream(new ArrayBuffer(49 + koi8uName.length));

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

    {
        for (let i = 0; i < koi8uName.length; i++) {
            const byte = koi8uName.charCodeAt(i);
            bitStream.writeUint8(byte);
        }
    }

    bitStream.index = 0;
    return bitStreamToBase64(bitStream);
}