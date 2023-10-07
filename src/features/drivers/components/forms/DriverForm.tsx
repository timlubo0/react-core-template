import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Group,
  Stack,
  Flex,
  Divider,
  Text,
  Radio,
  FileInput,
  rem,
  Select,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { IconCirclePlus, IconUpload, IconUser } from "@tabler/icons-react";
import { IDriver } from "../../types";
import ImageFileInput from "../../../../components/ImageFileInput";
import { useCities } from "../../../cities/hooks/cities";
import { useSelectMemo } from "../../../../hooks/useSelectMemo";
import { useCompanies } from "../../../companies/hooks/companies";
import { useDisclosure } from "@mantine/hooks";
import CompanyFormModal from "../../../companies/components/modals/CompanyFormModal";

interface Props {
  onSubmit: (data: IDriver) => void;
  isLoading: boolean;
  driver?: IDriver;
}

function DriverForm({ onSubmit, isLoading, driver }: Props) {
  const companyFormModal = useDisclosure();

  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    email: z.string().email().optional(),
    phone: z.string().max(12, { message: "maximum 12 caracteres" }),
    driverLicenseNumber: z.string().min(3, { message: "min 3 caracteres" }),
    identityCardNumber: z.string().min(3, { message: "min 3 caracteres" }),
    address: z.object({
      reference: z.string(),
      street: z.string(),
      cityId: z.number(),
    }),
    gender: z.string(),
    companyId: z.number().nullable().optional(),
    contractFile: z.any(),
    driverLicenseNumberFile: z.any(),
    identityCardNumberFile: z.any(),
    profile: z.any(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: driver?.name || "",
      phone: driver?.phone || "",
      email: driver?.email || "",
      driverLicenseNumber: driver?.driverLicenseNumber || "",
      identityCardNumber: driver?.identityCardNumber || "",
      contractFile: driver?.contractFile || null,
      identityCardNumberFile: driver?.identityCardNumberFile || undefined,
      driverLicenseNumberFile: driver?.driverLicenseNumberFile || undefined,
      gender: driver?.gender || "",
      companyId: driver?.company?.id || null,
      address: driver?.address || {
        reference: "",
        street: "",
        cityId: driver?.address?.cityId,
      },
    },
  });

  const citiesQuery = useCities({ per_page: 100 });
  const cities = useSelectMemo({ data: citiesQuery.data });
  const companiesQuery = useCompanies({ per_page: 100 });
  const companies = useSelectMemo({ data: companiesQuery.data });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Stack>
          <Group grow>
            <Divider />
            <Text>A Propos du chauffeur</Text>
            <Divider />
          </Group>
          <Flex gap={10}>
            <ImageFileInput
              onChange={(files) => form.setFieldValue("profile", files[0])}
            />

            <Stack w={"100%"}>
              <TextInput
                withAsterisk
                label="Nom Complet"
                placeholder="Nom complet..."
                {...form.getInputProps("name")}
              />
              <Radio.Group
                name="gender"
                {...form.getInputProps("gender")}
                label="Genre"
                withAsterisk
              >
                <Group mt="xs">
                  <Radio value="M" label="Masculin" />
                  <Radio value="F" label="Feminin" />
                </Group>
              </Radio.Group>
            </Stack>
          </Flex>
          <Group grow>
            <TextInput
              withAsterisk
              label="Telephone"
              placeholder="Telephone..."
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Email"
              placeholder="Email..."
              {...form.getInputProps("email")}
            />
          </Group>
          <Group grow>
            <TextInput
              withAsterisk
              label="Permis de conduire"
              placeholder="Numero du Permis de conduire..."
              {...form.getInputProps("driverLicenseNumber")}
            />
            <TextInput
              withAsterisk
              label="Carte d'identité"
              placeholder="Numero de la carte d'identité..."
              {...form.getInputProps("identityCardNumber")}
            />
          </Group>
          <Group grow>
            <FileInput
              {...form.getInputProps("driverLicenseNumberFile")}
              label="Permit de conduire (PDF)"
              placeholder="Importer le permis de conduire en pdf"
              icon={<IconUpload size={rem(14)} />}
              onChange={(file) =>
                form.setFieldValue("driverLicenseNumberFile", file)
              }
              //accept=''
            />
            <FileInput
              {...form.getInputProps("identityCardNumberFile")}
              label="Carte d'identité (PDF)"
              placeholder="Importer la carte d'identité en pdf"
              icon={<IconUpload size={rem(14)} />}
              onChange={(file) =>
                form.setFieldValue("identityCardNumberFile", file)
              }
              //accept=''
            />
          </Group>
          <FileInput
            {...form.getInputProps("contractFile")}
            label="Contrat Lido Taxi (PDF)"
            placeholder="Importer le contrat lido taxi en pdf"
            icon={<IconUpload size={rem(14)} />}
            onChange={(file) => form.setFieldValue("contractFile", file)}
            //accept=''
          />
          <Select
            {...form.getInputProps("companyId")}
            label="Entreprise"
            placeholder="Choisir une entreprise"
            searchable
            nothingFound="No options"
            data={companies}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={
              <ActionIcon onClick={() => companyFormModal[1].open()}>
                {!companiesQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {companiesQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
          <Group grow>
            <Divider />
            <Text>A Propos de l'adresse</Text>
            <Divider />
          </Group>
          <Group grow>
            <TextInput
              withAsterisk
              label="Reference"
              placeholder="reference..."
              {...form.getInputProps("address.reference")}
            />
            <TextInput
              withAsterisk
              label="Rue"
              placeholder="Rue..."
              {...form.getInputProps("address.street")}
            />
          </Group>
          <Select
            {...form.getInputProps("address.cityId")}
            withAsterisk
            label="Ville"
            placeholder="Choisir une ville"
            searchable
            nothingFound="No options"
            data={cities}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
          />
        </Stack>

        <Group mt="xl" position="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
      <CompanyFormModal
        opened={companyFormModal[0]}
        onClose={companyFormModal[1].close}
        centered={false}
      />
    </Box>
  );
}

export default DriverForm;
