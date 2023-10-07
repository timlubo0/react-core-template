import { Breadcrumbs, Anchor, Text, Group, Flex } from '@mantine/core';
import { Routes } from '../../navigation/routes';
import { Link } from 'react-router-dom';
import { IconMoneybag } from '@tabler/icons-react';
import { useFuelPrice } from '../../features/fuelPrices/hooks/fuelPrices';

const items = [
  { title: 'Dashboard', href: Routes.home },
  { title: 'Mantine hooks', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index} style={{ textDecoration: 'none' }}>
    <Anchor>
      {item.title}
    </Anchor>
  </Link>
));

function AppBreadcrumbs() {
    
  return (
    <Flex
      maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
      miw={{ xl: 1200 }}
      mx={{ xl: 'auto' }}
      justify={'space-between'}
    >
      <Breadcrumbs>{items}</Breadcrumbs>
      {/* <Group>
        <IconMoneybag color='blue' />
        <Text color='blue' fw={'bold'}>0.00 CDF /Litre</Text>
      </Group> */}
    </Flex>
  );
}

export default AppBreadcrumbs;