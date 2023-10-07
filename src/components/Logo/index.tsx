import { useMantineTheme } from "@mantine/core";

interface Props{
    size?: number;
    mode?: 'light' | 'dark'
}

const Logo = ({ size = 70, mode }: Props) => {
    const theme = useMantineTheme();
    const colorScheme = mode ? mode : theme.colorScheme;
    return(
        <img
            src={colorScheme === 'light' ? "/icon.png" : "/icon-white.png"}
            alt="Logo Seguce"
            width={size}
        />
    )
}

export default Logo;