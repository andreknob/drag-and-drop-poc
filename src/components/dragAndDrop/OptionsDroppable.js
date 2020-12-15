import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import useExtraStyledComponent from '../../hooks/useExtraStyledComponent';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
`;
 
const Title = styled.h3`
    padding: 8px;
`;

function OptionsDroppable(props) {
    const {
        title = 'Choose one option from below',
        droppableId = 'optionsDroppable',
        direction = 'vertical',
        isDropDisabled,
        extraStyles,
        isCombineEnabled,
        children
    } = props;

    const StyledContainer = useExtraStyledComponent(Container, extraStyles);

    return (
        <StyledContainer>
            <Title>{title}</Title>
            <Droppable
                droppableId={droppableId}
                direction={direction}
                isDropDisabled={isDropDisabled}
                isCombineEnabled={isCombineEnabled}
            >
                {children}
            </Droppable>
        </StyledContainer>
    );
}

export default OptionsDroppable;