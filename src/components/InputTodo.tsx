import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Input,
  Textarea,
  HStack,
  VStack,
} from '@chakra-ui/react';

type Props = {
  handleAdd: ({ title, detail }: { title: string; detail: string }) => void;
};

export const InputTodo: React.FC<Props> = ({ handleAdd: propsHandleAdd }) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [isAddValid, setIsAddValid] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // handlers
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value) {
      setIsDetailOpen(true);
      setIsAddValid(true);
    } else {
      setIsDetailOpen(false);
      setIsAddValid(false);
    }
  };

  const handleChangeDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  };

  const handleAdd = () => {
    propsHandleAdd({ title, detail });
    setTitle('');
    setDetail('');
    setIsAddValid(false);
    setIsDetailOpen(false);
  };

  return (
    <Box marginBottom={'24px'}>
      <VStack spacing="16px" align="stretch">
        <HStack spacing="16px">
          <Input
            value={title}
            placeholder="Enter your Todo title"
            onChange={handleChangeTitle}
            size={'lg'}
            backgroundColor={'white'}
          />
          <Button
            backgroundColor={isAddValid ? 'green.500' : 'gray.300'}
            disabled={!!!isAddValid}
            color={'white'}
            onClick={handleAdd}
            size={'lg'}
            _hover={{
              backgroundColor: isAddValid ? 'green.400' : 'gray.300',
            }}
          >
            Add
          </Button>
        </HStack>
        <Collapse in={isDetailOpen} animateOpacity>
          <Textarea
            value={detail}
            placeholder="Enter your Todo detail"
            onChange={handleChangeDetail}
            size={'lg'}
            backgroundColor={'white'}
          />
        </Collapse>
      </VStack>
    </Box>
  );
};
