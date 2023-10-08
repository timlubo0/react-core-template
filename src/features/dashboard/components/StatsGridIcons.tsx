import { Group, Paper, Text, ThemeIcon, SimpleGrid, Box } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

export default function StatsGridIcons() {
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group align="apart">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon color="gray" variant="light" size={38} radius="md">
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? "teal" : "red"} fw={700}>
            {stat.diff}%
          </Text>{" "}
          {stat.diff > 0 ? "increase" : "decrease"} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <Box py={"lg"}>
      <SimpleGrid cols={3}>{stats}</SimpleGrid>
    </Box>
  );
}

const data = [
  {
    title: "Revenue",
    value: "$13,456",
    diff: 34,
  },
  {
    title: "Profit",
    value: "$4,145",
    diff: -13,
  },
  {
    title: "Coupons usage",
    value: "745",
    diff: 18,
  },
];
