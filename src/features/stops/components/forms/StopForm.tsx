import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Button, Box, Group, Textarea, NumberInput, Select, ActionIcon, TextInput } from '@mantine/core';
import { IStop } from '../../types';
import { useCities } from '../../../cities/hooks/cities';
import SelectRightSection from '../../../../components/SelectRightSection';
import { useSelectMemo } from '../../../../hooks/useSelectMemo';

interface Props{
  onSubmit: (data: IStop) => void;
  isLoading: boolean;
  stop?: IStop;
}

function StopForm({ onSubmit, isLoading, stop }: Props) {

  const schema = z.object({
    cityId: z.number().min(1, { message: "Champ obligatoire" }),
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    description: z.string().max(255, { message: "Maximum 255 caracteres" }).optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      cityId: stop?.cityId || null,
      name: stop?.name || '',
      latitude: stop?.latitude || '',
      longitude: stop?.longitude || '',
      description: stop?.description || '',
    },
  });

  const citiesQuery = useCities({ per_page: 100 });
  const cities = useSelectMemo({ data: citiesQuery.data });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Select
          {...form.getInputProps("cityId")}
          label="Ville"
          placeholder="Choisir une option"
          searchable
          nothingFound="No options"
          data={cities}
          dropdownPosition="bottom"
          maxDropdownHeight={280}
          rightSection={<SelectRightSection onClick={() => {}} isLoading={false} />}
        />
        <TextInput
          withAsterisk
          label="Designation"
          placeholder="Designation..."
          {...form.getInputProps("name")}
        />
        <Group grow>
          <NumberInput
            withAsterisk
            label="Latitude"
            placeholder="latitude..."
            {...form.getInputProps("latitude")}
          />
          <NumberInput
            withAsterisk
            label="Longitude"
            placeholder="longitude..."
            {...form.getInputProps("longitude")}
          />
        </Group>
        <Textarea
          withAsterisk
          label="Description"
          placeholder="description..."
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

export default StopForm;