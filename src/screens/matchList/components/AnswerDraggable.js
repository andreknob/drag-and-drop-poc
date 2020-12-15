import React, { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const AnswerDiv = styled.div`
    display: ${props => props.hideDraggable ? 'none' : 'block'};
    background-color: ${props => props.isAnswerCorrect != null ? (props.isAnswerCorrect ? 'lightgreen' : '#FF9999') : 'white'};
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    opacity: 0.7;
    && {
        transition-duration: 0.001s;
    }
`;

function Answer(props) {
    const {
        provided,
        setAnswerDraggableRef,
        hideDraggable,
        isAnswerCorrect,
        children 
    } = props;

    const setRef = useCallback((ref) => {
        if (typeof setAnswerDraggableRef === 'function') {
            setAnswerDraggableRef(ref);
        }
        provided.innerRef(ref);
    }, [setAnswerDraggableRef, provided]);

    return (
        <AnswerDiv
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={setRef}
            hideDraggable={hideDraggable}
            isAnswerCorrect={isAnswerCorrect}
        >
            {children}
        </AnswerDiv>
    );
}

function AnswerDraggable(props) {
    const {
        answer,
        draggableId,
        setAnswerDraggableRef,
        isAnswerCorrect,
        hideDraggable,
    } = props;

    return (
        <Draggable draggableId={draggableId} index={0}>
            {(provided) => (
                <Answer
                    provided={provided}
                    setAnswerDraggableRef={setAnswerDraggableRef}
                    hideDraggable={hideDraggable}
                    isAnswerCorrect={isAnswerCorrect}
                >
                    {answer.label}
                </Answer>
            )}
        </Draggable>
    );
}

export default AnswerDraggable;