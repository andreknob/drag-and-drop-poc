import React, { useCallback, useRef, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Option from '../../components/dragAndDrop/Option';
import OptionsDroppable from '../../components/dragAndDrop/OptionsDroppable';
import OptionsList from '../../components/dragAndDrop/OptionsList';
import Result from '../../components/result/Result';
import MatchListBoard from './components/MatchListBoard';
import CONSTANTS from './Constants';
import EXTRA_STYLES from './ExtraStyles';

// const CORRECT_ANSWER = ['option_1', 'option_2', 'option_3', 'option_4', 'option_5'];

const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 800px;
`;

function MatchList() {
    const [options, setOptions] = useState(CONSTANTS.OPTIONS);
    const [answers, setAnswers] = useState(CONSTANTS.ANSWERS);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const answerListElement = useRef();

    const swapAnswerToAnswer = useCallback((destination, source) => {
        const sourceIndex = answers.findIndex(item => source.droppableId.includes(item.id));
        const destinationIndex = answers.findIndex(item => destination.droppableId.includes(item.id));
    
        const newAnswers = [...answers];
        const newOptions = [...options];
    
        if (!answers[destinationIndex].id.includes('no-option')) {
            newOptions.push(answers[destinationIndex]);
        }
        newAnswers[destinationIndex] = answers[sourceIndex];
        newAnswers[sourceIndex] = { id: `no-option_${sourceIndex}` };
    
        setAnswers(newAnswers);
        setOptions(newOptions);
    }, [answers, options, setAnswers, setOptions]);

    const swapAnswerToOption = useCallback((source) => {
        const sourceIndex = answers.findIndex(item => source.droppableId.includes(item.id));
    
        const newAnswers = [...answers];
        const newOptions = [...options];
    
        newOptions.push(answers[sourceIndex]);

        newAnswers[sourceIndex] = { id: `no-option_${sourceIndex}` };
    
        setAnswers(newAnswers);
        setOptions(newOptions);
    }, [answers, options, setAnswers, setOptions]);

    const swapOptionToAnswer = useCallback((destination, source) => {
        const newOptions = [...options];
        const spliced = newOptions.splice(source.index, 1)[0];
    
        const newAnswers = [...answers];
        const destinationIndex = answers.findIndex(item => destination.droppableId.includes(item.id));

        newAnswers[destinationIndex] = spliced;
    
        setAnswers(newAnswers);
        setOptions(newOptions);
    }, [answers, options, setAnswers, setOptions]);

    const swapOptionToOption = useCallback((destination, source) => {
        const newOptions = [...options];
    
        const spliced = newOptions.splice(source.index, 1)[0];
        newOptions.splice(destination.index, 0, spliced);

        setOptions(newOptions);
    }, [options, setOptions]);

    const handleDragEnd = useCallback(({ destination, source }) => {
        setIsAnswerCorrect(null);

        if (!destination) {
          return;
        }
        
        if (source.droppableId === CONSTANTS.DROPPABLES.OPTIONS) {
            if (destination.droppableId === CONSTANTS.DROPPABLES.OPTIONS) {
                swapOptionToOption(destination, source);
                return;
            }

            swapOptionToAnswer(destination, source);
            return ;
        }

        if (destination.droppableId !== CONSTANTS.DROPPABLES.OPTIONS) {
            swapAnswerToAnswer(destination, source);
            return;
        }

        swapAnswerToOption(source);
    
    }, [swapAnswerToAnswer, swapAnswerToOption, swapOptionToAnswer, swapOptionToOption]);

    const handleCheckResult = useCallback(() => {

    }, []);

    const handleTryAgain = useCallback(() => {
        setIsAnswerCorrect(null);

        setOptions(CONSTANTS.OPTIONS);
    }, []);

    const renderOptionsList = useCallback((provided, snapshot) => (
        <OptionsList
            provided={provided}
            extraStyles={EXTRA_STYLES.OPTIONS_LIST}
            isDraggingOver={snapshot.isDraggingOver}
            isAnswerCorrect={isAnswerCorrect}
        >
            {options.map((option, index) => (
                <Option
                    key={option.id}
                    index={index}
                    option={option}
                    answerItemWidth={answerListElement.current?.clientWidth - 16}
                    extraStyles={EXTRA_STYLES.OPTION} />
            ))}
        </OptionsList>
    ), [options, isAnswerCorrect]);
    
    return (
        <Container>
            <DragDropContext onDragEnd={handleDragEnd}>
                <MatchListBoard staticList={CONSTANTS.STATIC_LIST} answerList={answers} innerRef={answerListElement} />
                <OptionsDroppable
                    title='Options'
                    direction={'horizontal'}
                >
                    {renderOptionsList}
                </OptionsDroppable>
            </DragDropContext>
            <Result
                isAnswerCorrect={isAnswerCorrect}
                onCheckResult={handleCheckResult}
                onTryAgain={handleTryAgain}
            />
        </Container>
    )
}

export default MatchList;