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
    },
    columnOrder: ['column_1'],
};

export default initialData;