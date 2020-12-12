import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledUl = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 10vh;
`;

function Nav() {
    return (
        <nav>
            <StyledUl>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/drag-correct-answer'>
                    <li>Drag the correct answer</li>
                </Link>
                <Link to='/options-sequencing'>
                    <li>Options sequencing</li>
                </Link>
                <Link to='/match-list'>
                    <li>Match list</li>
                </Link>
            </StyledUl>
        </nav>
    )
}

export default Nav;