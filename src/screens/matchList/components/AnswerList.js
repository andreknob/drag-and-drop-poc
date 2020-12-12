import React from 'react';
import styled from 'styled-components';
import AnswerDroppable from './AnswerDroppable';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    flex-grow: 1;
`;

function AnswerList({ staticList, answerList }) {

    return (
        <Container>
            {staticList.map((item, index) => (<AnswerDroppable key={item.id} index={index} answer={answerList[index]} />))}
        </Container>
    );
}

export default AnswerList;