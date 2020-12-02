const initialData = {
    tasks: {
        task1: { id: 'task1', content: 'Take out the garbage' },
        task2: { id: 'task2', content: 'Watch my favorite show' },
        task3: { id: 'task3', content: 'Charge my phone' },
        task4: { id: 'task4', content: 'Cook dinner' },
    },
    columns: {
        column_1: {
            id: 'column_1',
            title: 'To do',
            taskIds: ['task1', 'task2', 'task3', 'task4'],
        },
        column_2: {
            id: 'column_2',
            title: 'In progress',
            taskIds: [],
        },
        column_3: {
            id: 'column_3',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['column_1', 'column_2', 'column_3'],
};

export default initialData;