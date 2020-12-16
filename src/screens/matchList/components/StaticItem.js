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
    
    position: relative;

    display: flex;
    align-items: center;

    &:after {
        content: '';
        border-bottom: 8px dotted lightgray;
        width: ${props => props.placeholderWidth}px;
        position: absolute;
        right: 0px;
        transform: translate(${props => props.placeholderWidth + 8}px, 0);
    }
`;

function StaticItem({ item, placeholderWidth }) {

    return (
        <Container>
            <Item placeholderWidth={placeholderWidth}>{item.label}</Item>
        </Container>
    );
}

export default StaticItem;