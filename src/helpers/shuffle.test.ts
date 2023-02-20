import shuffle from './shuffle';

describe('shuffle method', () => {
    it('given empty array should return empty array', () => {
        expect(shuffle<string>([])).toEqual([]);
    });

    it('given single element array should return same array', () => {
        expect(shuffle<number>([1])).toEqual([1]);
    });

    it('given multiple elements array should return array with same length', () => {
        expect(shuffle<number>([1, 2, 3]).length).toBe(3);
    });

    it('given multiple elements array should return array with same elements', () => {
        expect(new Set(shuffle<number>([1, 2, 3]))).toEqual(new Set([1, 2, 3]));
    });
});
