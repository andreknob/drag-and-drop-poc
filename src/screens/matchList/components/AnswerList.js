import React from 'react';
import styled from 'styled-components';
import AnswerDroppable from './AnswerDroppable';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    flex: 1 1 200px;
    margin: 8px;
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


function AnswerList({ staticList, answerList }) {
    return (
        <Container>
            <Title>Answer list</Title>
            <List>
                {answerList.map((item, index) => (<AnswerDroppable key={item.id} index={index} answer={item} />))}
            </List>
        </Container>
    );
}

export default AnswerList;