import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Option from '../../components/dragAndDrop/Option';
import OptionsDroppable from '../../components/dragAndDrop/OptionsDroppable';
import OptionsList, { StyledContainer as OptionsListStyledContainer } from '../../components/dragAndDrop/OptionsList';
import Result from '../../components/result/Result';
import AnswerDroppable from './components/AnswerDroppable';
import { DROPPABLES, OPTIONS } from './Constants';

const CORRECT_ANSWER = 'option_3';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const DnDContainer = styled.div`
    display: flex;
`;
const OptionsListExtraStyledContainer = styled(OptionsListStyledContainer)`
    background-color: ${props => props.isDraggingOver && props.isDraggingAnswer ? 'skyblue' : 'white'}
`;

function DragCorrectAnswer() {
    const [state, setState] = useState({ options: OPTIONS }); 
    const [isDraggingAnswer, setIsDraggingAnswer] = useState(false);
    const [isDraggingOption, setIsDraggingOption] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const handleDragStart = useCallback(({ source }) => {
        if (source.droppableId === DROPPABLES.OPTIONS_DROPPABLE) {
            setIsDraggingOption(true);
        } else {
            setIsDraggingAnswer(true);
        }
      }, []);

    const handleDragEnd = useCallback(({ destination, draggableId }) => {
        setIsDraggingAnswer(false);
        setIsDraggingOption(false);
        setIsAnswerCorrect(null);

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

    const renderOptionsList = useCallback((provided, snapshot) => (
        <OptionsList
            provided={provided}
            Container={OptionsListExtraStyledContainer}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingAnswer={isDraggingAnswer}
        >
            {state.options.map((option, index) => <Option key={option.id} option={option} index={index} />)}
        </OptionsList>
    ), [state, isDraggingAnswer]);
    
    return (
        <Container>
            <DragDropContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <DnDContainer>
                    <AnswerDroppable
                        img='strawberry.jpg'
                        answer={state.answer}
                        isDropDisabled={isDraggingAnswer}
                        isDraggingOption={isDraggingOption}
                        isAnswerCorrect={isAnswerCorrect}
                    />
                    <OptionsDroppable isDropDisabled={isDraggingOption}>
                        {renderOptionsList}
                    </OptionsDroppable>
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