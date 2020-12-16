import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100px;
    position: relative;
`;

const Line = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    width: 50px;
    border: 4px solid red;
    margin 0;
`;

function Test4() {

    return (
        <Container><Line/></Container>
    );
}

export default Test4;