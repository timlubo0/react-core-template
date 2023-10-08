import { Menu } from '@mantine/core';
import { IconChevronDown } from "@tabler/icons-react";
import { Button } from './base';

export interface CrudActionsProps{
    actions?: Array<CrudActionProps>;
}

export interface CrudActionProps{
    title: string;
    icon: (props: any) => JSX.Element;
    color: string;
    onClick: () => void;
}

function CrudActionButtons({ actions }: CrudActionsProps) {
    return (
        <Menu
            transitionProps={{ transition: "pop-top-right" }}
            position="bottom-end"
            width={220}
            withinPortal
        >
        <Menu.Target>
            <Button
                rightSection={<IconChevronDown size="1.05rem" stroke={1.5} />}
                size='xs'
            >
                Choisissez une action
            </Button>
        </Menu.Target>
        <Menu.Dropdown>
            {actions?.map((action) => (
            <Menu.Item
                key={action.title}
                rightSection={
                    <action.icon
                        size="1rem"
                        color={action.color}
                        stroke={1.5}
                    />
                }
                onClick={action.onClick}
            >
                {action.title}
            </Menu.Item>
            ))}
        </Menu.Dropdown>
        </Menu>
    );
}

export  default CrudActionButtons;