import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  PasswordInput,
  TextInput,
  Button,
  Box,
} from "../../../../components/base";
import { IconLock, IconMail, IconPassword } from "@tabler/icons-react";
import InputPasswordWrapper from "../../../../components/InputPasswordWrapper";
import { IPasswordReset } from "../../types";

interface Props {
  onSubmit: (data: IPasswordReset) => void;
  isLoading: boolean;
}

function ResetForgotPasswordForm({ onSubmit, isLoading }: Props) {
  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    passwordConfirm: z.string().min(8, { message: "Minimum 8 caracteres" }),
    otp: z
      .string()
      .max(5, { message: "maximum 5 chiffres" })
      .min(5, { message: "minimum 5 chiffres" }),
    password: z
      .string()
      .min(8, "Includes at least 8 characters")
      .refine((value) => /[0-9]/.test(value), "Includes number")
      .refine((value) => /[a-z]/.test(value), "Includes lowercase letter")
      .refine((value) => /[A-Z]/.test(value), "Includes uppercase letter")
      .refine(
        (value) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(value),
        "Includes special symbol"
      ),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
      otp: "",
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
        <InputPasswordWrapper value={form.values.password}>
          <PasswordInput
            placeholder="Mot de passe"
            label="Nouveau Mot de passe"
            withAsterisk
            {...form.getInputProps("password")}
            leftSection={<IconLock size={"1rem"} />}
          />
        </InputPasswordWrapper>
        <PasswordInput
          placeholder="Mot de passe"
          label="Confirmer le mot de passe"
          withAsterisk
          {...form.getInputProps("passwordConfirm")}
          leftSection={<IconLock size={"1rem"} />}
        />
        <TextInput
          withAsterisk
          label="Code OTP"
          placeholder="OTP"
          {...form.getInputProps("otp")}
          leftSection={<IconPassword size={"1rem"} />}
        />
        <Button fullWidth mt="xl" size="sm" type="submit" loading={isLoading}>
          Valider
        </Button>
      </form>
    </Box>
  );
}

export default ResetForgotPasswordForm;
