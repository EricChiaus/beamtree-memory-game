import styled from 'styled-components';
import { BOARD_HEIGHT, BOARD_WIDTH } from './../../constants';

export const BoardWrapper = styled.div`
    display: grid;
    grid-template-columns: ${() =>
        new Array(BOARD_WIDTH).fill('148px').join(' ')};
    grid-template-rows: ${() =>
        new Array(BOARD_HEIGHT).fill('198px').join(' ')};
`;
