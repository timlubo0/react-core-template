import { useParams } from "react-router-dom";
import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, rem, } from '@mantine/core';
import { IconCreditCard, IconBuildingBank, IconRepeat, IconReceiptRefund, IconReceipt, IconReceiptTax, IconReport, IconCashBanknote, IconCoin, } from '@tabler/icons-react';
import { IDriver } from '../types';
import { useDriver } from "../hooks/drivers";
  
interface Props{
  driver?: IDriver;
}

  export function DriverDocs({ driver }: Props) {

    const { classes, theme } = useStyles();
    const { uid } = useParams();
    const userQuery = useDriver(`${uid}`);
    console.log(driver)

    let { data, isLoading } = userQuery;

    data = driver ? driver : data;

    const mockdata = [
      { title: `Licence : ${driver?.driver_license_number}`, icon: IconCreditCard, color: 'violet' },
      
      { title: `Contrat lido : ${driver?.contract_file}`, icon: IconReceipt, color: 'teal' },
      
      { title: `Carte d'identité : ${driver?.identity_card_number}`, icon: IconCashBanknote, color: 'orange' },
    ];
    
  
    const items = mockdata.map((item) => (
      <UnstyledButton key={item.title} className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    ));
  
    return (
      <Card withBorder radius="md" className={classes.card}>
        <Group position="apart">
          <Text className={classes.title}>Listes de documents de {driver?.name}</Text>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    );
  }

  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 700,
    },
  
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: theme.radius.md,
      height: rem(90),
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 150ms ease, transform 100ms ease',
  
      '&:hover': {
        boxShadow: theme.shadows.md,
        transform: 'scale(1.05)',
      },
    },
  }));