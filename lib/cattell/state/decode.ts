import {BitStream} from 'bit-buffer';
import {Blank, CattelAnswer, CattellState, Gender} from "./type";
import {fromBase64} from "./base64";
import * as koi8u from 'koi8-u';

function decodeAnswer(bitStream: BitStream): Blank<CattelAnswer> {
    const bit2 = bitStream.readBits(2, false);

    switch (bit2)  {
        case 0b01: return 'A';
        case 0b10: return 'B';
        case 0b11: return 'C';
        default: return '';
    }
}

function decodeGender(bitStream: BitStream): Blank<Gender> {
    const bit2 = bitStream.readBits(2, false);

    switch (bit2)  {
        case 0b01: return 'M';
        case 0b10: return 'F';
        default: return '';
    }
}

function decodeAge(bitStream: BitStream): number {
    const bit6 = bitStream.readBits(6, false);
    return bit6 === 0 ? 0 : 15 + bit6;
}

export function decodeState(base64: string): CattellState {
    const bitStream = new BitStream(new ArrayBuffer(base64.length));

    for (let i = 0; i < base64.length; i++) {
        const code = fromBase64(base64[i]);
        bitStream.writeBits(code, 6);
    }

    bitStream.index = 0;
    const position = bitStream.readUint8();
    const answers = new Array<Blank<CattelAnswer>>(187);
    for (let i = 0; i < 187; i++) {
        answers[i] = decodeAnswer(bitStream);
    }
    const gender = decodeGender(bitStream);
    const age = decodeAge(bitStream);

    let koi8uName = '';
    while (bitStream.bitsLeft >= 8) {
        koi8uName += String.fromCharCode(bitStream.readUint8());
    }

    const name = koi8u.decode(koi8uName);
    console.log('AA', name, name.length);

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