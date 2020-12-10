import React, { useCallback } from 'react';
import styled from 'styled-components';
import useExtraStyledComponent from '../../hooks/useExtraStyledComponent';

const StyledContainer = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 100px;
`;

function OptionsList(props) {
    const {
        provided,
        children,
        extraStyles,
        setRef: setOptionsListRef,
        ...extraProps
    } = props;

    const Container = useExtraStyledComponent(StyledContainer, extraStyles);

    const setRef = useCallback((ref) => {
        if (typeof setOptionsListRef === 'function') {
            setOptionsListRef(ref);
        }
        provided.innerRef(ref);
    }, [setOptionsListRef, provided]);

    return (
        <Container
            ref={setRef}
            {...provided.droppableProps}
            {...extraProps}
        >
            {children}
            {provided.placeholder}
        </Container>
    );
}

export default OptionsList;