import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const AnswerDiv = styled.div`
    visibility: ${props => (props.answerId == null || (props.isDraggingOption && props.isDraggingOverDroppable) ? 'hidden' : 'visible')};
    background-color: ${props => props.isAnswerCorrect != null ? (props.isAnswerCorrect ? 'lightgreen' : '#FF9999') : 'white'};
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;

    flex-grow: 1;




`;

/*
    position: fixed;
    top: 78.9271px;
    left: 376.625px;
    box-sizing: border-box;
    width: 306.375px;
    height: 38px;
    transition: opacity 0.2s cubic-bezier(0.2, 0, 0, 1) 0s;
    z-index: 5000;
    pointer-events: none;
    transform: translate(62px, 63px);
*/

function AnswerDraggable(props) {
    const {
        answer,
        isAnswerCorrect,
        isDraggingOption,
        isDraggingOverDroppable,
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
                    isAnswerCorrect={isAnswerCorrect}
                    answerId={answer.id}
                >
                    {answer.label}
                </AnswerDiv>
            )}
        </Draggable>
    );
}

export default AnswerDraggable;