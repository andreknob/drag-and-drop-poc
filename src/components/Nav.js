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
                <Link to='/question'>
                    <li>Question</li>
                </Link>
            </StyledUl>
        </nav>
    )
}

export default Nav;