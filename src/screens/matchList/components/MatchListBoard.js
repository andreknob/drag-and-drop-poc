import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import useWindowResizeEventListener from '../../../hooks/useWindowResizeEventListener';
import AnswerList from './AnswerList';
import SeparatorPlaceholder from './SeparatorPlaceholder';
import StaticList from './StaticList';

const Container = styled.div`
    display: flex;

    border: 1px solid lightgray;
    padding: 12px;
    margin: 8px;
`;

function MatchListBoard(props) {
    const { 
        innerRef,
        staticList,
        answerDroppableMap,
        correctAnswersMap
    } = props;
    
    const [placeholderWidth, setPlaceholderWidth] = useState();
    const placeholderElement = useRef();

    const handleWindowResize = useCallback(() => {
        setPlaceholderWidth(placeholderElement.current.clientWidth);
    }, [placeholderElement, setPlaceholderWidth]);

    useWindowResizeEventListener(handleWindowResize, 0);

    return (
        <Container>
            <StaticList list={staticList} placeholderWidth={placeholderWidth} />
            <SeparatorPlaceholder innerRef={placeholderElement} />
            <AnswerList
                innerRef={innerRef}
                answerDroppableMap={answerDroppableMap}
                correctAnswersMap={correctAnswersMap} />
        </Container>
    );
}

export default MatchListBoard;