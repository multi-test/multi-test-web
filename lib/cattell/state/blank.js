export default function createBlankCattellState() {
    return {
        position: 0,
        answers: new Array(187).fill(''),
        profile: {
            gender: '',
            age: 0,
            name: '',
        },
    };
}
