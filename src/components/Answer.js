import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 420px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const AnswerContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;

    padding: 8px;
`;
const AnswerDiv = styled.div`
    display: flex;
    flex-grow: 1;

    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
`;

function Answer({ answer = {}, title = 'Drag your answer here', isDropDisabled }) {
    return (
        <Container>
            <Title>{title}</Title>
            <AnswerContainer>
                <Droppable
                    droppableId={'answer'}
                    isDropDisabled={isDropDisabled}>
                    {(provided) => (
                        <AnswerDiv
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Draggable draggableId={answer.id} index={0}>
                                {(draggableProvided, snapshot) => (
                                    <div
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        ref={draggableProvided.innerRef}
                                        isDragging={snapshot.isDragging}
                                    >
                                        {answer.label}
                                    </div>
                                )}
                            </Draggable>
                            {provided.placeholder}
                        </AnswerDiv>
                    )}
                </Droppable>
            </AnswerContainer>
        </Container>
    );
}

export default Answer;