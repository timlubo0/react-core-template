import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group, Textarea, Image, SimpleGrid , Text} from '@mantine/core';
import { IRaceType } from '../../types';
import ImageFileInput from '../../../../components/ImageFileInput';

interface Props{
  onSubmit: (data: IRaceType) => void;
  isLoading: boolean;
  raceType?: IRaceType;
}
 
function RaceTypeForm({ onSubmit, isLoading, raceType }: Props) {

  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    description: z.string().max(255, { message: "Maximum 255 caracteres" }).optional(),
    cover: z.any(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: raceType?.name || '',
      cover: raceType?.cover || null,
      description: raceType?.description || '',
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Group grow>
          <ImageFileInput            
              onChange={(files) => form.setFieldValue('cover', files[0])} 
            /> 
            { raceType?.cover && 
              <SimpleGrid
              cols={4}
              breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
              mt={Image.length > 0 ? 'sm' : 0}
          > <Text color='orange'>Voici l'ancienne image</Text>
              <Image 
                  src={`${raceType?.cover}`}
                  w={5}
                  h={5}      
              />
          </SimpleGrid>             
              
            }
        </Group>

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
      </form>
    </Box>
  );
}

export default RaceTypeForm;