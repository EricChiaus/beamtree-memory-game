import { renderHook, act } from '@testing-library/react';
import { FlippableCard } from '../types';
import useGame from './useGame';

const getItemsMap = (items: FlippableCard[]): object => {
    const map = {};
    for (let i = 0; i < items.length; i++) {
        if (map[items[i].content]) {
            map[items[i].content].push(i);
        } else {
            map[items[i].content] = [i];
        }
    }
    return map;
};

const getSameContentIndexes = (items: FlippableCard[]): number[] => {
    const map = getItemsMap(items);
    return Object.values(map)[0];
};

const getAllMoves = (items: FlippableCard[]): number[] => {
    const map = getItemsMap(items);
    return Object.values(map).flat();
};

const getDifferentContentIndexes = (items: FlippableCard[]): number[] => {
    const map = getItemsMap(items);
    return [Object.values(map)[0][0], Object.values(map)[1][0]];
};

describe('useGame hook', () => {
    it('should return initial values', () => {
        const { result } = renderHook(() => useGame());
        expect(result.current.items.length).toBe(16);
        expect(result.current.isDisabled).toBe(false);
        expect(result.current.hasCompleted).toBe(false);
    });

    describe('restart method', () => {
        it('should reset the items', () => {
            const { result } = renderHook(() => useGame());
            act(() => {
                result.current.restart();
            });
            expect(result.current.items.length).toBe(16);
        });
    });

    describe('getItem method', () => {
        it('should get the item by index', () => {
            const { result } = renderHook(() => useGame());
            let item: FlippableCard | null = null;
            item = result.current.getItem(0);
            expect(item).toEqual(result.current.items[0]);
        });
    });

    describe('flip method', () => {
        it('should flip item', () => {
            const { result } = renderHook(() => useGame());
            act(() => {
                result.current.flip(0);
            });
            expect(result.current.items[0].isFlipped).toBe(false);
        });

        describe('when flips an item two times', () => {
            it('should not change the item as a result', () => {
                const { result } = renderHook(() => useGame());
                act(() => {
                    result.current.flip(0);
                });
                act(() => {
                    result.current.flip(0);
                });
                expect(result.current.items[0].isFlipped).toBe(true);
            });
        });

        describe('when flips 2 items with same content', () => {
            it('should mark them unflippable', () => {
                const { result } = renderHook(() => useGame());
                const [a, b] = getSameContentIndexes(result.current.items);
                act(() => {
                    result.current.flip(a);
                });
                act(() => {
                    result.current.flip(b);
                });
                expect(result.current.items[a].isFlipped).toBe(false);
                expect(result.current.items[b].isFlipped).toBe(false);
                expect(result.current.items[a].isFlippable).toBe(false);
                expect(result.current.items[b].isFlippable).toBe(false);
            });
        });

        describe('when flips 2 items with different content', () => {
            it('should disable all flipping', () => {
                const { result } = renderHook(() => useGame());
                const [a, b] = getDifferentContentIndexes(result.current.items);
                act(() => {
                    result.current.flip(a);
                });
                act(() => {
                    result.current.flip(b);
                });
                expect(result.current.isDisabled).toBe(true);
                const notAOrB = getItemsMap(result.current.items)[2][0];
                act(() => {
                    result.current.flip(notAOrB);
                });
                expect(result.current.items[notAOrB].isFlipped).toBe(true);
            });

            it('should flip them back later', () => {
                jest.useFakeTimers();
                const { result } = renderHook(() => useGame());
                const [a, b] = getDifferentContentIndexes(result.current.items);
                act(() => {
                    result.current.flip(a);
                });
                act(() => {
                    result.current.flip(b);
                });
                act(() => {
                    jest.advanceTimersByTime(1000);
                });
                expect(result.current.items[a].isFlipped).toBe(true);
                expect(result.current.items[b].isFlipped).toBe(true);
            });
        });
    });

    describe('if game has completed', () => {
        it('should return hasCompleted = true', () => {
            const { result } = renderHook(() => useGame());
            const allMoves = getAllMoves(result.current.items);
            allMoves.forEach(move => {
                act(() => {
                    result.current.flip(move);
                });
            });
            expect(result.current.hasCompleted).toBe(true);
        });
    });
});
