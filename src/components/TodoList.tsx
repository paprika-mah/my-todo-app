import React, { useState } from 'react';
import { Button, Text, HStack, VStack, Collapse } from '@chakra-ui/react';
import { Todo } from './Todo';
import { TodoType } from './Content';

type Props = {
  Todos: TodoType[];
  handleChangeStatus: (index: number) => void;
  handleDelete: (index: number) => void;
};

type TodoFilterType = 'ALL' | 'COMPLETE' | 'WORKING';

export const TodoList: React.FC<Props> = ({
  Todos,
  handleChangeStatus,
  handleDelete,
}) => {
  const isToDoExists = Todos?.length >= 1 ? true : false;
  const [todoFilter, setTodoFilter] = useState<TodoFilterType>('ALL');

  // filter Todos data
  const filterTodos = () => {
    switch (todoFilter) {
      case 'ALL':
        return Todos;
      case 'COMPLETE':
        return Todos.filter((t) => t.isCompleted);
      case 'WORKING':
        return Todos.filter((t) => !t.isCompleted);
    }
  };

  return (
    <>
      <Collapse in={isToDoExists}>
        <HStack
          marginBottom={'8px'}
          justifyContent={'flex-end'}
          alignItems={'baseline'}
          spacing={'8px'}
        >
          <Button
            fontSize={'xs'}
            padding={'0'}
            height={'auto'}
            minHeight={'auto'}
            backgroundColor={'transparent'}
            textDecoration={todoFilter === 'ALL' ? 'underline' : 'none'}
            _hover={{ backgroundColor: 'transparent', opacity: 0.75 }}
            _active={{ backgroundColor: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            onClick={() => setTodoFilter('ALL')}
          >
            All
          </Button>
          <Text>|</Text>
          <Button
            fontSize={'xs'}
            padding={'0'}
            height={'auto'}
            minHeight={'auto'}
            backgroundColor={'transparent'}
            textDecoration={todoFilter === 'COMPLETE' ? 'underline' : 'none'}
            _hover={{ backgroundColor: 'transparent', opacity: 0.75 }}
            _active={{ backgroundColor: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            onClick={() => setTodoFilter('COMPLETE')}
          >
            Completed
          </Button>
          <Text>|</Text>
          <Button
            fontSize={'xs'}
            padding={'0'}
            height={'auto'}
            minHeight={'auto'}
            backgroundColor={'transparent'}
            textDecoration={todoFilter === 'WORKING' ? 'underline' : 'none'}
            _hover={{ backgroundColor: 'transparent', opacity: 0.75 }}
            _active={{ backgroundColor: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            onClick={() => setTodoFilter('WORKING')}
          >
            Working
          </Button>
        </HStack>
        <VStack spacing={'12px'} align={'stretch'}>
          {filterTodos().map((TodoData, index) => (
            <Todo
              key={`${TodoData.title}-${index}`}
              title={TodoData.title}
              detail={TodoData.detail}
              isCompleted={TodoData.isCompleted}
              timestamp={TodoData.timestamp}
              onChange={() => handleChangeStatus(index)}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </VStack>
      </Collapse>
      <Collapse in={!!!isToDoExists}>
        <Text color={'gray.300'} textAlign={'center'} fontSize={'72px'}>
          {'(^ _ ^)'}
        </Text>
        <Text color={'gray.500'} marginTop={'16px'} textAlign={'center'}>
          Yay! <br />
          No to-dos now!
        </Text>
      </Collapse>
    </>
  );
};
