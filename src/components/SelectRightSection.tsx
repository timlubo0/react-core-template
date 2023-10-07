import { ActionIcon, Loader } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";

interface Props{
    onClick: () => void;
    isLoading: boolean;
}

const SelectRightSection = ({ onClick, isLoading }: Props) => {
    return(
        <ActionIcon onClick={onClick}>
            {!isLoading && (
            <IconCirclePlus size={"1.45rem"} />
            )}
            {isLoading && <Loader size={"xs"} />}
        </ActionIcon>
    )
}

export default SelectRightSection;