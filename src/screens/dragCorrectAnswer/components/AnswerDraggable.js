import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const AnswerDiv = styled.div`
    visibility: ${props => (props.answerId == null || (props.isDraggingOption && props.isDraggingOverDroppable) ? 'hidden' : 'visible')};
    background-color: ${props => props.isAnswerCorrect != null ? (props.isAnswerCorrect ? 'lightgreen' : '#FF9999') : 'white'};
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    min-height: 20px;
    width: ${props => props.optionElementWidth}px;
    margin-bottom: 8px;
`;

function AnswerDraggable(props) {
    const {
        answer,
        isAnswerCorrect,
        isDraggingOption,
        isDraggingOverDroppable,
        optionsListElementWidth
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
                    optionElementWidth={optionsListElementWidth - 34}
                >
                    {answer.label}
                </AnswerDiv>
            )}
        </Draggable>
    );
}

export default AnswerDraggable;