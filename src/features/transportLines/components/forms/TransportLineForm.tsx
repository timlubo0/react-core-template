import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Button, Box, Group, Textarea, NumberInput, Select, ActionIcon, TextInput } from '@mantine/core';
import { ITransportLine } from '../../types';
import { useCities } from '../../../cities/hooks/cities';
import SelectRightSection from '../../../../components/SelectRightSection';
import { useSelectMemo } from '../../../../hooks/useSelectMemo';
import { useAutomobileTypes } from '../../../automobileTypes/hooks/automobileTypes';
import { useStops } from '../../../stops/hooks/stops';

interface Props{
  onSubmit: (data: ITransportLine) => void;
  isLoading: boolean;
  transportLine?: ITransportLine;
}

function TransportLineForm({ onSubmit, isLoading, transportLine }: Props) {

  const schema = z.object({
    cityId: z.number().min(1, { message: "Champ obligatoire" }),
    autoMobileTypeId: z.number().min(1, { message: "Champ obligatoire" }),
    departureStopId: z.number().min(1, { message: "Champ obligatoire" }),
    arrivalStopId: z.number().min(1, { message: "Champ obligatoire" }),
    price: z.number().min(0, { message: "Champ obligatoire" }),
    notes: z.string().max(255, { message: "Maximum 255 caracteres" }).optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      cityId: transportLine?.cityId || 1,
      autoMobileTypeId: transportLine?.autoMobileTypeId || null,
      departureStopId: transportLine?.departureStopId || null,
      arrivalStopId: transportLine?.arrivalStopId || null,
      price: transportLine?.price || 0,
      notes: transportLine?.notes || '',
    },
  });

  const citiesQuery = useCities({ per_page: 100 });
  const automobileTypesQuery = useAutomobileTypes({ per_page: 100 });
  const stopsQuery = useStops({
    per_page: 500,
    key: "city_id",
    value: form.values.cityId,
  });

  const cities = useSelectMemo({ data: citiesQuery.data });
  const automobileTypes = useSelectMemo({ data: automobileTypesQuery.data });
  const stops = useSelectMemo({ data: stopsQuery.data });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Select
          withAsterisk
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
        <Select
          withAsterisk
          {...form.getInputProps("autoMobileTypeId")}
          label="Type de vehicule"
          placeholder="Choisir une option"
          searchable
          nothingFound="No options"
          data={automobileTypes}
          dropdownPosition="bottom"
          maxDropdownHeight={280}
          rightSection={<SelectRightSection onClick={() => {}} isLoading={false} />}
        />
        <Group grow>
          <Select
            withAsterisk
            {...form.getInputProps("departureStopId")}
            label="Arret de depart"
            placeholder="Choisir une option"
            searchable
            nothingFound="No options"
            data={stops}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={<SelectRightSection onClick={() => {}} isLoading={false} />}
          />
          <Select
            withAsterisk
            {...form.getInputProps("arrivalStopId")}
            label="Arret de destination"
            placeholder="Choisir une option"
            searchable
            nothingFound="No options"
            data={stops}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={<SelectRightSection onClick={() => {}} isLoading={false} />}
          />
        </Group>
        <NumberInput
          withAsterisk
          label="Prix en CDF"
          placeholder="Prix..."
          {...form.getInputProps("price")}
        />
        <Textarea
          label="Notes"
          placeholder="Notes..."
          {...form.getInputProps("notes")}
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

export default TransportLineForm;