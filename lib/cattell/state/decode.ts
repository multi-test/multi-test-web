import {defaultStateForCattell} from "./defaultState";

const SESSION_PREFIX = '#/session/';

function bit2toGender(bit2) {
    switch (bit2)  {
        case 1: return 'male';
        case 2: return 'female';
        default: return undefined;
    }
}

export function decodeState(encoded) {
    if (encoded && encoded.startsWith(SESSION_PREFIX)) {
        const hash = decodeURIComponent(escape(atob(encoded.slice(SESSION_PREFIX.length))));

        const position = hash.charCodeAt(0);
        const answers = [];
        for (let i = 0; i < 47; i++) {
            const code = hash.charCodeAt(i + 1);
            answers.push((code & 0x11000000b) >> 6);
            answers.push((code & 0x00110000b) >> 4);
            answers.push((code & 0x00001100b) >> 2);
            answers.push((code & 0x00000011b));
        }

        const gender = bit2toGender(answers.pop());
        const age = hash.charCodeAt(48);
        const name = hash.slice(49);

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

    return defaultStateForCattell();
}