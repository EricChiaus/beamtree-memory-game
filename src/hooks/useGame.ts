import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { FlippableCard, Game } from './../types';
import { flipCard, generateCards } from './../helpers/cards';

const useGame = (): Game<FlippableCard> => {
    const [items, setItems] = useState<FlippableCard[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const last = useRef<FlippableCard | null>(null);

    const hasCompleted = useMemo<boolean>(
        () => items.every(({ isFlipped }) => !isFlipped),
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
            setItems([...items]);
            items[index] = flipCard(items[index]);
            if (last.current) {
                if (!items[index].isFlipped) {
                    if (last.current.content === items[index].content) {
                        // Two cards flipped to front side with same content, mark them unflippable
                        items[last.current.index] = {
                            ...items[last.current.index],
                            isFlippable: false,
                        };
                        items[index] = { ...items[index], isFlippable: false };
                        setItems([...items]);
                    } else {
                        // Not same content, set a timer to flip them back
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
                // No card has been flipped yet, save this one.
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
