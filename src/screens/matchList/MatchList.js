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

const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 800px;
`;

function MatchList() {
    const [options, setOptions] = useState(CONSTANTS.OPTIONS);
    const [answerDroppableMap, setAnswerDroppableMap] = useState(CONSTANTS.ANSWER_DROPPABLE_MAP);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [correctAnswersMap, setCorrectAnswersMap] = useState({});

    const answerListElement = useRef();

    const swapAnswerToAnswer = useCallback((source, destination) => {
        if (source.droppableId === destination.droppableId) {
            return;
        }

        const sourceAnswer = answerDroppableMap[source.droppableId];
        const destinationAnswer = answerDroppableMap[destination.droppableId];

        const newOptions = [...options];
    
        if (!(CONSTANTS.EMPTY_OPTION_REGEX.test(destinationAnswer.id))) {
            newOptions.push(destinationAnswer);
        }
        const sourceIndex = Object.keys(answerDroppableMap).indexOf(source.droppableId);

        const newAnswerDroppableMap = { ...answerDroppableMap };
        newAnswerDroppableMap[destination.droppableId] = sourceAnswer;
        newAnswerDroppableMap[source.droppableId] = { id: `empty-option_${sourceIndex}` };
    
        setOptions(newOptions);
        setAnswerDroppableMap(newAnswerDroppableMap);
    }, [answerDroppableMap, setAnswerDroppableMap, options, setOptions]);

    const swapAnswerToOption = useCallback((source) => {
        const sourceAnswer = answerDroppableMap[source.droppableId];
    
        const newOptions = [...options];
        newOptions.push(sourceAnswer);

        const sourceIndex = Object.keys(answerDroppableMap).indexOf(source.droppableId);

        const newAnswerDroppableMap = { ...answerDroppableMap };
        newAnswerDroppableMap[source.droppableId] = { id: `empty-option_${sourceIndex}` };
    
        setOptions(newOptions);
        setAnswerDroppableMap(newAnswerDroppableMap);
    }, [answerDroppableMap, setAnswerDroppableMap, options, setOptions]);

    const swapOptionToAnswer = useCallback((source, destination) => {
        const newOptions = [...options];
        const spliced = newOptions.splice(source.index, 1)[0];
    
        const newAnswerDroppableMap = { ...answerDroppableMap };
        const destinationAnswer = answerDroppableMap[destination.droppableId];

        if (!(CONSTANTS.EMPTY_OPTION_REGEX.test(destinationAnswer.id))) {
            newOptions.push(destinationAnswer);
        }

        newAnswerDroppableMap[destination.droppableId] = spliced;
    
        setOptions(newOptions);
        setAnswerDroppableMap(newAnswerDroppableMap);
    }, [answerDroppableMap, setAnswerDroppableMap, options, setOptions]);

    const swapOptionToOption = useCallback((source, destination) => {
        const newOptions = [...options];
    
        const spliced = newOptions.splice(source.index, 1)[0];
        newOptions.splice(destination.index, 0, spliced);

        setOptions(newOptions);
    }, [options, setOptions]);

    const handleDragEnd = useCallback(({ source, destination }) => {
        setIsAnswerCorrect(null);
        setCorrectAnswersMap({});

        if (!destination) {
          return;
        }
        
        if (source.droppableId === CONSTANTS.DROPPABLES.OPTIONS) {
            if (destination.droppableId === CONSTANTS.DROPPABLES.OPTIONS) {
                swapOptionToOption(source, destination);
                return;
            }

            swapOptionToAnswer(source, destination);
            return ;
        }

        if (destination.droppableId !== CONSTANTS.DROPPABLES.OPTIONS) {
            swapAnswerToAnswer(source, destination);
            return;
        }

        swapAnswerToOption(source);
    
    }, [swapAnswerToAnswer, swapAnswerToOption, swapOptionToAnswer, swapOptionToOption]);

    const handleCheckResult = useCallback(() => {
        const correctAnswersMap = Object.keys(answerDroppableMap).map(key => {
            const answer = answerDroppableMap[key];
            const droppable = CONSTANTS.DROPPABLES.ANSWERS.find(item => item.id === key);

            const isAnswerCorrect = CONSTANTS.CORRECT_ANSWERS_MAP[droppable.associatedStaticItemId] === answer.id;
            return {
                droppableId: droppable.id,
                isAnswerCorrect
            };
        }).reduce((acc, item) => {
            acc[item.droppableId] = item.isAnswerCorrect;

            return acc;
        }, {});

        const isAnswerCorrect = Object.keys(correctAnswersMap).every(key => correctAnswersMap[key]);

        setCorrectAnswersMap(correctAnswersMap);
        setIsAnswerCorrect(isAnswerCorrect);
    }, [answerDroppableMap, setCorrectAnswersMap]);

    const handleTryAgain = useCallback(() => {
        setIsAnswerCorrect(null);
        setCorrectAnswersMap({});
        setAnswerDroppableMap(CONSTANTS.ANSWER_DROPPABLE_MAP);
        setOptions(CONSTANTS.OPTIONS);
    }, []);

    const renderOptionsList = useCallback((provided, snapshot) => (
        <OptionsList
            provided={provided}
            extraStyles={EXTRA_STYLES.OPTIONS_LIST}
            isDraggingOver={snapshot.isDraggingOver}
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
    ), [options]);

    return (
        <Container>
            <DragDropContext onDragEnd={handleDragEnd}>
                <MatchListBoard
                    innerRef={answerListElement}
                    staticList={CONSTANTS.STATIC_LIST}
                    answerDroppableMap={answerDroppableMap}
                    correctAnswersMap={correctAnswersMap}
                />
                <OptionsDroppable
                    title='Options'
                    direction={'horizontal'}
                    extraStyles={EXTRA_STYLES.OPTIONS_DROPPABLE}
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