const shuffle = <T>(array: T[]): T[] => {
    let temp: T = array[0];
    let current: number = array.length;
    let top: number = array.length;

    if (top > 0) {
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            temp = array[current];
            array[current] = array[top];
            array[top] = temp;
        }
    }

    return array;
};

export default shuffle;
