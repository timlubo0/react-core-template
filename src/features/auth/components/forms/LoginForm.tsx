import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  PasswordInput,
  TextInput,
  Button,
  Box,
  Group,
  Checkbox,
  Flex,
} from "../../../../components/base";
import { IconLock, IconMail } from "@tabler/icons-react";
import { ILogin } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  onSubmit: (data: ILogin) => void;
  isLoading: boolean;
}

function LoginForm({ onSubmit, isLoading }: Props) {
  const schema = z.object({
    username: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Invalid password" }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("username")}
          leftSection={<IconMail size={"1rem"} />}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          withAsterisk
          {...form.getInputProps("password")}
          leftSection={<IconLock size={"1rem"} />}
        />
        <Flex justify={"space-between"}>
          <Checkbox label="Remember me" mt="xl" size="xs" />
          <Link to={""}>Forgot your password?</Link>
        </Flex>
        <Group mt="xl">
          <Button fullWidth mt="xl" size="md" type="submit" loading={isLoading}>
            Login
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default LoginForm;
