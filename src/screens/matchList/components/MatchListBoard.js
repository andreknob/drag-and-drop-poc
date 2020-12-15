import React from 'react';
import styled from 'styled-components';
import AnswerList from './AnswerList';
import StaticList from './StaticList';

const Container = styled.div`
    display: flex;

    border: 1px solid lightgray;
    padding: 12px;
    margin: 8px;
`;

function MatchListBoard({ staticList, answerList, innerRef }) {

    return (
        <Container>
            <StaticList list={staticList} />
            <AnswerList
                innerRef={innerRef}
                answerList={answerList} />
        </Container>
    );
}

export default MatchListBoard;