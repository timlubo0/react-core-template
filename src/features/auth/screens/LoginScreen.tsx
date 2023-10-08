import { Center, Group, Paper } from "../../../components/base";
import Login from "../components/Login";
import { loginStyles } from "../styles/loginStyles";
import ThemeModeSwitcher from "../../../components/ThemeModeSwitcher";
import Logo from "../../../components/Logo";

function LoginScreen() {
  const { classes } = loginStyles();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
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
