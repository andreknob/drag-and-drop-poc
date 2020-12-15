import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import useExtraStyledComponent from '../../hooks/useExtraStyledComponent';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Option = (props) => {
    const {
        option,
        index,
        extraStyles,
        ...extraProps
    } = props;
    const StyledContainer = useExtraStyledComponent(Container, extraStyles);

    return (
        <Draggable draggableId={option.id} index={index}>
            {(provided, snapshot) => (
                <StyledContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    draggingOver={snapshot.draggingOver}
                    {...extraProps}
                >
                    {option.label}
                </StyledContainer>
            )}
        </Draggable>
    );
}

export default Option;