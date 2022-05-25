import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Box } from '@chakra-ui/react';
import { InputTodo } from './InputTodo';
import { TodoList } from './TodoList';
import { format } from 'date-fns';

export type TodoType = {
  title: string;
  detail: string;
  isCompleted: boolean;
  timestamp: string;
};

export const Content = () => {
  const [cookies, setCookie] = useCookies(['Todos']);
  const [Todos, setTodos] = useState<TodoType[]>(cookies.Todos || []);

  // handlers
  const handleDelete = (index: number) => {
    const newArray = [...Todos];
    newArray.splice(index, 1);
    setTodos(newArray);
  };

  const handleChangeStatus = (index: number) => {
    const newArray = [...Todos];
    newArray[index].isCompleted = !!!newArray[index].isCompleted;
    setTodos(newArray);
    handleSort();
  };

  const handleAdd = ({ title, detail }) => {
    setTodos([
      {
        title,
        detail,
        isCompleted: false,
        timestamp: format(new Date(), 'yyyy/MM/dd hh:mm:ss'),
      },
      ...Todos,
    ]);
    setCookie('Todos', Todos);
  };

  const handleSort = () => {
    const completedArray = Todos.filter((Todo) => Todo.isCompleted);
    const workingArray = Todos.filter((Todo) => !Todo.isCompleted);

    // sort keep adding
    workingArray.sort((a, b) => {
      return a.timestamp < b.timestamp ? 1 : -1;
    });

    setTodos([...workingArray, ...completedArray]);
  };

  // update cookie
  useEffect(() => {
    setCookie('Todos', Todos);
  }, [setCookie, Todos]);

  return (
    <Box margin={'0 auto'} padding={'48px'} maxWidth={'768px'}>
      <InputTodo handleAdd={handleAdd} />
      <TodoList
        Todos={Todos}
        handleChangeStatus={handleChangeStatus}
        handleDelete={handleDelete}
      />
    </Box>
  );
};
