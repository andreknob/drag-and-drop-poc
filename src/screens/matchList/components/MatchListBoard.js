import React from 'react';
import styled from 'styled-components';
import AnswerList from './AnswerList';
import StaticList from './StaticList';

const Container = styled.div`
    display: flex;

    border: 1px solid lightgray;
    padding: 8px;
    margin: 8px;
`;

function MatchListBoard({ staticList, answerList }) {

    return (
        <Container>
            <StaticList list={staticList} />
            <AnswerList staticList={staticList} answerList={answerList}></AnswerList>
        </Container>
    );
}

export default MatchListBoard;