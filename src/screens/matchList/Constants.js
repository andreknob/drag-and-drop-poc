const STATIC_LIST = [
    {
        id: 'item_0',
        label: 'Australia'
    },
    {
        id: 'item_1',
        label: 'Spain'
    },
    {
        id: 'item_2',
        label: 'Germany'
    },
    {
        id: 'item_3',
        label: 'U.S.A.'
    },
];

const OPTIONS = [
    {
        id: 'option_0',
        label: 'Berlim'
    },
    {
        id: 'option_1',
        label: 'Madrid'
    },
    {
        id: 'option_2',
        label: 'Sydney'
    },
    {
        id: 'option_3',
        label: 'New York'
    },
    {
        id: 'option_4',
        label: 'Rio de Janeiro'
    },
    {
        id: 'option_5',
        label: 'Paris'
    },
    {
        id: 'option_6',
        label: 'Rome'
    },
];

const ANSWERS = STATIC_LIST.map((item, index) => ({ id: `no-option_${index}` }));

const DROPPABLES = {
    OPTIONS: 'optionsDroppable'
};
DROPPABLES.ANSWERS = STATIC_LIST.reduce((acc, index) => {
    const key = `answersDroppable_${index}`;
    acc[key] = key;

    return acc;
}, {});

const CONSTANTS = {
    ANSWERS,
    DROPPABLES,
    OPTIONS,
    STATIC_LIST
};

export default CONSTANTS;