import { useState } from "react";
import { Container, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { sideMenu } from "src/navigation/menu";
import { Link } from "react-router-dom";
import { useFeaturePermissions } from "src/features/accessControl/hooks/permissions";
import { Box } from "src/components/base";

const HEADER_HEIGHT = rem(60);

export function Sidebar() {
  const links = sideMenu;

  const [opened, { close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].href);

  const permissionsChecker = useFeaturePermissions();

  const items = links.map((link) =>
    permissionsChecker(link.href)?.canRead ? (
      <Link
        key={link.title}
        to={link.href}
        onClick={() => {
          setActive(link.href);
          close();
        }}
      >
        {link.title}
      </Link>
    ) : (
      <></>
    )
  );

  return (
    <Box
      h={HEADER_HEIGHT}
      maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
      miw={{ xl: 1200 }}
      mx={{ xl: "auto" }}
    >
      <Container mx={0}>{items}</Container>
    </Box>
  );
}
