import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const AnswerDiv = styled.div`
    visibility: ${props => (props.answerId == null || (props.isDraggingOption && props.isDraggingOverDroppable) ? 'hidden' : 'visible')};
    background-color: ${props => props.showResult ? (props.isRightAnswer ? 'lightgreen' : '#FF9999') : 'white'};
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    min-height: 20px;
    width: 186px;
    margin-bottom: 8px;
`;

function AnswerDraggable(props) {
    const {
        answer,
        showResult,
        rightAnswer,
        isDraggingOption,
        isDraggingOverDroppable
    } = props;

    return (
        <Draggable draggableId={answer.id ? answer.id : 'no-option'} index={0}>
            {(draggableProvided) => (
                <AnswerDiv
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    ref={draggableProvided.innerRef}
                    isDraggingOption={isDraggingOption}
                    isDraggingOverDroppable={isDraggingOverDroppable}
                    showResult={showResult}
                    isRightAnswer={answer.id === rightAnswer}
                    answerId={answer.id}
                >
                    {answer.label}
                </AnswerDiv>
            )}
        </Draggable>
    );
}

export default AnswerDraggable;