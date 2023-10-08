import { Text, Box } from "@mantine/core";
import StatsGridIcons from "../components/StatsGridIcons";
import { TableReviews } from "../components/TableReviews";

export default function StatsGroup() {
  const stats = data.map((stat) => (
    <div key={stat.title}>
      <Text>{stat.stats}</Text>
      <Text>{stat.title}</Text>
      <Text>{stat.description}</Text>
    </div>
  ));
  return (
    <Box p={"lg"}>
      <div>{stats}</div>
      <StatsGridIcons />
      <TableReviews />
    </Box>
  );
}

const data = [
  {
    title: "Page views",
    stats: "456,133",
    description:
      "24% more than in the same month last year, 33% more that two years ago",
  },
  {
    title: "New users",
    stats: "2,175",
    description:
      "13% less compared to last month, new user engagement up by 6%",
  },
  {
    title: "Completed orders",
    stats: "1,994",
    description: "1994 orders were completed this month, 97% satisfaction rate",
  },
  {
    title: "Completed orders",
    stats: "1,994",
    description: "1994 orders were completed this month, 97% satisfaction rate",
  },
];
