import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    flex: 1 3 50px;
`;

function SeparatorPlaceholder({ innerRef }) {
    return <Container ref={innerRef} />;
}

export default SeparatorPlaceholder;