import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Button, Box, Group, Textarea, NumberInput } from '@mantine/core';
import { IEarning } from '../../types';

interface Props{
  onSubmit: (data: IEarning) => void;
  isLoading: boolean;
  earning?: IEarning;
}

function EarningForm({ onSubmit, isLoading, earning }: Props) {

  const schema = z.object({
    minAmount: z.number().min(0, { message: "Champ obligatoire" }),
    maxAmount: z.number().min(0, { message: "Champ obligatoire" }),
    percentage: z.number().min(0, { message: "Champ obligatoire" }),
    taxiPercentage: z.number().min(0, { message: "Champ obligatoire" }),
    systemPercentage: z.number().min(0, { message: "Champ obligatoire" }),
    notes: z.string().max(255, { message: "Maximum 255 caracteres" }).optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      minAmount: earning?.minAmount || 0,
      maxAmount: earning?.maxAmount || 0,
      percentage: earning?.percentage || 0,
      taxiPercentage: earning?.taxiPercentage || 0,
      systemPercentage: earning?.systemPercentage || 0,
      notes: earning?.notes || '',
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <NumberInput
          withAsterisk
          label="Pourcentage"
          placeholder="Pourcentage..."
          precision={3}
          step={0.5}
          {...form.getInputProps("percentage")}
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

export default EarningForm;