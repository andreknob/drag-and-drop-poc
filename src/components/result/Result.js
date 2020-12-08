import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
    margin-left: 8px;
    width: 500px;

    display: flex;
    justify-content: space-between;
`;
const StyledButton = styled.button`
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    cursor: pointer;
    margin-right: 8px;
`;
const WrongAnswerButton = styled(StyledButton)`
    margin-right: 0px;
    margin-left: 8px;
`;
const WrongAnswerContainer = styled.div`
    margin-left: 8px;
`;

function Result(props) {
    const {
        isAnswered = true,
        isAnswerCorrect,
        onCheckResult,
        onTryAgain,
    } = props;

    if (!isAnswered) {
        return null;
    }

    let evaluatedAnswer = null;
    if (isAnswerCorrect) {
        evaluatedAnswer = <span>The answer is correct!</span>;
    } else if (isAnswerCorrect === false) {
        evaluatedAnswer = (
            <WrongAnswerContainer>
                Wrong answer!
                <WrongAnswerButton onClick={onTryAgain}>Try again</WrongAnswerButton>
            </WrongAnswerContainer>
        );
    }

    return (
        <ResultContainer>
            <StyledButton onClick={onCheckResult}>Check result</StyledButton>
            {evaluatedAnswer}
        </ResultContainer>
    );
}

export default Result;