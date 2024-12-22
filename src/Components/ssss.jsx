import  { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', isSelected: false },
    { id: 2, text: 'Task 2', isSelected: false },
    { id: 3, text: 'Task 3', isSelected: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setTasks(tasks.map(task => ({ ...task, isSelected: !selectAll })));
  };

  const handleTaskChange = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isSelected: !task.isSelected } : task
    ));
  };

  return (
    <div>
      <div>
        <input 
          type="checkbox" 
          checked={selectAll} 
          onChange={handleSelectAll} 
        />
        Select All
      </div>
      {tasks.map(task => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.isSelected}
            onChange={() => handleTaskChange(task.id)}
          />
          {task.text}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
