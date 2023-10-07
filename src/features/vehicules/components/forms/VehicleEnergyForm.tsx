import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group, Textarea } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { IVehicleEnergy } from '../../types';

interface Props{
  onSubmit: (data: IVehicleEnergy) => void;
  isLoading: boolean;
  vehicleEnergy?: IVehicleEnergy;
}

function VehicleEnergyForm({ onSubmit, isLoading, vehicleEnergy }: Props) {

  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    description: z.string().max(255, { message: "Maximum 255 caracteres" }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: vehicleEnergy?.name || '',
      description: vehicleEnergy?.description || ''
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
        <Textarea
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

export default VehicleEnergyForm;