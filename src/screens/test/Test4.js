import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    img {
        max-width: 100%;    
    }


`;

const GridItem = styled.div`
    display: grid;

    &:nth-child(1) {
        grid-row: 1 / 3;

        img {    
            height: 100%;    
        }
    }

    img {
        grid-column: 1;
        grid-row: 1/3;
        align-self: end;
    }

    p {
        background: rgba(0, 0, 0, 0.6);
        padding: 10px;
        color: white;
        grid-column: 1;
        grid-row: 2/3;
    }
`;

function Test4() {

    return (
        <Section>
            <GridItem>
                <img src={`${process.env.PUBLIC_URL}/strawberry.jpg`}></img>
                <p>Legenda</p>
            </GridItem>
            <GridItem>
                <img src={`${process.env.PUBLIC_URL}/strawberry.jpg`}></img>
                <p>Legenda</p>
            </GridItem>
            <GridItem>
                <img src={`${process.env.PUBLIC_URL}/strawberry.jpg`}></img>
                <p>Legenda</p>
            </GridItem>
        </Section>
    );
}

export default Test4;