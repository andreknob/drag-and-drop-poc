import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 100px;
`;

const OptionsList = (props) => {
    const {
        provided,
        Container = StyledContainer,
        children,
        ...extraProps
    } = props;

    return (
        <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...extraProps}
        >
            {children}
            {provided.placeholder}
        </Container>
    );
}

export { StyledContainer };
export default OptionsList;