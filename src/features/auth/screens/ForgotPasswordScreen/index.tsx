import { Paper, Container } from "@mantine/core";
import { Title } from "src/components/base";
import classes from "../LoginScreen/Authentication.module.css";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import { useOtp } from "../../hooks/auth";
import { toast } from "src/utils/toast";
import { useNavigate } from "react-router-dom";
import { Routes } from "src/navigation/routes";

function ForgotPasswordScreen() {
  const navigate = useNavigate();

  const mutation = useOtp({
    onSuccess: (response) => {
      if (response.status === true) {
        toast.success(
          "Verifiez votre boite email, un code de validation a été envoyer!"
        );
        navigate(Routes.passwordReset);
        return false;
      }
      toast.error("Verifiez votre email svp!");
    },
    onError: () => {
      toast.error();
    },
  });

  const handleSubmit = (payload: { email: string }) => {
    mutation.mutate(payload);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Mot de passe oublié!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <ForgotPasswordForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
        />
      </Paper>
    </Container>
  );
}

export default ForgotPasswordScreen;
