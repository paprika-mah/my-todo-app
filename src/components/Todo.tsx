import React from 'react';
import { Box, IconButton, Text, HStack } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { TodoType } from './Content';

type Props = {
  onChange: () => void;
  onDelete: () => void;
} & TodoType;

export const Todo: React.FC<Props> = ({
  title,
  detail,
  isCompleted,
  timestamp,
  onChange,
  onDelete,
}) => (
  <Box
    padding={'16px'}
    position={'relative'}
    borderRadius={'4px'}
    backgroundColor={'white'}
    boxShadow={'rgba(0, 0, 0, 0.16) 0px 1px 4px'}
  >
    <HStack spacing={'16px'}>
      <IconButton
        width={'24px'}
        height={'24px'}
        padding={'0'}
        minWidth={'24px'}
        aria-label="check Todo"
        icon={isCompleted ? <CheckIcon /> : undefined}
        onClick={onChange}
        size={'sm'}
        borderRadius={'full'}
        fontSize={'sm'}
        color={'white'}
        borderWidth={'2px'}
        backgroundColor={isCompleted ? 'green.500' : 'transparent'}
        borderColor={isCompleted ? 'green.500' : 'gray.400'}
        _hover={{ backgroundColor: isCompleted ? 'green.400' : 'green.50' }}
      />
      <Box>
        <Text fontSize={'md'} fontWeight={'bold'} paddingRight={'32px'}>
          {title}
        </Text>
        {detail && (
          <Text fontSize={'sm'} marginTop={'4px'} paddingRight={'32px'}>
            {detail}
          </Text>
        )}
        <Text marginTop={'8px'} fontSize={'8px'}>
          {timestamp}
        </Text>
      </Box>
      <IconButton
        width={'24px'}
        height={'24px'}
        padding={'0'}
        minWidth={'24px'}
        aria-label="delete Todo"
        icon={<DeleteIcon />}
        onClick={onDelete}
        size={'sm'}
        position={'absolute'}
        top={'50%'}
        right={'8px'}
        transform={'translate(0, -50%)'}
        borderRadius={'full'}
        fontSize={'sm'}
        background={'transparent'}
        color={'gray.400'}
        _hover={{ backgroundColor: 'red.50', color: 'red.500' }}
      />
    </HStack>
  </Box>
);
