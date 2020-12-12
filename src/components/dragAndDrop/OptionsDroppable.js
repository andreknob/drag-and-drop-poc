import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
`;

 
const Title = styled.h3`
    padding: 8px;
`;

function OptionsDroppable(props) {
    const {
        title = 'Choose one option from below',
        droppableId = 'optionsDroppable',
        direction = 'vertical',
        isDropDisabled,
        children
    } = props;

    return (
        <Container>
            <Title>{title}</Title>
            <Droppable
                droppableId={droppableId}
                direction={direction}
                isDropDisabled={isDropDisabled}
            >
                {children}
            </Droppable>
        </Container>
    );
}

export default OptionsDroppable;