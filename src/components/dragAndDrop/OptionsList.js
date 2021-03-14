import React, { useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 100px;
    ${props => props.extraStyles}
`;

function OptionsList(props) {
    const {
        provided,
        children,
        setRef: setOptionsListRef,
        ...extraProps
    } = props;

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