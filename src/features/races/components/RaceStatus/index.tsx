import { Badge, Text } from "@mantine/core";

interface Props {
  status: number;
  type?: "text" | "badge";
}

function RaceStatus({ status, type = "text" }: Props) {
  const statusObject = statuses.find((statusObj) => statusObj.id === status);

  if (type === "badge") {
    return (
      <Badge color={`${statusObject?.color}`} tt={"lowercase"}>
        {statusObject?.label}
      </Badge>
    );
  }
  return (
    <Text size={"xs"} fw={"bold"} color={`${statusObject?.color}`}>
      {statusObject?.label}
    </Text>
  );
}

const statuses: Array<{ id: number; label: string; color: string }> = [
  {
    id: 1,
    label: "En attente",
    color: "red",
  },
  {
    id: 2,
    label: "Pris en charge",
    color: "orange",
  },
  {
    id: 3,
    label: "En cours",
    color: "blue",
  },
  {
    id: 4,
    label: "Completée",
    color: "green",
  },
];

export default RaceStatus;
