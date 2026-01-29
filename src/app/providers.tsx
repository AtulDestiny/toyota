"use client";

import { ThemeProvider } from "@aws-amplify/ui-react";
import ToyotaTotemTheme from "@/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModelStoreProvider } from "@/providers/model-store-provider";

// Import Amplify and your Gen 2 configuration file
import { Amplify } from "aws-amplify";
// IMPORTANT: Adjust this path based on where your amplify_outputs.json (or similar) is located
// Common locations:
// import amplifyConfig from '../../amplify_outputs.json'; // if at project root and providers is in src/app
// import amplifyConfig from '@/amplify_outputs.json'; // if you have an alias pointing to project root
import amplifyConfig from "@../../../amplify_outputs.json"; // <--- ASSUMING THIS PATH based on typical Next.js setup with src alias

// Configure Amplify
Amplify.configure(amplifyConfig);

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={ToyotaTotemTheme}>
        <ModelStoreProvider>{children}</ModelStoreProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
