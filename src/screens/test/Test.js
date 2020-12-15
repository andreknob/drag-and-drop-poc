import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import Option from '../../components/dragAndDrop/Option';
import OptionsDroppable from '../../components/dragAndDrop/OptionsDroppable';
import OptionsList from '../../components/dragAndDrop/OptionsList';
import templateLiteralsParser from '../../util/templateLiteralsParser';
import StaticList from '../matchList/components/StaticList';

const STATIC_LIST = [
    {
        id: 'item_1',
        label: 'Australia'
    },
    {
        id: 'item_2',
        label: 'U.S.A'
    },
    {
        id: 'item_3',
        label: 'Germany'
    },
    {
        id: 'item_4',
        label: 'Spain'
    },
];

const OPTIONS = [
    {
        id: 'option_1_2',
        label: '2'
    },
    {
        id: 'option_1_3',
        label: '3'
    },
    {
        id: 'option_1_4',
        label: '4'
    },
    {
        id: 'option_1_1',
        label: '1'
    },
];

const Container = styled.div`
    display: flex;

    width: 80%;
    max-width: 900px;
`;

const optionsDroppableExtraStyles = templateLiteralsParser`
    border: 0;
    flex: 1 1 200px;
`;

function Test() {

    const [options, setOptions] = useState(OPTIONS);

    const handleDragEnd = useCallback(({ destination, source, combine }) => {

        console.log(combine);
        if (!destination) {
          return;
        }

        const newOptions = [...options];
    
        const spliced = newOptions.splice(source.index, 1)[0];
        newOptions.splice(destination.index, 0, spliced);

        setOptions(newOptions);
    }, [options]);


    const renderDroppableList = (provided) => (
        <OptionsList
            provided={provided}
            >
            {options.map((option, index) => (
                <Option
                    key={option.id}
                    index={index}
                    option={option} />
            ))}
        </OptionsList>
    );
    
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Container>
                <StaticList list={STATIC_LIST} />
                <OptionsDroppable
                    title='Droppable'
                    droppableId='droppableId1'
                    extraStyles={optionsDroppableExtraStyles}
                    isCombineEnabled
                >
                    {renderDroppableList}
                </OptionsDroppable>
            </Container>
        </DragDropContext>
    );
}

export default Test;