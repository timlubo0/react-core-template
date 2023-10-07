import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

interface Props {
  size?: number;
  mode?: "light" | "dark";
}

const Logo = ({ size = 70, mode }: Props) => {
  const { colorScheme: mColorScheme } = useMantineColorScheme();
  const colorScheme = mode ? mode : mColorScheme;
  return (
    <img
      src={colorScheme === "light" ? "/icon.png" : "/icon-white.png"}
      alt="Logo Seguce"
      width={size}
    />
  );
};

export default Logo;
