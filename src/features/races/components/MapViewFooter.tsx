import {
  Box,
  Flex,
  Tabs,
  Card,
  Text,
  Stack,
  Avatar,
  Group,
  Button,
  Badge,
} from "@mantine/core";
import { IconMessage, IconPhoneCall } from "@tabler/icons-react";
import { IRace } from "../types";

interface Props{
  race: IRace;
}

function MapViewFooter({race}: Props) {
  
  return (
    <>
      <Card
        pos="absolute"
        bg={"white"}
        bottom={20}
        px={5}
        py={10}
        style={{ zIndex: 1000 }}
        w={600}
      >
        <Tabs defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first">Detaille Course</Tabs.Tab>
            <Tabs.Tab value="second">Detaille Chauffeur</Tabs.Tab>
            <Tabs.Tab value="third">Client</Tabs.Tab>
            <Tabs.Tab value="fourth">Vehicule</Tabs.Tab>
          </Tabs.List>
          <Box px={10}>
            <Tabs.Panel value="first">
                <Group grow>
                    <Flex justify={"space-between"}>
                    <Flex p={15}>
                        <Avatar radius={"xl"} src={"TIM LUBO"} size={"lg"} />
                        <Stack spacing={0}>
                        <Text fw={"bold"} size={"md"}>
                            {race?.user?.name}
                        </Text>
                        <Text color="gray" size={"xs"}>
                            Client
                        </Text>
                        </Stack>
                    </Flex>
                    <Flex p={30} gap={5}>
                        <Stack>
                            <Badge color="blue">
                                {race.statusName}
                            </Badge>
                        </Stack>
                    </Flex>
                    </Flex>
                </Group>
                <Group grow>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        ID Course
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        {race?.number}
                    </Text>
                    </Stack>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Type de Vehicule
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        {race?.racePrice?.autoMobileType?.name}
                    </Text>
                    </Stack>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Prix
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        {race?.price} CDF
                    </Text>
                    </Stack>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Type de course
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        {race?.racePrice?.raceType?.name}
                    </Text>
                    </Stack>
                </Group>
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <Group grow>
                <Flex justify={"space-between"}>
                  <Flex p={15}>
                    <Avatar radius={"xl"} src={"TIM LUBO"} size={"lg"} />
                    <Stack spacing={0}>
                      <Text fw={"bold"} size={"md"}>
                        {race.driver?.name}
                      </Text>
                      <Text color="gray" size={"xs"}>
                        Chauffeur
                      </Text>
                    </Stack>
                  </Flex>
                  <Flex p={15} gap={5}>
                    <Stack>
                      <Button
                        size="xs"
                        radius={"md"}
                        color="blue"
                        leftIcon={<IconPhoneCall size={"1rem"} />}
                      >
                        Appeler
                      </Button>
                    </Stack>
                    <Stack>
                      <Button
                        radius={"md"}
                        size="xs"
                        variant="outline"
                        leftIcon={<IconMessage size={"1rem"} />}
                      >
                        Chater
                      </Button>
                    </Stack>
                  </Flex>
                </Flex>
              </Group>
              <Group grow>
                <Stack spacing={0}>
                  <Text fw={"bold"} size={"xs"} color="gray">
                    {" "}
                    Experience
                  </Text>
                  <Text size={"xs"} fw={"bold"}>
                    {" "}
                    12 ans
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fw={"bold"} size={"xs"} color="gray">
                    {" "}
                    Licence
                  </Text>
                  <Text size={"xs"} fw={"bold"}>
                    {" "}
                    {race.driver.driverLicenseNumber}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fw={"bold"} size={"xs"} color="gray">
                    {" "}
                    ID number
                  </Text>
                  <Text size={"xs"} fw={"bold"}>
                    {" "}
                    {race.driver.identityCardNumber}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fw={"bold"} size={"xs"} color="gray">
                    {" "}
                    Assurance
                  </Text>
                  <Text size={"xs"} fw={"bold"}>
                    {" "}
                    
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fw={"bold"} size={"xs"} color="gray">
                    {" "}
                    License Class
                  </Text>
                  <Text size={"xs"} fw={"bold"}>
                    {" "}
                    
                  </Text>
                </Stack>
              </Group>
            </Tabs.Panel>
            <Tabs.Panel value="third">
                <Group grow>
                    <Flex justify={"space-between"}>
                    <Flex p={15}>
                        <Avatar radius={"xl"} src={"TIM LUBO"} size={"lg"} />
                        <Stack spacing={0}>
                        <Text fw={"bold"} size={"md"}>
                            {race.user.name}
                        </Text>
                        <Text color="gray" size={"xs"}>
                            Client
                        </Text>
                        </Stack>
                    </Flex>
                    <Flex p={15} gap={5}>
                        <Stack>
                        <Button
                            size="xs"
                            radius={"md"}
                            color="blue"
                            leftIcon={<IconPhoneCall size={"1rem"} />}
                        >
                            Appeler
                        </Button>
                        </Stack>
                        <Stack>
                        <Button
                            radius={"md"}
                            size="xs"
                            variant="outline"
                            leftIcon={<IconMessage size={"1rem"} />}
                        >
                            Chater
                        </Button>
                        </Stack>
                    </Flex>
                    </Flex>
                </Group>
                <Group grow>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Telephone 
                    </Text>
                    <Text size={"xs"} fw={"bold"} >
                        {" "}
                        +{race.user.phone}
                    </Text>
                    </Stack>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Email
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        {race.user.email}
                    </Text>
                    </Stack>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Ville
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        
                    </Text>
                    </Stack>
                </Group>
            </Tabs.Panel>
            <Tabs.Panel value="fourth">
            <Group grow>
                <Flex justify={"space-between"}>
                    <Flex p={15}>
                    <img src={`${process.env.REACT_APP_FILES_URL}/${race.racePrice?.autoMobileType?.cover}`} 
                        alt={`${race?.racePrice?.autoMobileType?.name}`} 
                        height={'70'}/>
                        <Stack spacing={0}>
                        <Text fw={"bold"} size={"md"}>
                        {race?.racePrice?.autoMobileType?.name}
                        </Text>
                        <Text color="gray" size={"xs"}>
                        {race?.racePrice?.autoMobileType?.description}
                        </Text>
                        </Stack>
                    </Flex>
                    </Flex>
                </Group>
                <Group grow>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Immatriculation
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        {''}
                    </Text>
                    </Stack>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Moteur
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        Essence
                    </Text>
                    </Stack>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Places
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        5 places
                    </Text>
                    </Stack>
                    <Stack spacing={0}>
                    <Text fw={"bold"} size={"xs"} color="gray">
                        {" "}
                        Chassis
                    </Text>
                    <Text size={"xs"} fw={"bold"}>
                        {" "}
                        5534265182
                    </Text>
                    </Stack>
                </Group>
            </Tabs.Panel>
          </Box>
        </Tabs>
      </Card>
    </>
  );
}
export default MapViewFooter;
