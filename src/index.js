import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initialData';
import Column from './Column';

const App = () => {
  const [data, setData] = useState(initialData);

  const handleDragEnd = useCallback(() => {

  }, []);

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
  
        return <Column key={column.id} column={column} tasks={tasks} />;
      })
      }
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));