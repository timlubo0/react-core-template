import { ChakraProvider } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainNavigator from "./navigation/MainNavigator";
import AppLayout from "./layouts/AppLayout";
import { ReactNode } from "react";
import { theme } from "src/utils/theme";

const queryClient = new QueryClient();

export default function App({ children }: { children?: ReactNode }) {
  return (
    <ChakraProvider>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <ToastContainer />
          <QueryClientProvider client={queryClient}>
            <Router>
              <AppLayout>
                <MainNavigator />
                {children}
              </AppLayout>
            </Router>
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </ChakraProvider>
  );
}
