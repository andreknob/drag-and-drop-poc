import React from 'react';
import styled from 'styled-components';

const Container1 = styled.div`
    display: flex;
    flex-direction: column;
`;

const Container2 = styled.div`
    display: flex;
`;

const Container3 = styled.div`
    display: flex;
    border: 4px solid green;
    padding: 8px;
    min-width: 0;
`;
const Item = styled.div`
    margin-right: 10px;
    border: 2px solid blue;
    padding: 42px;
    min-width: 0;
`;

function Test() {


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
    )
}

export default Test;