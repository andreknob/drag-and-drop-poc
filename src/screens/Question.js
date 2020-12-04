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

const RIGHT_ANSWER = 'option_3';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const DnDContainer = styled.div`
    display: flex;
`;
const ResultContainer = styled.div`
    margin-left: 8px;
    width: 500px;

    display: flex;
    justify-content: space-between;
`;
const StyledButton = styled.button`
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    cursor: pointer;
    margin-right: 8px;
`;
// todo: Check how to improve this code duplication, both buttons are almost equal
const WrongAnswerButton = styled.button`
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    cursor: pointer;
    margin-left: 8px;
`;
const WrongAnswerContainer = styled.div`
    margin-left: 8px;
`;

function Question() {
    const [state, setState] = useState({ choices: CHOICES }); 
    const [startingDroppableId, setStartingDroppableId] = useState();
    const [isDraggingChoice, setIsDraggingChoice] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleDragStart = useCallback(({ source }) => {
        setStartingDroppableId(source.droppableId);

        if (source.droppableId === DROPPABLES.CHOICES_COLUMN) {
            setIsDraggingChoice(true);
        }
      }, []);

    const handleDragEnd = useCallback(({ destination, draggableId }) => {
        setIsDraggingChoice(false);

        let answer = {};
        const choices = [...state.choices];
        
        if (!destination) {
            return;
        }

        if (destination.droppableId === DROPPABLES.ANSWER) {
            const index = choices.findIndex(choice => choice.id === draggableId);

            if (state.answer && state.answer.id) {
                choices.push(state.answer);
            }
            answer = choices[index];
            choices.splice(index, 1);
        } else {
            choices.splice(destination.index, 0, state.answer);
        }

        setState({ answer, choices });
    }, [state]);

    const handleTryAgain = useCallback(() => {
        setShowResult(false);

        const choices = [...state.choices];
        choices.push(state.answer);

        setState({
            choices,
            answer: {},
        });
    }, [state]);
    
    // todo: see how to improve this render, it has a lot of ifs below
    return (
        <Container>
            <DragDropContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <DnDContainer>
                    <Answer
                        img
                        answer={state.answer}
                        isDropDisabled={startingDroppableId === DROPPABLES.ANSWER}
                        isDraggingChoice={isDraggingChoice} />
                    <ChoicesColumn
                        choices={state.choices}
                        isDropDisabled={startingDroppableId === DROPPABLES.CHOICES_COLUMN} />
                </DnDContainer>
            </DragDropContext>
            {state.answer && state.answer.id != null ?
                (
                    <ResultContainer>
                        <StyledButton onClick={() => setShowResult(true)}>Check result</StyledButton>
                        {showResult ?
                            state.answer.id === RIGHT_ANSWER ?
                               <span>The answer is correct!</span>
                               : <WrongAnswerContainer>
                                   Wrong answer!
                                   <WrongAnswerButton onClick={handleTryAgain}>Try again</WrongAnswerButton>
                                 </WrongAnswerContainer>
                            : ''
                        }
                    </ResultContainer>
                )
                : ''
            }
        </Container>
    )
}

export default Question;