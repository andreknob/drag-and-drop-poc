import React from 'react';
import styled from 'styled-components';
import StaticItem from './StaticItem';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    flex: 1 1 200px;
    margin: 8px;
`;

const Title = styled.h3`
    padding: 8px;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;

    flex-grow: 1;
    
    padding: 8px;
`;

function StaticList({ list }) {

    return (
        <Container>
            <Title>Static list</Title>
            <ListContainer>
                {list.map(item => (<StaticItem key={item.id} item={item} />))}
            </ListContainer>
        </Container>
    );
}

export default StaticList;