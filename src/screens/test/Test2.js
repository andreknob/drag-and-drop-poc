import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;

const Container1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 90vh;
    margin: 0;
`;

const Container2 = styled.div`
    display: flex;
`;

const Container3 = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    border: 4px solid green;
    padding: 8px;
    min-width: 0;
`;
const Item = styled.div`
    position: relative;
    margin-right: 10px;
    border: 2px solid blue;
    padding: 42px;
    min-width: 0;
    flex: 1 1 100px;

    &:after {
        content: '';
        position: absolute;
        top: 37px;
        left: 35px;
        border: 2px dashed lightgray;
        width: 50px;
        height: 25px;
    }
`;

function Test2() {

    return (
        <Container1>
            <Container2>
                <Container3>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                    <Item>Item 4</Item>
                    <Item>Item 5</Item>
                    <Item>Item 6</Item>
                </Container3>
            </Container2>
        </Container1>
    );
}

export default Test2;