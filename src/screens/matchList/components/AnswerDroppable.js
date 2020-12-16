import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import AnswerDraggable from './AnswerDraggable';
import useWindowResizeEventListener from '../../../hooks/useWindowResizeEventListener';

const Container = styled.div`
    margin-bottom: 12px;

    display: flex;
    flex-direction: column;
`;
const DroppableContainer = styled.div`
    flex-grow: 1;
    max-height: ${props => props.answerDraggableSize?.height + 2}px;
    overflow: hidden;
    position: relative;
    background-color: ${props => props.backgroundColor};
    transition: background-color 0.2s ease;
    min-height: 46px;

    &:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        border: 2px dashed lightgray;
        border-radius: 2px;
        width: ${props => props.answerDraggableSize?.width - 2}px;
        height: ${props => props.answerDraggableSize?.height - 2}px;
        z-index: -1000;
    }
`;

function AnswerDroppable(props) {
    const {
        answer = {},
        droppableId,
        isDropDisabled,
        isAnswerCorrect,
    } = props;

    const answerDraggableElement = useRef();
    const [answerDraggableSize, setAnswerDraggableSize] = useState();

    const setAnswerDraggableRef = useCallback((element) => {
        answerDraggableElement.current = element
    }, [answerDraggableElement]);

    const handleWindowResize = useCallback(() => {
        setAnswerDraggableSize({
            width: answerDraggableElement.current.clientWidth, 
            height: answerDraggableElement.current.clientHeight 
        });
    }, [answerDraggableElement, setAnswerDraggableSize]);

    useWindowResizeEventListener(handleWindowResize, 0);

    const renderChildren = useCallback((provided, snapshot) => {
        const isForeignDraggableDraggingOver = snapshot.isDraggingOver && snapshot.draggingOverWith !== answer.id;
        
        let backgroundColor = isForeignDraggableDraggingOver ? 'skyblue' : 'initial';    
        if (isAnswerCorrect === false && !isForeignDraggableDraggingOver) {
            backgroundColor = '#FF9999';
        }
        return (
            <DroppableContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                answerDraggableSize={answerDraggableSize}
                backgroundColor={backgroundColor}
            >
                <AnswerDraggable
                    answer={answer}
                    setAnswerDraggableRef={setAnswerDraggableRef}
                    isAnswerCorrect={isAnswerCorrect}
                    isForeignDraggableDraggingOver={isForeignDraggableDraggingOver}
                />
                {provided.placeholder}
            </DroppableContainer>
        );
    }, [
        answer,
        isAnswerCorrect,
        answerDraggableSize,
        setAnswerDraggableRef
    ]);

    return (
        <Container>
            <Droppable
                droppableId={droppableId}
                direction={'horizontal'}
                isDropDisabled={isDropDisabled}
            >
                {renderChildren}
            </Droppable>
        </Container>
    );
}

export default AnswerDroppable;