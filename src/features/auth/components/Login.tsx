import React from "react";
import { Title, Text, Box } from "@mantine/core";
import LoginForm from "./forms/LoginForm";
import { ILogin } from "../types";
import { useLogin } from "../hooks/auth";
import { toast } from "../../../utils/toast";
import { loginStyles } from "../styles/loginStyles";
import  secureLocalStorage  from  "react-secure-storage";
import { decryptData } from "../../../utils/crypto";

function Login(){

    const login = useLogin({
        onSuccess: (response) => {
            console.log("response", response)
            const decryptedData = decryptData(`${response}`);
            if (decryptedData?.access_token) {

                sessionStorage.setItem(`${process.env.REACT_APP_ACCESS_TOKEN_NAME}`, decryptedData.access_token);
                secureLocalStorage.setItem(`${process.env.REACT_APP_SESSION_USER}`, decryptedData.user);

                toast.show({
                    title: "Authentification",
                    message: "Authentification reussie",
                });

                setTimeout(() => window.location.href = '/home', 1000);

                return null;
            }

            toast.show({
                title: "Invalid Credentials",
                message: "Les informations d'identification sont invalides",
                color: 'red'
            });
        },
        onError: (error) => {
            console.log("error", error);
        },
    });

    const handleSubmit = (data: ILogin) => {
        login.mutate({ ...data, ...{ email: data.username } });
    }

    const { classes } = loginStyles();

    return (
      <Box>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={20}>
            Bienvenue sur Lido Taxi!
        </Title>
        <Text size={'xs'} ta={'center'} mb={30}>
            Veuillez vous connecter à votre compte et commencer l'aventure.
        </Text>
        <LoginForm onSubmit={handleSubmit} isLoading={login.isLoading} />
      </Box>
    );

}

export default Login;