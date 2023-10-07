import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group, Textarea } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { IRace } from '../../types';

interface Props{
  onSubmit: (data: IRace) => void;
  isLoading: boolean;
  race?: IRace;
}

function RaceForm({ onSubmit, isLoading, race }: Props) {

  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    description: z.string().max(255, { message: "Maximum 255 caracteres" }).optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
    },
  });

  return (
    <Box>
      {/* <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Designation"
          placeholder="Designation..."
          {...form.getInputProps("name")}
        />
        <Textarea
          withAsterisk
          label="Description"
          placeholder="Description..."
          {...form.getInputProps("description")}
        />
   
        <Group mt="xl" position="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form> */}
    </Box>
  );
}

export default RaceForm;