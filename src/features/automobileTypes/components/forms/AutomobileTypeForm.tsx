import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Group,
  Textarea,
  NumberInput,
  Text,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { IAutomobileType } from "../../types";
import ImageFileInput from "../../../../components/ImageFileInput";

interface Props {
  onSubmit: (data: IAutomobileType) => void;
  isLoading: boolean;
  automobileType?: IAutomobileType;
}

function AutomobileTypeForm({ onSubmit, isLoading, automobileType }: Props) {
  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    fuelConsumption: z.number().min(0, { message: "Champ obligatoire" }),
    numberOfSeats: z.number().min(1, { message: "Champ obligatoire" }),
    description: z
      .string()
      .max(255, { message: "Maximum 255 caracteres" })
      .optional(),
    cover: z.any(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: automobileType?.name || "",
      fuelConsumption: automobileType?.fuelConsumption || 0,
      numberOfSeats: automobileType?.numberOfSeats || 1,
      description: automobileType?.description || "",
      cover: automobileType?.cover || null,
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Group grow>
          <ImageFileInput
            onChange={(files) => form.setFieldValue("cover", files[0])}
          />
          {automobileType?.cover && (
            <SimpleGrid
              cols={4}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              mt={Image.length > 0 ? "sm" : 0}
            >
              {" "}
              <Text color="orange">Voici l'ancienne image</Text>
              <Image src={`${automobileType?.cover}`} w={5} h={5} />
            </SimpleGrid>
          )}
        </Group>

        <TextInput
          withAsterisk
          label="Designation"
          placeholder="Designation..."
          {...form.getInputProps("name")}
        />

        <Group grow>
          <NumberInput
            withAsterisk
            label="Consommation carburant"
            description="En Litres(Estimation) /Km"
            placeholder="Consommation carburant en Litres..."
            {...form.getInputProps("fuelConsumption")}
            precision={3}
            step={0.5}
          />
          <NumberInput
            withAsterisk
            label="Nombre des sieges"
            description="Estimation Minimum"
            placeholder="Nombre des sieges..."
            {...form.getInputProps("numberOfSeats")}
          />
        </Group>
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

export default AutomobileTypeForm;
