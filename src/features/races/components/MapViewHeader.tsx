import { useEffect } from "react";
import { Box, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { IconGlassFull, IconLocation } from "@tabler/icons-react";
import { IRace } from "../types";

interface Props {
  race: IRace;
}

function MapViewHeader({ race }: Props) {
  
  return (
    <Card
      pos="absolute"
      bg={"white"}
      mx={'auto'}
      px={15}
      py={10}
      style={{ zIndex: 1000 }}
    >
      <Flex gap={25}>
        <Stack spacing={0}>
          <Flex align={"center"}>
            <IconLocation size={"1rem"} color="blue" />
            <Text fw={"bold"} size={'xs'}>Position actuelle</Text>
          </Flex>
          <Text size={"xs"} color="gray">
            description
          </Text>
        </Stack>
        <Stack spacing={0}>
          <Flex align={"center"}>
            <IconLocation size={"1rem"} color="blue" />
            <Text fw={"bold"} size={'xs'}>Distance</Text>
          </Flex>
          <Text size={"xs"} color="gray">
            {race.distance}
          </Text>
        </Stack>
        <Stack spacing={0}>
          <Flex align={"center"}>
            <IconLocation size={"1rem"} color="blue" />
            <Text fw={"bold"} size={'xs'}>Duree estimee</Text>
          </Flex>
          <Text size={"xs"} color="gray">
            {race.estimatedDuration}
          </Text>
        </Stack>
        <Stack spacing={0}>
          <Flex align={"center"}>
            <IconLocation size={"1rem"} color="blue" />
            <Text fw={"bold"} size={'xs'}>Position actuelle</Text>
          </Flex>
          <Text size={"xs"} color="gray">
            description
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}


export default MapViewHeader;
