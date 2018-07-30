import createBlankCattellState from './blank';
describe('cattell.state.blank', () => {
    let state;
    beforeEach(() => {
        state = createBlankCattellState();
    });
    it('should create blank valid state matching the snapshot', () => {
        expect(state).toMatchSnapshot();
    });
});
