import React from "react";
import {
  AppShell,
  Container,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";
import { excludeInAppLayoutRoutes } from "src/navigation/routes";
import { useAuth } from "src/features/auth/hooks/auth";
import {
  AppHeader,
  AppBreadcrumbs,
  AppFooter,
  Sidebar,
  Navbar,
} from "src/layouts/partials";
import { useDisclosure } from "@mantine/hooks";
import Logo from "src/components/Logo";
import { Stack, Paper } from "src/components/base";

interface Props {
  children: ReactNode;
}

function AppLayout({ children }: Props) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();

  const location = window.location;
  const [pathname, setPathname] = React.useState<string>(location.pathname);
  const auth = useAuth();

  React.useEffect(() => {
    setPathname(location.pathname);
  }, [pathname, location, auth.accessToken]);

  if (excludeInAppLayoutRoutes.includes(pathname)) return <>{children}</>;

  return (
    <AppShell
      header={{ height: 60 }}
      // navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      bg={colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]}
    >
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg">
          <Stack m={10}>
            <AppBreadcrumbs />
            <Paper>{children}</Paper>
          </Stack>
        </Container>
      </AppShell.Main>
      <AppFooter />
    </AppShell>
  );
}

export default AppLayout;
