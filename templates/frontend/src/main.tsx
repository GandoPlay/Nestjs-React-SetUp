import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';

import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

import {
  BrowserRouter,
  
  
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
            <ChakraProvider>

      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <App />
        </BrowserRouter>
  </QueryClientProvider>
  </ChakraProvider>

  </React.StrictMode>,
)
