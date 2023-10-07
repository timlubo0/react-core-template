import { Group, Paper, Stack, Box, Flex, Avatar, ActionIcon, Title, Text, Button, Tabs, Badge, Skeleton, Grid, Card, Center, createStyles, rem } from "@mantine/core";
import { IconDotsVertical, IconMail, IconLock, IconSettings, IconMoneybag, IconBell, IconFolder, IconUser, IconGasStation, IconGauge, IconManualGearbox, IconUsers, IconAddressBook, IconRoad } from '@tabler/icons-react';
import { useDisclosure } from "@mantine/hooks";
import UserPayModesScreen from "../../payModes/screens/UserPayModesScreen";
import { useParams } from "react-router-dom";
import { useDriver } from "../hooks/drivers";
import ResetPasswordFormModal from "../../auth/components/modals/ResetPasswordFormModal";
import { IDriver } from "../types";
import { features } from "process";
import { DriverDocs } from "../components/documents";

interface Props{
  user?: IDriver;
  Image? : any;
}

function DriverDetailsScreen({ user }: Props){

    const { uid } = useParams();
    const userQuery = useDriver(`${uid}`);
    let { data, isLoading } = userQuery;
    data = user ? user : data;
    
    const resetPasswordFormModal = useDisclosure();
 
    const { classes } = useStyles();
    const features = mockdata.map((feature) => (
      <Center key={feature.label}>
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="xs">{feature.label}</Text>
      </Center>
    ));


    return (
      <>
      <Flex direction="row" justify="center" align="center" >
        
        <Stack>
          <Paper  m={5} h={750} w={{ sm: 300 }}>
            <Flex direction={"column"}>
              <Box bg={"gray"} miw={"100%"} w={"100%"} h={100} />
              <Flex justify={"space-between"} mx={100}>
                <Skeleton circle visible={isLoading}>
                  <Avatar
                    color="blue"
                    radius="100%"
                    size={80}
                    mt={-40}
                    tt={"uppercase"}
                  >
                    {`${data?.name?.charAt(0)}${data?.name?.charAt(1)}`}
                  </Avatar>
                </Skeleton>
              </Flex>
              <Stack mx={20} pb={10}>
                <Skeleton w={300} radius="xl" visible={isLoading}>
                  <Title size={25}>{data?.name}</Title>
                </Skeleton>
                <Skeleton w={200} radius="xl" visible={isLoading}>
                  <Text size={"xs"}>Lubumbashi, DRC Congo</Text>
                </Skeleton>
                <Group>
                  <Text size={"xs"} fw={"bolder"}>
                    {data?.email}
                  </Text>
                  <Text size={"xs"}>.</Text>
                  <Text size={"xs"} fw={"bold"}>
                    {data?.name}
                  </Text>
                  <Text size={"xs"}>.</Text>
                  <Text size={"xs"} color="green">
                    Active
                  </Text>
                </Group>
                {user ? (
                  <Group>
                    <Button
                      size="xs"
                      variant="light"
                      leftIcon={<IconMail size={"1.10rem"} />}
                    >
                      Modifier l'email
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      leftIcon={<IconLock size={"1.10rem"} />}
                      onClick={() => resetPasswordFormModal[1].open()}
                    >
                      Modifier le mot de passe
                    </Button>
                  </Group>
                ) : (
                  <></>
                )}
              </Stack>
              <Flex direction={"column"} wrap={'unset'}>
              <Stack >
                <Tabs defaultValue="myInfo" mx={5}>
                  <Tabs.List>
                    <Tabs.Tab
                      value="myInfo"
                      icon={<IconUser size="0.8rem" />}
                    >
                      A Propos
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="messages"
                      icon={<IconAddressBook size="0.8rem" />}
                    >
                      Mes Adresses
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="myInfo" pt="xs">
                    <Text size={'xs'}>Nom complet : {data?.name}</Text>
                    <Text size={'xs'}>Role : {data?.name}</Text>
                    <Text size={'xs'}>Email : {data?.email}</Text>
                    <Text size={'xs'}>Telephone : {data?.phone}</Text>
                  </Tabs.Panel>

                  <Tabs.Panel value="messages" pt="xs">
                    Messages tab content
                  </Tabs.Panel>

                  <Tabs.Panel value="settings" pt="xs">
                    Settings tab content
                  </Tabs.Panel>
                </Tabs>
              </Stack>
            </Flex>
            </Flex>
          </Paper>
        </Stack>

        <Stack>
          <Box bg={'#F1F3F5'} m={5} h={750} w={{ sm: 500 }} >
            <Flex direction={"column"} wrap={'unset'}>
              <Stack mx={20} >
                <Tabs defaultValue="docs" mx={5}>
                  <Tabs.List>
                    <Tabs.Tab
                      value="docs"
                      icon={<IconFolder size="0.8rem" />
                    }
                    >
                      Documents {}
                    </Tabs.Tab>
                    <Tabs.Tab value="races" icon={<IconRoad size="0.8rem" />}>
                      Liste de courses
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="docs" pt="xs">
                    <DriverDocs driver={data}/>
                  </Tabs.Panel>

                  <Tabs.Panel value="races" pt="xs">
                    Settings tab content
                  </Tabs.Panel>
                </Tabs>
              </Stack>
            </Flex>
          </Box>
        </Stack>

        <Stack>
          <Paper m={5} h={750} w={{ sm: 300 }}>
            <Flex direction="column">
              <Card withBorder radius="md" className={classes.card}>
                <Card.Section className={classes.imageSection}>
                  <img src="https://carbikesonline.com/wp-content/uploads/2023/04/BzmPIGtsd1Pype58MR3hpbwh4SwiLnNNNSW3oc2dT-UyuRcWdbiD4XYa-removebg-preview.png" alt="Tesla Model S" height={100} />
                </Card.Section>

                <Group position="apart" mt="md">
                  <div>
                    <Text fw={500}>Toyota Raum</Text>
                    <Text fz="xs" c="dimmed">Free recharge at any station</Text>
                  </div>
                  <Badge variant="outline">25% off</Badge>
                </Group>

                <Card.Section className={classes.section} mt="md">
                  <Text fz="sm" c="dimmed" className={classes.label}>Basic configuration</Text>
                  <Group spacing={8} mb={-8}>
                    {features}
                  </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                  <Group spacing={30}>
                    <div>
                      <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>$168.00</Text>
                      <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>per day</Text>
                    </div>
                    <Button radius="xl" style={{ flex: 1 }}>Rent now</Button>
                  </Group>
                </Card.Section>
              </Card>
            </Flex>
          </Paper>
        </Stack>
      </Flex>
        
        <ResetPasswordFormModal
          opened={resetPasswordFormModal[0]}
          onClose={resetPasswordFormModal[1].close}
        />
      </>
    );
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];


export default DriverDetailsScreen;