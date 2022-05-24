import * as React from 'react';
import { ChakraProvider, theme, Box, Text } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import { Content } from './components/Content';

export const App = () => (
  <ChakraProvider theme={theme}>
    <CookiesProvider>
      <Box backgroundColor={'gray.50'} minHeight={'100vh'}>
        <Box backgroundColor={'green.500'}>
          <Text color={'white'} textAlign={'center'} fontSize={'sm'}>
            my TODO App 😉
          </Text>
        </Box>
        <Content />
      </Box>
    </CookiesProvider>
  </ChakraProvider>
);
