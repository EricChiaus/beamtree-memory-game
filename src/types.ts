export interface FlippableObject {
    isFlippable: boolean;
    isFlipped: boolean;
}

export interface FlippableCard extends FlippableObject {
    index: number;
    content: string;
}

export interface Game<T> {
    items: T[];
    isDisabled: boolean;
    hasCompleted: boolean;
    restart: () => void;
    flip: (index: number) => void;
    getItem: (index: number) => T | null;
}
