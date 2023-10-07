import {
  Box,
  Text,
  Badge,
  Divider,
  Flex,
  Stack,
  Group,
  Card,
  Anchor,
} from "@mantine/core";
import { IRace } from "../types";
import Moment from 'react-moment';

interface Props {
  race: IRace;
  isSelected?: boolean;
  onSelect?: (race: IRace) => void;
}

function Race({ race, isSelected = false, onSelect }: Props) {
  return (
   <Box style={{ cursor: 'pointer' }} onClick={() => onSelect?.(race)}>
     <Card w={400} bg={"white"} p={0} m={0} radius={"md"}>
      <Flex>
        {isSelected && (
          <Divider orientation="vertical" size={"md"} my={15} color="blue" />
        )}
        <Stack p={"md"}>
          <Flex justify={"space-between"}>
            <Stack spacing={0}>
              <Text fw={"bold"}>Course No : {race?.number}</Text>
              <Text size={"xs"} color="gray">
                {race?.racePrice?.autoMobileType?.name}
              </Text>
            </Stack>
            <Badge tt={"capitalize"}>{race?.statusName}</Badge>
          </Flex>

          <Group>
            <Group>
              <Stack>
                <Text size={"xs"} color="gray">                  
                  <Moment format="DD/MM/YY HH:MM">
                    {race?.createdAt} 
                  </Moment>
                </Text>
                <Text size={"xs"} color="gray">
                <Moment format="DD/MM/YY HH:MM">
                    {race?.updatedAt} 
                  </Moment>
                </Text>
              </Stack>
              <Divider orientation="vertical" />
            </Group>
            <Stack w={250}>
              <Text size={"xs"} fw={"bold"} truncate>
                {race.arrivalAddress}
              </Text>
              <Text size={"xs"} fw={"bold"} truncate>
                {race.departureAddress}
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Flex>
    </Card>
   </Box>
  );
}

export default Race;
