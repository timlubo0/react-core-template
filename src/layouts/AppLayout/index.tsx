import React from "react";
import { AppShell, Burger } from "@mantine/core";
import { ReactNode } from "react";
import { excludeInAppLayoutRoutes } from "src/navigation/routes";
import { useAuth } from "src/features/auth/hooks/auth";
import { AppHeader, AppBreadcrumbs, AppFooter, Sidebar } from "src/layouts/partials";
import { useDisclosure } from "@mantine/hooks";
import Logo from "src/components/Logo";

interface Props {
  children: ReactNode;
}

function AppLayout({ children }: Props) {
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
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Logo />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppHeader />
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <AppFooter />
      </AppShell.Footer>
    </AppShell>
  );
}

export default AppLayout;
