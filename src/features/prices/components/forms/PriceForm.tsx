import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { IPrice } from '../../types';

interface Props{
  onSubmit: (data: IPrice) => void;
  isLoading: boolean;
  price?: IPrice;
}

function PriceForm({ onSubmit, isLoading, price }: Props) {

  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: price?.name || ''
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Designation"
          placeholder="Designation..."
          {...form.getInputProps("name")}
          icon={<IconUser size={"1rem"} />}
        />
   
        <Group mt="xl" position="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default PriceForm;