import React, { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import CONSTANTS from '../Constants';

const AnswerDiv = styled.div`
    background-color: ${props => props.isAnswerCorrect != null ? (props.isAnswerCorrect ? 'lightgreen' : '#FF9999') : 'white'};
    
    border: 1px solid lightgrey;
    border-radius: 2px;
    
    padding: 12px;

    height: 100%;
    box-sizing: border-box;

    visibility: ${props => !(CONSTANTS.EMPTY_OPTION_REGEX.test(props.answer.id)) ? 'visible' : 'hidden'};

    &[style] {
        transition-duration: 0.001s;
        transform: ${props => props.isForeignDraggableDraggingOver ? 'translate(347px, 0) !important' : 'none'};
    }
`;

function Answer(props) {
    const {
        provided,
        setAnswerDraggableRef,
        children, 
        ...extraProps
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
            {...extraProps}
        >
            {children}
        </AnswerDiv>
    );
}

function AnswerDraggable(props) {
    const {
        answer,
        draggableId,
        ...extraProps
    } = props;

    return (
        <Draggable draggableId={answer.id} index={0}>
            {(provided) => (
                <Answer
                    answer={answer}
                    provided={provided}
                    {...extraProps}
                >
                    {answer.label}
                </Answer>
            )}
        </Draggable>
    );
}

export default AnswerDraggable;