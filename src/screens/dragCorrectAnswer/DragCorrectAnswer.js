import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import OptionsColumn from '../../components/OptionsColumn';
import Answer from './components/Answer';
import Option from '../../components/Option';
import Result from '../../components/Result';
import { DROPPABLES, OPTIONS } from './Constants';

const CORRECT_ANSWER = 'option_3';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const DnDContainer = styled.div`
    display: flex;
`;
const OptionsList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.indicateDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

function DragCorrectAnswer() {
    const [state, setState] = useState({ options: OPTIONS }); 
    const [startingDroppableId, setStartingDroppableId] = useState();
    const [isDraggingOption, setIsDraggingOption] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const handleDragStart = useCallback(({ source }) => {
        setStartingDroppableId(source.droppableId);

        if (source.droppableId === DROPPABLES.OPTIONS_COLUMN) {
            setIsDraggingOption(true);
        }
      }, []);

    const handleDragEnd = useCallback(({ destination, draggableId }) => {
        setIsDraggingOption(false);
        setIsAnswerCorrect(null);
        setStartingDroppableId(null);

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
        if (state.answer.id === CORRECT_ANSWER) {
            setIsAnswerCorrect(true);
        } else {
            setIsAnswerCorrect(false);
        }
    }, [state]);

    const handleTryAgain = useCallback(() => {
        setIsAnswerCorrect(null);

        const options = [...state.options];
        options.push(state.answer);

        setState({
            options,
            answer: {},
        });
    }, [state]);

    const renderOptionsList = useCallback((isDropDisabled) => {
        return (provided, snapshot) => (
            <OptionsList
                ref={provided.innerRef}
                {...provided.droppableProps}
                indicateDraggingOver={snapshot.isDraggingOver && isDropDisabled === false}
            >
                {state.options.map((option, index) => <Option key={option.id} option={option} index={index} />)}
                {provided.placeholder}
            </OptionsList>
        );
    }, [state]);

    let isOptionsColumnDropDisabled;
    if (startingDroppableId != null) {
        isOptionsColumnDropDisabled = startingDroppableId === DROPPABLES.OPTIONS_COLUMN;
    }
    
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
                        isAnswerCorrect={isAnswerCorrect}
                    />
                    <OptionsColumn
                        isDropDisabled={isOptionsColumnDropDisabled}>
                        {renderOptionsList}
                    </OptionsColumn>
                </DnDContainer>
            </DragDropContext>
            <Result
                isAnswered={state.answer?.id != null}
                isAnswerCorrect={isAnswerCorrect}
                onCheckResult={handleCheckResult}
                onTryAgain={handleTryAgain}
            />
        </Container>
    )
}

export default DragCorrectAnswer;