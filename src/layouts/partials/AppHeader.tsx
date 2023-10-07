import {
  Header,
  HoverCard,
  Group,
  Text,
  SimpleGrid,
  Divider,
  Center,
  Box,
  Burger,
  Indicator,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconBell,
  IconScreenShare,
  IconSettings,
} from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { headerStyles } from './styles/headerStyles';
import UserAvatar from '../../features/auth/components/avatar/UserAvatar';
import ThemeModeSwitcher from '../../components/ThemeModeSwitcher';
import { MobileDrawer } from './MobileDrawer';
import { configMenu, topMenu } from '../../navigation/menu';
import Logo from '../../components/Logo';
import DropDownLinkItems from './components/DropDownLinkItems';

export function AppHeader() {

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { toggle, fullscreen } = useFullscreen();
  const { classes, theme } = headerStyles();
  
  return (
    <Box pb={50}>
      <Header
        height={60}
        px="md"
        maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
        miw={{ xl: 1200 }}
        mx={{ xl: "auto" }}
        bg={"blue"}
      >
        <Group position="apart" sx={{ height: "100%" }}>
          <Group>
            <Logo />

            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Group spacing={4}>
                        <IconSettings size={18} color="white" />
                        <Box component="span" mr={5}>
                          <Text color="white">Parametres</Text>
                        </Box>
                        <IconChevronDown size={16} color="white" />
                      </Group>
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    <DropDownLinkItems menu={topMenu} />
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Group spacing={4}>
                        <IconSettings size={18} color="white" />
                        <Box component="span" mr={5}>
                          <Text color="white">Configuration courses</Text>
                        </Box>
                        <IconChevronDown size={16} color="white" />
                      </Group>
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    <DropDownLinkItems menu={configMenu} />
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
          </Group>

          <Group className={classes.hiddenMobile}>
            <ActionIcon>
              <IconScreenShare
                onClick={toggle}
                color={fullscreen ? "red" : "white"}
                size="1.125rem"
              />
            </ActionIcon>
            <ActionIcon>
              <Indicator label="0" size={10}>
                <IconBell size="1.125rem" color='white' />
              </Indicator>
            </ActionIcon>
            <UserAvatar />
            <ThemeModeSwitcher />
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <MobileDrawer />
    </Box>
  );
}