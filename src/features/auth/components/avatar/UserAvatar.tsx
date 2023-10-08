import { useState } from "react";
import { rem } from "@mantine/core";
import { Menu } from "@mantine/core";
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
} from "../../../../components/base";
import { IconLogout, IconSettings, IconChevronDown } from "@tabler/icons-react";
import { useAuth } from "../../hooks/auth";
import { Routes } from "../../../../navigation/routes";
import { useNavigate } from "react-router-dom";

export default function UserAvatar() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = Routes.login;
  };

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <Avatar alt={user?.name} radius="xl" size={30} color="blue">
              {user?.name?.charAt(0)}
            </Avatar>
            <Text w={500} size="sm" mr={3}>
              {user?.name}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => navigate("/profile")}
          leftSection={<IconSettings size="0.9rem" stroke={1.5} />}
        >
          Paramètres du compte
        </Menu.Item>
        <Menu.Item
          onClick={handleLogout}
          leftSection={<IconLogout size="0.9rem" stroke={1.5} />}
        >
          Se déconnecter
        </Menu.Item>
        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
}
