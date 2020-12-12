import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import templateLiteralsParser from '../../util/templateLiteralsParser';
import Option from '../../components/dragAndDrop/Option';
import OptionsDroppable from '../../components/dragAndDrop/OptionsDroppable';
import OptionsList from '../../components/dragAndDrop/OptionsList';
import Result from '../../components/result/Result';
import MatchListBoard from './components/MatchListBoard';
import { OPTIONS, STATIC_LIST } from './Constants';

// const CORRECT_ANSWER = ['option_1', 'option_2', 'option_3', 'option_4', 'option_5'];

const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 700px;
`;

function getBackgroundColor(isDraggingOver, isAnswerCorrect) {
    if (isDraggingOver) {
        return 'skyblue';
    } else if (isAnswerCorrect != null) {
        if (isAnswerCorrect) {
            return 'lightgreen';
        }
        return '#FF9999';
    }

    return 'white';
};

const optionsListExtraStyles = templateLiteralsParser`
    display: flex;
    justify-content: space-between;
    background-color: ${props => getBackgroundColor(props.isDraggingOver, props.isAnswerCorrect)};
    padding: 8px 0 8px 12px;
`;

const optionExtraStyles = templateLiteralsParser`
    display: flex;
    justify-content: center;
    align-items: center;

    flex-grow: 1;
    font-size: 36px;
    margin-right: 16px;
`;

function MatchList() {
    const [options, setOptions] = useState(OPTIONS);
    const [answers, setAnswers] = useState([{id: 'answer_1', label: 'New York'}, {id: 'answer_2', label: 'Sydney'}, {id: 'answer_3', label: 'Berlim'}, {id: 'answer_4', label: 'Madrid'}]);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const handleDragEnd = useCallback(({ destination, source }) => {
        setIsAnswerCorrect(null);

        if (!destination) {
          return;
        }
        
        if (destination.droppableId.includes('answer_')) {
         
            if (source.droppableId.includes('answer_')) {
                const sourceIndex = source.droppableId.split('_')[1];
                const destinationIndex = destination.droppableId.split('_')[1];

                const newAnswers = [...answers];

                const destinationAux = answers[destinationIndex];
                newAnswers[destinationIndex] = answers[sourceIndex];
                newAnswers[sourceIndex] = destinationAux;

                setAnswers(newAnswers);
            }

            return;
        }

        const newOptions = [...options];
    
        const spliced = newOptions.splice(source.index, 1)[0];
        newOptions.splice(destination.index, 0, spliced);

        setOptions(newOptions);
    }, [answers, options]);

    const handleCheckResult = useCallback(() => {

    }, []);

    const handleTryAgain = useCallback(() => {
        setIsAnswerCorrect(null);

        setOptions(OPTIONS);
    }, []);

    const renderOptionsList = useCallback((provided, snapshot) => (
        <OptionsList
            provided={provided}
            extraStyles={optionsListExtraStyles}
            isDraggingOver={snapshot.isDraggingOver}
            isAnswerCorrect={isAnswerCorrect}
        >
            {options.map((option, index) => (
                <Option
                    key={option.id}
                    index={index}
                    option={option}
                    extraStyles={optionExtraStyles} />
            ))}
        </OptionsList>
    ), [options, isAnswerCorrect]);
    
    return (
        <Container>
            <DragDropContext onDragEnd={handleDragEnd}>
                <MatchListBoard staticList={STATIC_LIST} answerList={answers} />
                <OptionsDroppable
                    title=''
                    direction='horizontal'
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