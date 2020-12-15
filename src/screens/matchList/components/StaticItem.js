import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;

    margin-bottom: 12px;
`;
const Item = styled.div`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 12px;

    flex-grow: 1;
`;
const Separator = styled.div`
    border: 4px solid black;
    height: 4px;
    width: 50px;
`;

function StaticItem({ item }) {

    return (
        <Container>
            <Item>{item.label}</Item>
        </Container>
    );
}

export default StaticItem;