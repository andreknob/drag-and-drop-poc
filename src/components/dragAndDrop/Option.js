import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

const StyledContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Option = ({ option, index, Container = StyledContainer }) => (
    <Draggable draggableId={option.id} index={index}>
        {(provided, snapshot) => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
            >
                {option.label}
            </Container>
        )}
    </Draggable>
);

export { StyledContainer };
export default Option;