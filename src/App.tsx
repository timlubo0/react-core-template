import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import MainNavigator from "./navigation/MainNavigator";
import AppLayout from "./layouts/AppLayout";
import { useBeforeRender } from "./hooks/useBeforeRender";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function App({ children }: { children?: ReactNode }) {
  useBeforeRender(() => {
    window.addEventListener("error", (e) => {
      if (e) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr)
          resizeObserverErr.className = "hide-resize-observer";
        if (resizeObserverErrDiv)
          resizeObserverErrDiv.className = "hide-resize-observer";
      }
    });
  }, []);

  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications autoClose={4000} position="top-right" />
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
  );
}
