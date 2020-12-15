import React, { useCallback } from 'react';
import styled from 'styled-components';
import useExtraStyledComponent from '../../hooks/useExtraStyledComponent';

const Container = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 100px;
`;

const PlaceholderSpan = styled.span`
    display: none;
`;

function OptionsList(props) {
    const {
        provided,
        children,
        extraStyles,
        setRef: setOptionsListRef,
        ...extraProps
    } = props;

    const StyledContainer = useExtraStyledComponent(Container, extraStyles);

    const setRef = useCallback((ref) => {
        if (typeof setOptionsListRef === 'function') {
            setOptionsListRef(ref);
        }
        provided.innerRef(ref);
    }, [setOptionsListRef, provided]);

    return (
        <StyledContainer
            ref={setRef}
            {...provided.droppableProps}
            {...extraProps}
        >
            {children}
            {provided.placeholder}
        </StyledContainer>
    );
}

export default OptionsList;