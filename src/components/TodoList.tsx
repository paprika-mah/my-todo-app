import React, { useEffect, useState } from 'react';
import { Button, Text, HStack, VStack, Collapse } from '@chakra-ui/react';
import { Todo } from './Todo';
import { TodoType } from './Content';

type Props = {
  Todos: TodoType[];
  handleChangeStatus: (index: number) => void;
  handleDelete: (index: number) => void;
};

const arrayLengthExists = (array: any[]) => {
  return array.some((v) => v);
};

export const TodoList: React.FC<Props> = ({
  Todos,
  handleChangeStatus,
  handleDelete,
}) => {
  const [isToDoExists, setIsToDoExists] = useState<boolean>(
    arrayLengthExists(Todos)
  );
  const [completed, setCompleted] = useState<boolean>(true);
  const [working, setWorking] = useState<boolean>(true);

  // update Todos, update state
  useEffect(() => {
    setIsToDoExists(arrayLengthExists(Todos));
  }, [Todos]);

  // handle filter when click
  const handleFilter = (type: 'all' | 'completed' | 'working') => {
    // process
    const typeHandler = {
      all: () => {
        setCompleted(true);
        setWorking(true);
      },
      completed: () => {
        setCompleted(true);
        setWorking(false);
      },
      working: () => {
        setCompleted(false);
        setWorking(true);
      },
    };
    // do
    typeHandler[type]();
  };

  // filter Todos data
  const filterTodos = () => {
    const completedArray = completed
      ? Todos.filter((Todo) => Todo.isCompleted)
      : [];
    const workingArray = working
      ? Todos.filter((Todo) => !Todo.isCompleted)
      : [];
    return [...workingArray, ...completedArray];
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
            textDecoration={completed && working ? 'underline' : 'none'}
            _hover={{ backgroundColor: 'transparent', opacity: 0.75 }}
            _active={{ backgroundColor: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            onClick={() => handleFilter('all')}
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
            textDecoration={completed && !working ? 'underline' : 'none'}
            _hover={{ backgroundColor: 'transparent', opacity: 0.75 }}
            _active={{ backgroundColor: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            onClick={() => handleFilter('completed')}
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
            textDecoration={!completed && working ? 'underline' : 'none'}
            _hover={{ backgroundColor: 'transparent', opacity: 0.75 }}
            _active={{ backgroundColor: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            onClick={() => handleFilter('working')}
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
