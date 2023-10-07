import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter as Router } from "react-router-dom";
import MainNavigator from './navigation/MainNavigator';
import AppLayout from './layouts/AppLayout';
import { useBeforeRender } from './hooks/useBeforeRender';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export default function App({ children }: { children?: ReactNode }) {

  useBeforeRender(() => {
    window.addEventListener("error", (e) => {
      if (e) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div",
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay",
        );
        if (resizeObserverErr)
          resizeObserverErr.className = "hide-resize-observer";
        if (resizeObserverErrDiv)
          resizeObserverErrDiv.className = "hide-resize-observer";
      }
    });
  }, []);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, loader: "bars" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <Notifications autoClose={4000} position="top-right" />
          <QueryClientProvider client={queryClient}>
            <Router>
            {children}
            </Router>
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}