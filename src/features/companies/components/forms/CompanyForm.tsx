import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Group,
  Select,
  ActionIcon,
  Loader,
} from "src/components/base";
import { ICompany } from "../../types";
import { IconCirclePlus } from "@tabler/icons-react";
import { useCompanyCategories } from "../../hooks/companyCategories";
import { useSelectMemo } from "../../../../hooks/useSelectMemo";
import { useDisclosure } from "@mantine/hooks";
import CompanyCategoryFormModal from "../modals/CompanyCategoryFormModal";

interface Props {
  onSubmit: (data: ICompany) => void;
  isLoading: boolean;
  company?: ICompany;
}

function CompanyForm({ onSubmit, isLoading, company }: Props) {
  const companyCategoryFormModal = useDisclosure();

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Minimum 3 caracteres" })
      .max(100, "Maximum 100 caracteres"),
    nif: z
      .string()
      .min(3, { message: "Minimum 3 caracteres" })
      .max(100, "Maximum 100 caracteres"),
    idNat: z
      .string()
      .min(3, { message: "Minimum 3 caracteres" })
      .max(100, "Maximum 100 caracteres"),
    rccm: z
      .string()
      .min(3, { message: "Minimum 3 caracteres" })
      .max(100, "Maximum 100 caracteres"),
    companyCategoryId: z.number(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: company?.name || "",
      nif: company?.nif || "",
      idNat: company?.idNat || "",
      rccm: company?.rccm || "",
      companyCategoryId: company?.category?.id || "",
    },
  });

  const companyCategoriesQuery = useCompanyCategories({ per_page: 100 });
  const companyCategories = useSelectMemo({
    data: companyCategoriesQuery.data,
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
        <Select
          label="Categorie d'entreprise"
          placeholder="Choisir une categorie"
          searchable
          data={companyCategories}
          maxDropdownHeight={280}
          rightSection={
            <ActionIcon onClick={() => companyCategoryFormModal[1].open()}>
              {!companyCategoriesQuery.isLoading && (
                <IconCirclePlus size={"1.45rem"} />
              )}
              {companyCategoriesQuery.isLoading && <Loader size={"xs"} />}
            </ActionIcon>
          }
          {...form.getInputProps("companyCategoryId")}
        />
        <TextInput
          withAsterisk
          label="NIF"
          placeholder="NIF..."
          {...form.getInputProps("nif")}
        />
        <TextInput
          withAsterisk
          label="Identification Nationale"
          placeholder="Identification Nationale..."
          {...form.getInputProps("idNat")}
        />
        <TextInput
          withAsterisk
          label="RCCM"
          placeholder="RCCM..."
          {...form.getInputProps("rccm")}
        />

        <Group mt="xl" align="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
      <CompanyCategoryFormModal
        opened={companyCategoryFormModal[0]}
        onClose={companyCategoryFormModal[1].close}
        centered={false}
      />
    </Box>
  );
}

export default CompanyForm;
