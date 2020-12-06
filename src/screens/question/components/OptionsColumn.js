import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Option from './Option';
import { DROPPABLES } from '../Constants';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const OptionsList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

function OptionsColumn({ options, title = 'Choose one option from below', isDropDisabled }) {
    return (
        <Container>
            <Title>{title}</Title>
            <Droppable
                droppableId={DROPPABLES.OPTIONS_COLUMN}
                isDropDisabled={isDropDisabled}>
                {(provided, snapshot) => (
                    <OptionsList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {options.map((option, index) => <Option key={option.id} option={option} index={index} />)}
                        {provided.placeholder}
                    </OptionsList>
                )}
            </Droppable>
        </Container>
    );
}

export default OptionsColumn;