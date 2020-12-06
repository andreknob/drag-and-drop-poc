import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Answer from './components/Answer';
import OptionsColumn from './components/OptionsColumn';
import Result from './components/Result';
import { DROPPABLES, OPTIONS } from './Constants';

const RIGHT_ANSWER = 'option_3';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const DnDContainer = styled.div`
    display: flex;
`;

function Question() {
    const [state, setState] = useState({ options: OPTIONS }); 
    const [startingDroppableId, setStartingDroppableId] = useState();
    const [isDraggingOption, setIsDraggingOption] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleDragStart = useCallback(({ source }) => {
        setStartingDroppableId(source.droppableId);

        if (source.droppableId === DROPPABLES.OPTIONS_COLUMN) {
            setIsDraggingOption(true);
        }
      }, []);

    const handleDragEnd = useCallback(({ destination, draggableId }) => {
        setIsDraggingOption(false);
        setShowResult(false);

        let answer = {};
        const options = [...state.options];
        
        if (!destination) {
            return;
        }

        if (destination.droppableId === DROPPABLES.ANSWER) {
            const index = options.findIndex(option => option.id === draggableId);

            if (state.answer && state.answer.id) {
                options.push(state.answer);
            }
            answer = options[index];
            options.splice(index, 1);
        } else {
            options.splice(destination.index, 0, state.answer);
        }

        setState({ answer, options });
    }, [state]);

    const handleCheckResult = useCallback(() => {
        setShowResult(true);
    }, []);

    const handleTryAgain = useCallback(() => {
        setShowResult(false);

        const options = [...state.options];
        options.push(state.answer);

        setState({
            options,
            answer: {},
        });
    }, [state]);
    
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
                        isDraggingOption={isDraggingOption}
                        rightAnswer={RIGHT_ANSWER}
                        showResult={showResult}/>
                    <OptionsColumn
                        options={state.options}
                        isDropDisabled={startingDroppableId === DROPPABLES.OPTIONS_COLUMN} />
                </DnDContainer>
            </DragDropContext>
            <Result
                answer={state.answer}
                showResult={showResult}
                rightAnswer={RIGHT_ANSWER}
                onCheckResult={handleCheckResult}
                onTryAgain={handleTryAgain}
            />
        </Container>
    )
}

export default Question;