import {
  Container,
  Burger,
  HoverCard,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import { Box, Center, Group, Text, Anchor } from "src/components/base";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderTabs.module.css";
import Logo from "src/components/Logo";
import UserAvatar from "src/features/auth/components/avatar/UserAvatar";
import { IconChevronDown, IconSettings } from "@tabler/icons-react";
import { topMenu } from "src/navigation/menu";
import DropDownLinkItems from "../components/DropDownLinkItems";
import { Sidebar } from "../Sidebar";

export function AppHeader() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="lg">
        <Group justify="space-between">
          <Group>
            <Logo />
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Anchor>
                  <Center inline>
                    <Group gap={4}>
                      <IconSettings size={18} />
                      <Box mr={5}>
                        <Text>Parametres</Text>
                      </Box>
                      <IconChevronDown size={16} />
                    </Group>
                  </Center>
                </Anchor>
              </HoverCard.Target>

              <HoverCard.Dropdown>
                <Divider my="sm" mx="-md" />

                <SimpleGrid cols={2} spacing={0}>
                  <DropDownLinkItems menu={topMenu} />
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <UserAvatar />
        </Group>
      </Container>
      <Container size="lg" mt={-23}>
        <Sidebar />
      </Container>
    </div>
  );
}
