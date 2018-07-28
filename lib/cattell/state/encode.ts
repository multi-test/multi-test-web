import {CattellState} from "./type";
import {WritableBitStream} from "./BitStream";

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
    const bitStream = new WritableBitStream();
    bitStream.writeByte(state.position);

    for (const answer of state.answers) {
        bitStream.writeBit2(answerToBit2(answer));
    }

    bitStream.writeBit2(genderToBit2(state.profile.gender));
    bitStream.writeByte(state.profile.age);

    let hash = '';
    const bytes = bitStream.getBytes();

    // istanbul ignore next
    if (bytes !== null) {
        for (const byte of bytes) {
            hash += String.fromCharCode(byte);
        }
    }

    hash += state.profile.name;

    return btoa(unescape(encodeURIComponent(hash)))
}