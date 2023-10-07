import { useState } from 'react';
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
} from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconChevronDown,
} from '@tabler/icons-react';
import { styles } from './styles';
import { useAuth } from '../../hooks/auth';
import { Routes } from '../../../../navigation/routes';
import { useNavigate } from 'react-router-dom';

export default function UserAvatar() {
  const { classes, theme, cx } = styles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = Routes.login;
  }

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
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            <Avatar alt={user?.name} radius="xl" size={30} color="blue">
              {user?.name?.charAt(0)}
            </Avatar>
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {user?.name}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate('/profile')} icon={<IconSettings size="0.9rem" stroke={1.5} />}>
          Paramètres du compte
        </Menu.Item>
        <Menu.Item
          onClick={handleLogout}
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
        >
          Se déconnecter
        </Menu.Item>
        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
}