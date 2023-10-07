import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Button, Box, Group, Textarea, NumberInput, Select } from '@mantine/core';
import { IRacePrice } from '../../types';
import { useAutomobileTypes } from '../../../automobileTypes/hooks/automobileTypes';
import { useRaceTypes } from '../../hooks/raceTypes';
import { useCities } from '../../../cities/hooks/cities';
import SelectRightSection from '../../../../components/SelectRightSection';
import { useSelectMemo } from '../../../../hooks/useSelectMemo';
import RacePriceResume from '../RacePriceResume';
import { useFuelPrices } from '../../../fuelPrices/hooks/fuelPrices';
import { IAutomobileType } from '../../../automobileTypes/types';

interface Props{
  onSubmit: (data: IRacePrice) => void;
  isLoading: boolean;
  racePrice?: IRacePrice;
}

function RacePriceForm({ onSubmit, isLoading, racePrice }: Props) {

  const [pricePerKilometer, setPricePerKilometer] = useState<number>(0);
  const [checked, setChecked] = useState(false);
  const [numberOfSeats, setNumberOfSeats] = useState<number>(1);

  const schema = z.object({
    raceTypeId: z.number().min(1, { message: "Champ obligatoire" }),
    autoMobileTypeId: z.number().min(1, { message: "Champ obligatoire" }),
    cityId: z.number().min(1, { message: "Champ obligatoire" }),
    pricePerHour: z.number().min(0, { message: "Champ obligatoire" }),
    pricePerKilometer: z.number().min(0, { message: "Champ obligatoire" }),
    earnings: z.number().min(0, { message: "Champ obligatoire" }),
    notes: z.string().max(255, { message: "Maximum 255 caracteres" }).optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      raceTypeId: racePrice?.raceTypeId || 1,
      autoMobileTypeId: racePrice?.autoMobileTypeId || 1,
      cityId: racePrice?.cityId || 1,
      pricePerHour: racePrice?.pricePerHour || 0,
      pricePerKilometer: racePrice?.pricePerKilometer || pricePerKilometer,
      earnings: racePrice?.earnings || 0,
      notes: racePrice?.notes || '',
    },
  });

  const automobileTypesQuery = useAutomobileTypes({ per_page: 100 });
  const raceTypesQuery = useRaceTypes({ per_page: 100 });
  const citiesQuery = useCities({ per_page: 100 });
  const fuelPricesQuery = useFuelPrices({ key: 'city_id', value: form.values.cityId, per_page: 1 });

  const automobileTypes = useSelectMemo({ data: automobileTypesQuery.data });
  const raceTypes = useSelectMemo({ data: raceTypesQuery.data });
  const cities = useSelectMemo({ data: citiesQuery.data });

  const selectedAutomobileType = automobileTypesQuery.data.find(
    (automobileType: IAutomobileType) =>
      automobileType.id === form.values.autoMobileTypeId
  );

  useEffect(() => {
    const price =
      ((selectedAutomobileType?.fuelConsumption || 0) *
        (fuelPricesQuery.data[0]?.price || 0)) /
        numberOfSeats +
      form.values.earnings;

    setPricePerKilometer(price);
    form.setFieldValue("pricePerKilometer", price);
    setNumberOfSeats(selectedAutomobileType?.numberOfSeats || 1);
  }, [
    form.values.cityId,
    selectedAutomobileType?.id,
    selectedAutomobileType?.numberOfSeats,
    form.values.earnings,
    checked,
    numberOfSeats
  ]);


  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <RacePriceResume
          cityId={form.values.cityId}
          automobileType={selectedAutomobileType}
        />
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
          rightSection={
            <SelectRightSection onClick={() => {}} isLoading={false} />
          }
        />
        <Group grow>
          <Select
            withAsterisk
            {...form.getInputProps("raceTypeId")}
            label="Type de course"
            placeholder="Choisir une option"
            searchable
            nothingFound="No options"
            data={raceTypes}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={
              <SelectRightSection onClick={() => {}} isLoading={false} />
            }
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
            rightSection={
              <SelectRightSection onClick={() => {}} isLoading={false} />
            }
          />
        </Group>
        <Group grow>
          <NumberInput
            withAsterisk
            label="Prix par heure"
            description="Prix en CDF"
            placeholder="Prix par heure..."
            precision={3}
            step={0.5}
            {...form.getInputProps("pricePerHour")}
          />
          <NumberInput
            withAsterisk
            label="Gains"
            description="Valeur en CDF"
            placeholder="Gains..."
            precision={3}
            step={0.5}
            {...form.getInputProps("earnings")}
          />
          <NumberInput
            withAsterisk
            label="Prix par kilometre en CDF"
            description={'Le prix par siege'}
            placeholder="Prix par kilometre..."
            precision={3}
            step={0.5}
            {...form.getInputProps("pricePerKilometer")}
            disabled
          />
        </Group>
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

export default RacePriceForm;