import { useMemo } from "react";
import { IconAlertCircle, IconCirclePlus } from "@tabler/icons-react";
import InputSearch from "../InputSearch";
import CrudActionButtons, { CrudActionProps } from "../CrudActionButtons";
import { useLocation } from "react-router-dom";
import { useFeaturePermissions } from "../../features/accessControl/hooks/permissions";
import { Button, Group, Flex, Stack, Alert, Text } from "../base";

interface Props {
  buttonTitle: string;
  onButtonClick: () => void;
  actions?: CrudActionProps[];
  showActions?: boolean;
  onSearch?: (keyword: string) => void;
  canCreate?: boolean;
}

function CrudHeader({
  onButtonClick,
  buttonTitle,
  actions,
  showActions = false,
  onSearch,
  canCreate,
}: Props) {
  const location = useLocation();
  const permissionsChecker = useFeaturePermissions();

  const permission = useMemo(() => {
    return permissionsChecker(location.pathname);
  }, [location.pathname]);

  canCreate = canCreate !== undefined ? canCreate : permission?.canCreate;

  return (
    <Stack>
      <Flex justify={"space-between"}>
        <Flex>
          <InputSearch onChange={onSearch} />
        </Flex>
        {canCreate ? (
          <Button
            onClick={onButtonClick}
            leftSection={<IconCirclePlus size="1rem" />}
            size="xs"
          >
            {buttonTitle}
          </Button>
        ) : (
          <></>
        )}
      </Flex>
      {showActions && canCreate ? (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Bummer!"
          color="blue"
        >
          <Group>
            <Text>
              Something terrible happened! You made a mistake and there is no
              going back, your data was lost forever!
            </Text>
            <CrudActionButtons actions={actions} />
          </Group>
        </Alert>
      ) : (
        <></>
      )}
    </Stack>
  );
}

export default CrudHeader;
