import { Badge, Text } from "@mantine/core";

interface Props {
  price: number;
  paidAmount: number;
  type?: "text" | "badge";
}

function RacePayStatus({ price, paidAmount, type = "text" }: Props) {
  const isPaid = price === paidAmount;
  const statusObject = statuses.find(
    (statusObj) => statusObj.isPaid === isPaid
  );

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

const statuses: Array<{ isPaid: boolean; label: string; color: string }> = [
  {
    isPaid: false,
    label: "Non Payée",
    color: "red",
  },
  {
    isPaid: true,
    label: "Payée",
    color: "green",
  },
];

export default RacePayStatus;
