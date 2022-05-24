import React, { useState } from 'react';
import { Button, Text, HStack, VStack } from '@chakra-ui/react';
import { Task } from './Task';
import { TasksType } from './Content';

type Props = {
  tasks: TasksType[];
  handleChangeStatus: (index: number) => void;
  handleDelete: (index: number) => void;
};

export const TaskList: React.FC<Props> = ({
  tasks,
  handleChangeStatus,
  handleDelete,
}) => {
  const [completed, setCompleted] = useState<boolean>(true);
  const [working, setWorking] = useState<boolean>(true);

  // handle filter when click
  const handleFilter = (type: 'completed' | 'working') => {
    const typeHandler = {
      completed: setCompleted,
      working: setWorking,
    };
    typeHandler[type]((prev) => !!!prev);
  };

  // filter tasks data
  const filterTasks = () => {
    const completedArray = completed
      ? tasks.filter((task) => task.isCompleted)
      : [];
    const workingArray = working
      ? tasks.filter((task) => !task.isCompleted)
      : [];
    return [...workingArray, ...completedArray];
  };

  return (
    <>
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
          textDecoration={completed ? 'underline' : 'none'}
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
          textDecoration={working ? 'underline' : 'none'}
          _hover={{ backgroundColor: 'transparent', opacity: 0.75 }}
          _active={{ backgroundColor: 'transparent' }}
          _focus={{ boxShadow: 'none' }}
          onClick={() => handleFilter('working')}
        >
          Working
        </Button>
      </HStack>
      <VStack spacing={'12px'} align={'stretch'}>
        {filterTasks().map((task, index) => (
          <Task
            key={`${task.title}-${index}`}
            title={task.title}
            detail={task.detail}
            isCompleted={task.isCompleted}
            timestamp={task.timestamp}
            onChange={() => handleChangeStatus(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </VStack>
    </>
  );
};
