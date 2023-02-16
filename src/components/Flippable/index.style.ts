import styled from 'styled-components';

interface FlippableWrapperProps {
    isFlipped: boolean;
}

export const FlippableWrapper = styled.button`
    transform: ${(props: FlippableWrapperProps) =>
        props.isFlipped ? 'rotateY(180deg)' : 'none'};
    background: ${(props: FlippableWrapperProps) =>
        props.isFlipped ? 'black' : 'transparent'};
    margin: 24px;
    transition-duration: 1s;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
`;
