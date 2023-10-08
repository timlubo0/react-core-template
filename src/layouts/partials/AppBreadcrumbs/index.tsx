import { Breadcrumbs } from "@mantine/core";
import { Anchor, Flex } from "src/components/base";
import { Routes } from "src/navigation/routes";
import { Link } from "react-router-dom";

const items = [
  { title: "Dashboard", href: Routes.home },
  { title: "page title", href: "#" },
].map((item, index) => (
  <Link to={item.href} key={index} style={{ textDecoration: "none" }}>
    <Anchor>{item.title}</Anchor>
  </Link>
));

export function AppBreadcrumbs() {
  return (
    <Flex
      maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
      miw={{ xl: 1200 }}
      mx={{ xl: "auto" }}
      justify={"space-between"}
    >
      <Breadcrumbs>{items}</Breadcrumbs>
    </Flex>
  );
}
