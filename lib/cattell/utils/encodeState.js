function reduceAnswer(acc, answer, index, answers) {
    acc.buf.push(answer & 3);

    const reachedEnd = answers.length - 1 === index;
    if (reachedEnd) {
        while ((acc.buf.length % 4) !== 0) {
            acc.buf.push(0);
        }
    }

    if (acc.buf.length === 4) {
        const [a0, a1, a2, a3] = acc.buf.splice(0);
        const code = (a0 << 6) | (a1 << 4) | (a2 << 2) | a3;
        acc.str += String.fromCharCode(code);
    }

    return acc;
}

function genderToBit2(gender) {
    switch (gender) {
        case 'male': return 1;
        case 'female': return 2;
        default: return 0;
    }
}

export function encodeState(state) {
    let hash = '';
    hash += String.fromCharCode(state.position & 0xFF);

    const answers188 = state.answers.concat(genderToBit2(state.profile.gender));
    hash += answers188.reduce(reduceAnswer, { str: '', buf: [] }).str;
    hash += String.fromCharCode(state.profile.age & 0xFF);
    hash += state.profile.name;

    return btoa(unescape(encodeURIComponent(hash)))
}