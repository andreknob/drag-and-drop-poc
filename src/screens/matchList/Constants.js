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

const CORRECT_ANSWERS_MAP = {
    item_0: 'option_2',
    item_1: 'option_1',
    item_2: 'option_0',
    item_3: 'option_5',
};

const OPTIONS = [
    {
        id: 'option_0',
        label: 'Munich'
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
        label: 'São Paulo'
    },
    {
        id: 'option_4',
        label: 'Paris'
    },
    {
        id: 'option_5',
        label: 'New York'
    },
    {
        id: 'option_6',
        label: 'Rome'
    },
];

const ANSWERS = STATIC_LIST.map((item, index) => ({ id: `empty-option_${index}` }));

const DROPPABLES = {
    OPTIONS: 'optionsDroppable'
};
DROPPABLES.ANSWERS = STATIC_LIST.map((item, index) => ({ id: `answersDroppable_${index}`, associatedStaticItemId: item.id }));

const ANSWER_DROPPABLE_MAP = DROPPABLES.ANSWERS.reduce((acc, item, index) => {
    acc[item.id] = ANSWERS[index];
    return acc;
}, {});

const EMPTY_OPTION_REGEX = /^empty-option_([0-9]|[1-9][0-9]+)$/;

const CONSTANTS = {
    ANSWERS,
    ANSWER_DROPPABLE_MAP,
    CORRECT_ANSWERS_MAP,
    DROPPABLES,
    EMPTY_OPTION_REGEX,
    OPTIONS,
    STATIC_LIST
};

export default CONSTANTS;