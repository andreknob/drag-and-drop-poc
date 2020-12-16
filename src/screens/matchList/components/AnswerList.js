import React from 'react';
import styled from 'styled-components';
import AnswerDroppable from './AnswerDroppable';
import CONSTANTS from '../Constants';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    flex: 3 1 200px;
    margin: 8px 8px 8px 0px;
`;

const Title = styled.h3`
    padding: 8px;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;

    flex-grow: 1;
    
    padding: 8px;
`;

function AnswerList({ innerRef, answerDroppableMap, correctAnswersMap }) {
    const { ANSWERS } = CONSTANTS.DROPPABLES;
    return (
        <Container>
            <Title>Answer list</Title>
            <List ref={innerRef}>
                {ANSWERS.map(({ id }) => (
                    <AnswerDroppable
                        key={id}
                        droppableId={id}
                        answer={answerDroppableMap[id]}
                        isAnswerCorrect={correctAnswersMap[id]}
                    />
                ))}
            </List>
        </Container>
    );
}

export default AnswerList;