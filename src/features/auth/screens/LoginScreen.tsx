import { Center, Group, Paper } from "../../../components/base";
import Login from "../components/Login";
import ThemeModeSwitcher from "../../../components/ThemeModeSwitcher";
import Logo from "../../../components/Logo";

function LoginScreen() {
  return (
    <div>
      <Paper radius={0} p={30}>
        <Group align="center">
          <ThemeModeSwitcher />
        </Group>
        <Center>
          <Logo size={90} />
        </Center>
        <Login />
      </Paper>
    </div>
  );
}

export default LoginScreen;
