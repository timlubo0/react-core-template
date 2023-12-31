import { TextInput } from "./base";
import { IconSearch } from "@tabler/icons-react";

interface Props {
  onChange?: (keyword: string) => void;
}

export default function InputSearch({ onChange }: Props) {
  return (
    <TextInput
      leftSection={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="xs"
      placeholder="Rechercher..."
      rightSectionWidth={42}
      w={500}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
