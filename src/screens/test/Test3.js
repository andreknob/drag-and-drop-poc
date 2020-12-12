import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
    display: grid;
    grid-template-columns: 1fr 200px;
    grid-gap: 20px;
    max-width: 800px;
    padding: 10px;
    margin 0 auto;

    img {
        max-width: 100%;    
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const Video = styled.div`
`;
const Sidebar = styled.div`
    div {
        margin-bottom: 10px; 
    }

    @media (max-width: 600px) {
        display: flex;
    }
`;

function Test3() {

    return (
        <Section>
            <Video>
                <img src={`${process.env.PUBLIC_URL}/strawberry.jpg`}></img>
                <h2>Como criar sites</h2>
            </Video>
            <Sidebar>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/strawberry.jpg`}></img>
                    <h2>Legenda</h2>
                </div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/strawberry.jpg`}></img>
                    <h2>Legenda</h2>
                </div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/strawberry.jpg`}></img>
                    <h2>Legenda</h2>
                </div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/strawberry.jpg`}></img>
                    <h2>Legenda</h2>
                </div>
            </Sidebar>
        </Section>
    );
}

export default Test3;