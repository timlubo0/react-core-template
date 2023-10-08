import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Group,
  Select,
  ActionIcon,
  Loader,
} from "src/components/base";
import { IUSerPayMode } from "../../types";
import { IconCirclePlus } from "@tabler/icons-react";
import { useUsers } from "../../../auth/hooks/users";
import { usePayModes } from "../../hooks/payModes";
import { useSelectMemo } from "../../../../hooks/useSelectMemo";

interface Props {
  onSubmit: (data: IUSerPayMode) => void;
  isLoading: boolean;
  userPayMode?: IUSerPayMode;
}

function UserPayModeForm({ onSubmit, isLoading, userPayMode }: Props) {
  const schema = z.object({
    userId: z.string(),
    payModeId: z.string(),
    number: z
      .string()
      .min(9, { message: "Minimum 9 caracteres" })
      .max(12, { message: "Maximum 12 caracteres" }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      userId: userPayMode?.user?.id || "",
      payModeId: userPayMode?.pay_mode?.id || "",
      number: userPayMode?.number || "",
    },
  });

  const usersQuery = useUsers({ page: 1, per_page: 1000 });
  const payModesQuery = usePayModes();

  const users = useSelectMemo({
    key: "id",
    value: "name",
    data: usersQuery.data,
  });

  const payModes = useSelectMemo({
    key: "id",
    value: "name",
    data: payModesQuery.data,
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Group grow>
          <Select
            withAsterisk
            label="Utilisateur"
            placeholder="Choisissez une option"
            data={users}
            {...form.getInputProps("userId")}
            rightSection={
              <ActionIcon>
                {!usersQuery.isLoading && <IconCirclePlus size={"1.45rem"} />}
                {usersQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
          <Select
            withAsterisk
            label="Mode de paiement"
            placeholder="Choisissez une option"
            data={payModes}
            {...form.getInputProps("payModeId")}
            rightSection={
              <ActionIcon>
                {!payModesQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {payModesQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
        </Group>
        <TextInput
          withAsterisk
          label="Phone"
          placeholder="Phone..."
          {...form.getInputProps("number")}
        />
        <Group mt="xl" align="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default UserPayModeForm;
