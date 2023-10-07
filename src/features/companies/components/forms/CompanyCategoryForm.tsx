import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group } from '@mantine/core';
import { ICompanyCategory } from '../../types';

interface Props{
  onSubmit: (data: ICompanyCategory) => void;
  isLoading: boolean;
  category?: ICompanyCategory;
}

function CompanyCategoryForm({ onSubmit, isLoading, category }: Props) {

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Minimum 3 caracteres" })
      .max(45, "Maximum 45 caracteres"),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: category?.name || '',
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

export default CompanyCategoryForm;