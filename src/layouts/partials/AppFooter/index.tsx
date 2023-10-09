import { Container } from "@mantine/core";
import { Group, ActionIcon, Flex, Paper } from "src/components/base";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Logo from "src/components/Logo";

export function AppFooter() {
  return (
    <Paper p={5}>
      <Flex justify={"space-between"} align={"center"}>
        <Logo />
        <Group gap={0} align="right">
          <ActionIcon size="lg">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Flex>
    </Paper>
  );
}
