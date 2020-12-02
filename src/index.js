import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initialData';
import Column from './Column';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [data, setData] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState();

  /*
    const result = {
      draggableId: 'task1',
      type: 'TYPE',
      reason: 'DROP',
      source: {
          droppableId: 'column-1',
          index: 0,
      },
      destination: {
          droppableId: 'column-1',
          index: 1,
      }
    };
  */

  const handleDragStart = useCallback((item) => {
    const index = data.columnOrder.indexOf(item.source.droppableId);
    
    setHomeIndex(index);
  }, [data]);

  const handleDragEnd = useCallback((item) => {
    setHomeIndex(null);

    const { destination, source, draggableId } = item;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
  
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };
  
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      };

      setData(newData);
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds
    };

    const endTaskIds = Array.from(endColumn.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEndColumn = {
      ...endColumn,
      taskIds: endTaskIds
    };

    const newData = {
      ...data,
        columns: {
          ...data.columns,
          [startColumn.id]: newStartColumn,
          [endColumn.id]: newEndColumn
        }
    }

    setData(newData);
  }, [data]);

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Container>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
    
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={index < homeIndex}/>
          );
        })}
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));