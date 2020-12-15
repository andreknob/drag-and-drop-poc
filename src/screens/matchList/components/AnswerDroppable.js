import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import AnswerDraggable from './AnswerDraggable';
import useWindowResizeEventListener from '../../../hooks/useWindowResizeEventListener';

const Container = styled.div`
    margin-bottom: 8px;

    display: flex;
    flex-direction: column;
`;
const DroppableContainer = styled.div`
    flex-grow: 1;
    max-height: ${props => props.answerDraggableSize?.height + 2}px;
    overflow: hidden;
    position: relative;
    background-color: skyblue;

    &:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        border: 1px dashed lightgray;
        border-radius: 2px;
        width: ${props => props.answerDraggableSize?.width}px;
        height: ${props => props.answerDraggableSize?.height}px;
        z-index: -1000;
    }
`;

function AnswerDroppable(props) {
    const {
        answer = {},
        isDropDisabled,
        isAnswerCorrect,
    } = props;

    const answerDraggableElement = useRef();
    const [answerDraggableSize, setAnswerDraggableSize] = useState();

    const draggableId = useMemo(() => `draggable_${answer.id}`, [answer]);

    const setAnswerDraggableRef = useCallback((element) => {
        answerDraggableElement.current = element
    }, [answerDraggableElement]);

    const handleWindowResize = useCallback(() => {
        setAnswerDraggableSize({
            width: answerDraggableElement.current.clientWidth, 
            height: answerDraggableElement.current.clientHeight 
        });
    }, [answerDraggableElement, setAnswerDraggableSize]);

    useWindowResizeEventListener(handleWindowResize);

    const renderChildren = useCallback((provided, snapshot) => {
        const isForeignDraggableDraggingOver = snapshot.isDraggingOver && snapshot.draggingOverWith !== draggableId; 
        const placeholder = isForeignDraggableDraggingOver ? null : provided.placeholder;
        return (
            <DroppableContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                answerDraggableSize={answerDraggableSize}
                highlightBackground={isForeignDraggableDraggingOver}
            >
                <AnswerDraggable
                    answer={answer}
                    setAnswerDraggableRef={setAnswerDraggableRef}
                    isAnswerCorrect={isAnswerCorrect}
                    draggableId={draggableId}
                />
                {placeholder}
            </DroppableContainer>
        );
    }, [answer, draggableId, isAnswerCorrect, answerDraggableSize, setAnswerDraggableRef]);

    return (
        <Container>
            <Droppable
                droppableId={`droppable_${answer.id}`}
                isDropDisabled={isDropDisabled}
                isCombineEnabled
            >
                {renderChildren}
            </Droppable>
        </Container>
    );
}

export default AnswerDroppable;