import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import Option from '../../components/dragAndDrop/Option';
import OptionsDroppable from '../../components/dragAndDrop/OptionsDroppable';
import OptionsList from '../../components/dragAndDrop/OptionsList';
import templateLiteralsParser from '../../util/templateLiteralsParser';

const Container = styled.div`
    display: flex;
`;
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
    position: relative;
    margin-right: 10px;
    border: 2px solid blue;
    padding: 42px;
    min-width: 0;

    &:after {
        content: '';
        position: absolute;
        top: 37px;
        left: 35px;
        border: 2px dashed lightgray;
        width: 50px;
        height: 25px;
    }
`;

const optionsListExtraStyles = templateLiteralsParser`
`;

function Test() {


    /*return (
        <Container1>
            <Container2>
                <Container3>
                    <Item></Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                    <Item>Item 4</Item>
                    <Item>Item 5</Item>
                    <Item>Item 6</Item>
                </Container3>
            </Container2>
        </Container1>
    )*/

    const renderDroppable1 = (provided) => (
        <OptionsList
            provided={provided}
            >
            {[{id: 'option_1', label: 'option 1'}, {id: 'option_2', label: 'option 2'}].map((option, index) => (
                <Option
                    key={option.id}
                    index={index}
                    option={option} />
            ))}
        </OptionsList>
    );

    const renderDroppable2 = (provided) => (
        <OptionsList
            provided={provided}
            >
            {[{id: 'option_3', label: 'option 3'}, {id: 'option_4', label: 'option 4'}].map((option, index) => (
                <Option
                    key={option.id}
                    index={index}
                    option={option} />
            ))}
        </OptionsList>
    );

    return (
        <Container>
            <DragDropContext>
                <OptionsDroppable
                    title='Droppable 1'
                >
                    {renderDroppable1}
                </OptionsDroppable>
                <OptionsDroppable
                    title='Droppable 2'
                >
                    {renderDroppable2}
                </OptionsDroppable>
            </DragDropContext>
        </Container>
    );
}

export default Test;