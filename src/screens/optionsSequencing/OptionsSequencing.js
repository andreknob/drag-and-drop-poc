import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import templateLiteralsParser from '../../util/templateLiteralsParser';
import Option from '../../components/dragAndDrop/Option';
import OptionsDroppable from '../../components/dragAndDrop/OptionsDroppable';
import OptionsList from '../../components/dragAndDrop/OptionsList';
import Result from '../../components/result/Result';
import { OPTIONS } from './Constants';

const CORRECT_ANSWER = ['option_1', 'option_2', 'option_3', 'option_4', 'option_5'];

const Container = styled.div`
    display: flex;
    flex-direction: column;
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
    background-color: ${props => getBackgroundColor(props.isDraggingOver, props.isAnswerCorrect)}
`;

const optionExtraStyles = templateLiteralsParser`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 74px;
    margin-right: 16px;

    font-size: 36px;
`;

function OptionsSequencing() {
    const [options, setOptions] = useState(OPTIONS);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const handleDragEnd = useCallback(({ destination, source }) => {
        setIsAnswerCorrect(null);

        if (!destination || destination.index === source.index) {
          return;
        }
    
        const newOptions = [...options];
    
        const spliced = newOptions.splice(source.index, 1)[0];
        newOptions.splice(destination.index, 0, spliced);

        setOptions(newOptions);
    }, [options]);

    const handleCheckResult = useCallback(() => {
        const equalsToAnswer = options.every((option, index) => {
            return option.id === CORRECT_ANSWER[index];
        });

        if (equalsToAnswer) {
            setIsAnswerCorrect(true);
        } else {
            setIsAnswerCorrect(false);
        }
    }, [options]);

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
                <OptionsDroppable
                    title='Reorder the elements below until they are in the right order'
                    width={600}
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

export default OptionsSequencing;