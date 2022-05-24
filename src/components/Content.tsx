import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Box } from '@chakra-ui/react';
import { InputTask } from './InputTask';
import { TaskList } from './TaskList';
import { format } from 'date-fns';

export type TasksType = {
  title: string;
  detail: string;
  isCompleted: boolean;
  timestamp: string;
};

export const Content = () => {
  const [cookies, setCookie] = useCookies(['tasks']);
  const [tasks, setTasks] = useState<TasksType[]>(cookies.tasks || []);

  // handlers
  const handleDelete = (index: number) => {
    const newArray = [...tasks];
    newArray.splice(index, 1);
    setTasks(newArray);
  };

  const handleChangeStatus = (index: number) => {
    const newArray = [...tasks];
    newArray[index].isCompleted = !!!newArray[index].isCompleted;
    setTasks(newArray);
    handleSort();
  };

  const handleAdd = ({ title, detail }) => {
    setTasks([
      {
        title,
        detail,
        isCompleted: false,
        timestamp: format(new Date(), 'yyyy/MM/dd hh:mm:ss'),
      },
      ...tasks,
    ]);
    setCookie('tasks', tasks);
  };

  const handleSort = () => {
    const completedArray = tasks.filter((task) => task.isCompleted);
    const workingArray = tasks.filter((task) => !task.isCompleted);

    // sort keep adding
    workingArray.sort((a, b) => {
      return a.timestamp < b.timestamp ? 1 : -1;
    });

    setTasks([...workingArray, ...completedArray]);
  };

  // update cookie
  useEffect(() => {
    setCookie('tasks', tasks);
  }, [setCookie, tasks]);

  return (
    <Box margin={'0 auto'} padding={'48px'} maxWidth={'768px'}>
      <InputTask handleAdd={handleAdd} />
      <TaskList
        tasks={tasks}
        handleChangeStatus={handleChangeStatus}
        handleDelete={handleDelete}
      />
    </Box>
  );
};
