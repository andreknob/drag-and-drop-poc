import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: ${props => props.width}px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;

function OptionsColumn(props) {
    const {
        title = 'Choose one option from below',
        droppableId = 'optionsColumn',
        direction = 'vertical',
        isDropDisabled,
        width = 220,
        children
    } = props;

    return (
        <Container width={width}>
            <Title>{title}</Title>
            <Droppable
                droppableId={droppableId}
                direction={direction}
                isDropDisabled={isDropDisabled}>
                {children(isDropDisabled)}
            </Droppable>
        </Container>
    );
}

export default OptionsColumn;