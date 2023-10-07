import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Button, Box, Group, Textarea, NumberInput, Select } from '@mantine/core';
import { IFuelPrice } from '../../types';
import { useCities } from '../../../cities/hooks/cities';
import SelectRightSection from '../../../../components/SelectRightSection';
import { useSelectMemo } from '../../../../hooks/useSelectMemo';

interface Props{
  onSubmit: (data: IFuelPrice) => void;
  isLoading: boolean;
  fuelPrice?: IFuelPrice;
}

function FuelPriceForm({ onSubmit, isLoading, fuelPrice }: Props) {

  const schema = z.object({
    cityId: z.number().min(1, { message: "Champ obligatoire" }),
    price: z.number().min(0, { message: "Champ obligatoire" }),
    notes: z.string().max(255, { message: "Maximum 255 caracteres" }).optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      cityId: fuelPrice?.cityId || null,
      price: fuelPrice?.price || 0,
      notes: fuelPrice?.notes || ''
    },
  });

  const citiesQuery = useCities({ per_page: 100 });
  const cities = useSelectMemo({ data: citiesQuery.data });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Select
          label="Ville"
          placeholder="Choisir une option"
          searchable
          nothingFound="No options"
          data={cities}
          dropdownPosition="bottom"
          maxDropdownHeight={280}
          rightSection={<SelectRightSection onClick={() => {}} isLoading={false} />}
          {...form.getInputProps("cityId")}
        />
        <NumberInput
          withAsterisk
          label="Prix en CDF par Litre"
          placeholder="Prix..."
          precision={3}
          step={0.5}
          {...form.getInputProps("price")}
        />
        <Textarea
          withAsterisk
          label="Notes"
          placeholder="notes..."
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

export default FuelPriceForm;