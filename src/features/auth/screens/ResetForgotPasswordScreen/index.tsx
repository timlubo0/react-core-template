import { Paper, Container } from "@mantine/core";
import { Alert, Title } from "src/components/base";
import classes from "../LoginScreen/Authentication.module.css";
import { useResetPassword } from "../../hooks/auth";
import { toast } from "src/utils/toast";
import { IPasswordReset } from "../../types";
import ResetForgotPasswordForm from "../../components/forms/ResetForgotPasswordForm";
import { IconInfoCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Routes } from "src/navigation/routes";

function ResetForgotPasswordScreen() {
  const navigate = useNavigate();

  const mutation = useResetPassword({
    onSuccess: (response) => {
      if (response.status === true) {
        toast.success("Modification du mot de passe faite avec succès!");
        navigate(Routes.login);
        return false;
      }
      toast.error("Verifiez votre code OTP svp!");
    },
    onError: () => {
      toast.error();
    },
  });

  const handleSubmit = (payload: IPasswordReset) => {
    mutation.mutate({ ...payload, ...{ oldPassword: `tK78Yt${payload.otp}` } });
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Réinialisation du mot de passe!
      </Title>
      <Alert
        variant="light"
        color="blue"
        title="Code OTP"
        icon={<IconInfoCircle />}
      >
        Verifiez votre boite email, un code de validation a été envoyer!
      </Alert>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <ResetForgotPasswordForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
        />
      </Paper>
    </Container>
  );
}

export default ResetForgotPasswordScreen;
