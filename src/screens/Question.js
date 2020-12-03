import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Answer from '../components/Answer';
import ChoicesColumn from '../components/ChoicesColumn';

const CHOICES = [
    {
        id: 'option_1',
        label: 'Option 1'
    },
    {
        id: 'option_2',
        label: 'Option 2'
    },
    {
        id: 'option_3',
        label: 'Option 3'
    },
];

const DROPPABLES = {
    ANSWER: 'answer',
    CHOICES_COLUMN: 'choicesColumn'
};

const Container = styled.div`
  display: flex;
`;

function Question() {
    const [state, setState] = useState({ choices: CHOICES }); 
    const [startingDroppableId, setStartingDroppableId] = useState();

    const handleDragStart = useCallback((item) => {
        setStartingDroppableId(item.source.droppableId);
      }, []);

    const handleDragEnd = useCallback((item) => {
        const { destination, draggableId } = item;

        let answer = {};
        const choices = [...state.choices];
        
        if (!destination) {
            return;
        }

        if (destination.droppableId === DROPPABLES.ANSWER) {
            const index = choices.findIndex(answer => answer.id === draggableId);

            answer = choices[index];
            choices.splice(index, 1);
        } else {
            choices.splice(destination.index, 0, state.answer);
        }

        setState({ answer, choices });
    }, [state]);

    return (
        <DragDropContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
            <Container>
                <Answer img answer={state.answer} isDropDisabled={startingDroppableId === DROPPABLES.ANSWER}/>
                <ChoicesColumn choices={state.choices} isDropDisabled={startingDroppableId === DROPPABLES.CHOICES_COLUMN}/>
            </Container>
        </DragDropContext>
    )
}

export default Question;