import { Paper, Container } from "@mantine/core";
import { Title } from "src/components/base";
import classes from "./Authentication.module.css";
import Login from "../../components/Login";

function LoginScreen() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Login />
      </Paper>
    </Container>
  );
}

export default LoginScreen;
