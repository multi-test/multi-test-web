export function defaultStateForCattell() {
    return {
        position: 0,
        answers: new Array(187).fill(0),
        profile: {
            gender: undefined,
            age: 0,
            name: '',
        },
    };
}