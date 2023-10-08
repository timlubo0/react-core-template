import { rem, useMantineTheme } from "@mantine/core";
import {
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
} from "src/components/base";
import { Link } from "react-router-dom";
import { useFeaturePermissions } from "src/features/accessControl/hooks/permissions";
import { IMenu } from "src/navigation/menu";

interface Props {
  menu: IMenu[];
}

const DropDownLinkItems = ({ menu }: Props) => {
  const permissionsChecker = useFeaturePermissions();
  const theme = useMantineTheme();

  return (
    <>
      {menu.map((item) => (
        <div key={item.title}>
          {permissionsChecker(item.href)?.canRead && (
            <Link to={item.href}>
              <UnstyledButton>
                <Group align="flex-start">
                  <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={rem(22)} color={theme.primaryColor} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" fw={500}>
                      {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {item.description}
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default DropDownLinkItems;
