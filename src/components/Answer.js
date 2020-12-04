import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 500px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const AnswerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    min-height: 350px;
    padding: 8px;

`;
const AnswerDiv = styled.div`
    visibility: ${props => (props.isDraggingChoice && props.isDraggingOver ? 'hidden' : 'visible')};

    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    min-height: 20px;
    width: 186px;
`;
// todo: separate this component
function Answer({ answer = {}, title = 'Drag your answer here', isDropDisabled, isDraggingChoice }) {
    return (
        <Container>
            <Title>{title}</Title>
                <Droppable
                    droppableId={'answer'}
                    isDropDisabled={isDropDisabled}>
                    {(provided, snapshot) => (
                        <AnswerContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}>

                            <Draggable draggableId={answer.id ? answer.id : 'no-choice'} index={0}>
                                {(draggableProvided) => (
                                    <AnswerDiv
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        ref={draggableProvided.innerRef}
                                        isDraggingChoice={isDraggingChoice}
                                        isDraggingOver={snapshot.isDraggingOver}
                                    >
                                        {answer.label}
                                    </AnswerDiv>
                                )}
                            </Draggable>
                            {provided.placeholder}
                    </AnswerContainer>
                    )}
                </Droppable>
        </Container>
    );
}

export default Answer;