import React from "react";
import { Center, Group, Paper } from "@mantine/core";
import Login from "../components/Login";
import { loginStyles } from "../styles/loginStyles";
import ThemeModeSwitcher from "../../../components/ThemeModeSwitcher";
import Logo from "../../../components/Logo";

function LoginScreen(){

    const { classes } = loginStyles();

    return(
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Group position="center">
                    <ThemeModeSwitcher />
                </Group>
                <Center>
                    <Logo size={90} />
                </Center>
                <Login />
            </Paper>
        </div>
    )

}

export default LoginScreen;