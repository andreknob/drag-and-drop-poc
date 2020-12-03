import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Choice from './Choice';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const ChoicesList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

function ChoicesColumn({ choices, title = 'Choose one option from below', isDropDisabled }) {
    return (
        <Container>
            <Title>{title}</Title>
            <Droppable
                droppableId={'choicesColumn'}
                isDropDisabled={isDropDisabled}>
                {(provided, snapshot) => (
                    <ChoicesList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {choices.map((choice, index) => <Choice key={choice.id} choice={choice} index={index} />)}
                        {provided.placeholder}
                    </ChoicesList>
                )}
            </Droppable>
        </Container>
    );
}

export default ChoicesColumn;