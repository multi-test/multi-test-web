import {encodeState} from './encode';
import createBlankCattellState from './blank';
import {CattellState} from "./type";

describe('cattell.state.blank', () => {
    let state: CattellState;

    beforeEach(() => {
        state = createBlankCattellState();
    });

    afterEach(() => {
        expect(encodeState(state)).toMatchSnapshot();
    });

    it('should create blank valid state matching the snapshot', () => {});

    it('should encode age', () => {
        state.profile.age = 70;
    });

    it('should encode name', () => {
        state.profile.name = 'Test '.repeat(12);
    });

    it('should encode male gender', () => {
        state.profile.gender = 'M';
    });

    it('should encode female gender', () => {
        state.profile.gender = 'F';
    });

    it('should encode A answers', () => {
        state.answers.fill('A');
    });

    it('should encode B answers', () => {
        state.answers.fill('B');
    });

    it('should encode C answers', () => {
        state.answers.fill('C');
    });
});

