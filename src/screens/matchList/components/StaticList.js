import React from 'react';
import styled from 'styled-components';
import StaticItem from './StaticItem';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    flex-grow: 1;
`;

function StaticList({ list }) {

    return (
        <Container>
            {list.map(item => (<StaticItem key={item.id} item={item} />))}
        </Container>
    );
}

export default StaticList;