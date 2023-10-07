import { UnstyledButton, Group, ThemeIcon, rem, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useFeaturePermissions } from "../../../features/accessControl/hooks/permissions";
import { IMenu } from "../../../navigation/menu";
import { headerStyles } from "../styles/headerStyles";

interface Props{
    menu: IMenu[];
}

const DropDownLinkItems = ({ menu }: Props) => {
    const permissionsChecker = useFeaturePermissions();
    const { classes, theme } = headerStyles();

    return(
        <>
            {
                menu.map((item) => (
                    <div key={item.title}>
                    {permissionsChecker(item.href)?.canRead && (
                        <Link to={item.href}>
                        <UnstyledButton className={classes.subLink}>
                            <Group noWrap align="flex-start">
                            <ThemeIcon size={34} variant="default" radius="md">
                                <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
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
                ))
            }
        </>
    )
}

export default DropDownLinkItems;