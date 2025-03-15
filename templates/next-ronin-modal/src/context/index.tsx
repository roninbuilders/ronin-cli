'use client'

import { wagmiConfig } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { WagmiProvider, type State } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

function ContextProvider({ children, initialState }: { children: ReactNode; initialState: State | undefined }) {

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider