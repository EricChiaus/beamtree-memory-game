import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { FlippableCard, Game } from './../types';
import { flipCard, generateCards } from './../helpers/cards';

const useGame = (): Game<FlippableCard> => {
    const [items, setItems] = useState<FlippableCard[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const last = useRef<FlippableCard | null>(null);

    const hasCompleted = useMemo<boolean>(
        () => items.every(({ isFlipped }) => isFlipped),
        [items],
    );

    const restart = useCallback(() => {
        setItems(generateCards());
    }, []);

    const getItem = useCallback((index: number) => items[index], [items]);

    const flip = useCallback(
        (index: number) => {
            if (isDisabled || !items[index].isFlippable) {
                return;
            }

            items[index] = flipCard(items[index]);
            setItems([...items]);
            if (last.current) {
                if (!items[index].isFlipped) {
                    if (last.current.content === items[index].content) {
                        items[last.current.index] = {
                            ...items[last.current.index],
                            isFlippable: false,
                        };
                        items[index] = { ...items[index], isFlippable: false };
                        setItems([...items]);
                    } else {
                        items[last.current.index] = {
                            ...items[last.current.index],
                            isFlipped: true,
                        };
                        items[index] = { ...items[index], isFlipped: true };
                        setIsDisabled(true);
                        setTimeout(() => {
                            setItems([...items]);
                            setIsDisabled(false);
                        }, 1000);
                    }
                }
                last.current = null;
            } else {
                last.current = items[index];
            }
        },
        [isDisabled, items],
    );

    useEffect(restart, [restart]);

    return {
        items,
        isDisabled,
        hasCompleted,
        restart,
        flip,
        getItem,
    };
};

export default useGame;
