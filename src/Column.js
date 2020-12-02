import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
`;

const Column = ({ column, tasks }) => {
    return (
        <Container>
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {({ innerRef: setRef, droppableProps, placeholder }) => (
                    <TaskList
                        {...droppableProps}
                        ref={setRef}
                    >
                        {tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                        {placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
}

export default Column;