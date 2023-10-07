import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group, Textarea } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { IVehicleUse } from '../../types';

interface Props{
  onSubmit: (data: IVehicleUse) => void;
  isLoading: boolean;
  vehicleUse?: IVehicleUse; 
}

function VehicleUseForm({ onSubmit, isLoading, vehicleUse }: Props) {
  
  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    description: z.string().max(255, { message: "Maximum 255 caracteres" }).optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: vehicleUse?.name || '',
      description: vehicleUse?.description || ''
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Nom"
          placeholder="Nom..."
          {...form.getInputProps("name")}
          icon={<IconUser size={"1rem"} />}
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
      </form>
    </Box>
  );
}

export default VehicleUseForm;