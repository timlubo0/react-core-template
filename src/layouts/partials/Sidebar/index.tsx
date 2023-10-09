import { useState } from "react";
import { Paper, Tabs, rem } from "@mantine/core";
import { sideMenu } from "src/navigation/menu";
import { useFeaturePermissions } from "src/features/accessControl/hooks/permissions";
import { Box } from "src/components/base";
import classes from "../AppHeader/HeaderTabs.module.css";
import { useNavigate, useNavigation } from "react-router-dom";

const HEADER_HEIGHT = rem(60);

export function Sidebar() {
  const links = sideMenu;

  const [active, setActive] = useState(links[0].href);

  const permissionsChecker = useFeaturePermissions();
  const navigate = useNavigate();

  const items = links.map((link) =>
    permissionsChecker(link.href)?.canRead ? (
      <Tabs.Tab value={link.href} key={link.title}>
        {link.title}
      </Tabs.Tab>
    ) : (
      <></>
    )
  );

  return (
    <Paper>
      <Box
      h={HEADER_HEIGHT}
      maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
      miw={{ xl: 1200 }}
      mx={{ xl: "auto" }}
      p={8}
    >
      <Tabs
        defaultValue={active}
        variant="outline"
        visibleFrom="sm"
        classNames={{
          root: classes.tabs,
          list: classes.tabsList,
          tab: classes.tab,
        }}
        onChange={(link) => navigate(`${link}`)}
      >
        <Tabs.List>{items}</Tabs.List>
      </Tabs>
    </Box>
    </Paper>
  );
}
