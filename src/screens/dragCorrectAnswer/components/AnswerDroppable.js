import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import AnswerDraggable from './AnswerDraggable';

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
const DroppableContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    min-height: 350px;
    padding: 8px 8px 0px 8px;

    background: url('${process.env.PUBLIC_URL}/${props => props.img}') no-repeat center;
    opacity: .9;
`;

function AnswerDroppable(props) {
    const {
        img,
        answer = {},
        title = 'Drag your answer here',
        isDropDisabled,
        isDraggingOption,
        isAnswerCorrect,
        optionsListElementWidth
    } = props;

    return (
        <Container>
            <Title>{title}</Title>
            <Droppable
                droppableId={'answer'}
                isDropDisabled={isDropDisabled}
            >
                {(provided, snapshot) => (
                    <DroppableContainer
                        img={img}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <AnswerDraggable
                            answer={answer}
                            isAnswerCorrect={isAnswerCorrect}
                            isDraggingOption={isDraggingOption}
                            isDraggingOverDroppable={snapshot.isDraggingOver}
                            optionsListElementWidth={optionsListElementWidth}
                        />
                        {provided.placeholder}
                    </DroppableContainer>
                )}
            </Droppable>
        </Container>
    );
}

export default AnswerDroppable;