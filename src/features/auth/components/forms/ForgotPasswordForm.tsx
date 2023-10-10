import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Box, Group } from "../../../../components/base";
import { IconMail } from "@tabler/icons-react";

interface Props {
  onSubmit: (data: { email: string }) => void;
  isLoading: boolean;
}

function ForgotPasswordForm({ onSubmit, isLoading }: Props) {
  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
          leftSection={<IconMail size={"1rem"} />}
        />
        <Group mt="xl" align="right">
          <Button
            mt="xl"
            size="sm"
            type="submit"
            loading={isLoading}
          >
            Continuer
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default ForgotPasswordForm;
