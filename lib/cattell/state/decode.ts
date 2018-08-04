import {BitStream} from 'bit-buffer';
import {Blank, CattelAnswer, CattellState, Gender} from "./type";
import {decode as decodeKOI8U} from "../../utils/koi8-u";
import {byteLength, toByteArray} from "../../utils/base64";

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

function convert64StringToBitStream(string64: string): BitStream {
    const bitStream = new BitStream(new ArrayBuffer(byteLength(string64)));

    for (const byte of toByteArray(string64)) {
        bitStream.writeUint8(byte);
    }

    bitStream.index = 0;
    return bitStream;
}

function* readBitStream(bitStream: BitStream) {
    while (bitStream.bitsLeft >= 8) {
        yield bitStream.readUint8();
    }
}

export function decodeState(string64: string): CattellState {
    const bitStream = convert64StringToBitStream(string64);
    const version = bitStream.readBits(2, false);
    if (version !== 0) {
        throw new Error(`Cannot parse an unsupported Cattell state serialization format (v${version})`);
    }

    const position = bitStream.readUint8();

    const answers = new Array<Blank<CattelAnswer>>(187);
    for (let i = 0; i < 187; i++) {
        answers[i] = decodeAnswer(bitStream);
    }

    const gender = decodeGender(bitStream);
    const age = decodeAge(bitStream);

    const name = decodeKOI8U(readBitStream(bitStream));

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