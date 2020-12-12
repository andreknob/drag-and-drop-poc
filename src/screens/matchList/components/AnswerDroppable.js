import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import AnswerDraggable from './AnswerDraggable';

const Container = styled.div`
    margin-bottom: 8px;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
`;
const DroppableContainer = styled.div`
    display: flex;
    flex-grow: 1;
`;

function AnswerDroppable(props) {
    const {
        answer = {},
        isDropDisabled,
        isDraggingOption,
        isAnswerCorrect,
        index
    } = props;

    return (
        <Container>
            <Droppable
                droppableId={`answer_${index}`}
                isDropDisabled={isDropDisabled}
            >
                {(provided, snapshot) => (
                    <DroppableContainer
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <AnswerDraggable
                            answer={answer}
                            isAnswerCorrect={isAnswerCorrect}
                            isDraggingOption={isDraggingOption}
                            isDraggingOverDroppable={snapshot.isDraggingOver}
                        />
                        {provided.placeholder}
                    </DroppableContainer>
                )}
            </Droppable>
        </Container>
    );
}

export default AnswerDroppable;