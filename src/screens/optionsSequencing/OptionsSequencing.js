import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import OptionsColumn from '../../components/OptionsColumn';
import Option from '../../components/Option';
import Result from '../../components/Result';
import { OPTIONS } from './Constants';

const CORRECT_ANSWER = ['option_2', 'option_1', 'option_4', 'option_3', 'option_5'];

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const OptionsList = styled.div`
    display: flex;

    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.backgroundColor};
    flex-grow: 1;
    min-height: 100px;
`;

function OptionsSequencing() {
    const [state, setState] = useState({ options: OPTIONS });
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const handleDragEnd = useCallback(({ destination, source, draggableId }) => {
        setIsAnswerCorrect(null);

        if (!destination || destination.index === source.index) {
          return;
        }
    
        const options = [...state.options];
    
        const spliced = options.splice(source.index, 1)[0];
        options.splice(destination.index, 0, spliced);
    
        const newData = {
            ...state,
            options
        };

        setState(newData);
    }, [state]);

    const handleCheckResult = useCallback(() => {
        const equalsToAnswer = state.options.every((option, index) => {
            return option.id === CORRECT_ANSWER[index];
        });

        if (equalsToAnswer) {
            setIsAnswerCorrect(true);
        } else {
            setIsAnswerCorrect(false);
        }
    }, [state]);

    const handleTryAgain = useCallback(() => {
        setIsAnswerCorrect(null);

        setState({
            ...state,
            options: OPTIONS,
        });
    }, [state]);

    const getBackgroundColor = useCallback((isDraggingOver) => {
        if (isDraggingOver) {
            return 'skyblue';
        } else if (isAnswerCorrect != null) {
            if (isAnswerCorrect) {
                return 'lightgreen';
            }
            return '#FF9999';
        }

        return 'white';
    }, [isAnswerCorrect]);

    const renderOptionsList = useCallback(() => {
        const extraStyles = `
            display: flex;
            justify-content: center;
            align-items: center;

            width: 74px;
            margin-right: 16px;

            font-size: 36px;
        `;
        return (provided, snapshot) => (
            <OptionsList
                ref={provided.innerRef}
                {...provided.droppableProps}
                backgroundColor={getBackgroundColor(snapshot.isDraggingOver)}>
                {state.options.map((option, index) => (
                    <Option
                        key={option.id}
                        index={index}
                        extraStyles={extraStyles}
                        option={option}
                    />
                ))}
                {provided.placeholder}
            </OptionsList>
        );
    }, [state, getBackgroundColor]);
    
    return (
        <Container>
            <DragDropContext onDragEnd={handleDragEnd}>
                <OptionsColumn
                    title='Reorder the elements below until they are in the right order'
                    width={600}
                    direction='horizontal'>
                    {renderOptionsList}
                </OptionsColumn>
            </DragDropContext>
            <Result
                isAnswered
                isAnswerCorrect={isAnswerCorrect}
                onCheckResult={handleCheckResult}
                onTryAgain={handleTryAgain}
            />
        </Container>
    )
}

export default OptionsSequencing;