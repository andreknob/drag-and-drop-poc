import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {({ draggableProps, dragHandleProps, innerRef: setRef }) => {
                return (
                    <Container
                        {...draggableProps}
                        {...dragHandleProps}
                        ref={setRef}
                    >
                        {task.content}
                    </Container>
                );
            }}
        </Draggable>
    );
}

export default Task;