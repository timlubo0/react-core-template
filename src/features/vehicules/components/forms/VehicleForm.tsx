import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Group,
  Textarea,
  Select,
  ActionIcon,
  Loader,
  Autocomplete,
  NumberInput,
  rem,
} from "@mantine/core";
import {
  IconCirclePlus,
  IconPhoto,
  IconUpload,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { IVehicle } from "../../types";
import { useSelectMemo } from "../../../../hooks/useSelectMemo";
import { useVehicleMarks } from "../../hooks/vehicleMarks";
import { colors } from "../../../../utils/colors";
import { modeleCars } from "../../../../utils/modeleCars";
import VehicleMarkFormModal from "../modals/VehicleMarkFormModal";
import { useDisclosure } from "@mantine/hooks";
import { useVehicleEnergies } from "../../hooks/vehicleEnergies";
import VehicleEnergyFormModal from "../modals/VehicleEnergyFormModal";
import { useDrivers } from "../../../drivers/hooks/drivers";
import DriverFormModal from "../../../drivers/components/modals/DriverFormModal";
import AutomobileTypeFormModal from "../../../automobileTypes/components/modals/AutomobileTypeFormModal";
import { useAutomobileTypes } from "../../../automobileTypes/hooks/automobileTypes";
import VehicleUseFormModal from "../modals/VehicleUseFormModal";
import { useVehicleUses } from "../../hooks/vehicleUses";
import CompanyFormModal from "../../../companies/components/modals/CompanyFormModal";
import { useCompanies } from "../../../companies/hooks/companies";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath  } from "@mantine/dropzone";
import ImageFileInput from "../../../../components/ImageFileInput";
import FileUploader from "../FileUploader";

interface Props {
  onSubmit: (data: IVehicle) => void;
  isLoading: boolean;
  vehicle?: IVehicle;
}

function VehicleForm({ onSubmit, isLoading, vehicle }: Props) {
  const vehicleMarkFormModal = useDisclosure();
  const vehicleEnergyFormModal = useDisclosure();
  const driverFormModal = useDisclosure();
  const automobileTypeFormModal = useDisclosure();
  const vehicleUseFormModal = useDisclosure();
  const companyFormModal = useDisclosure();

  const schema = z.object({
    color: z.string().min(3, { message: "Minimum 3 caracteres" }),
    manufacturingYear: z.number().min(1985),
    circulationYear: z.number().min(1),
    registrationNumber: z.string().optional(),
    plateNumber: z.string(),
    cvNumber: z.string().optional(),
    chassisNumber: z.string().min(3, { message: "Minimum 3 caracteres" }),
    engineNumber: z.string().optional(),
    model: z.string().min(3, { message: "Minimum 3 caracteres" }),
    mileage: z.number().min(0),
    numberOfSeats: z.number().min(1),
    fuelConsumption: z.number().min(1),
    markId: z.number(),
    driverId: z.number(),
    autoMobileTypeId: z.number(),
    vehicleUseId: z.number().optional(),
    vehicleEnergyId: z.number(),
    companyId: z.number().nullable().optional(),
    files: z.any().optional(),
  });

  const handleFileChange = (files: FileWithPath[]) => {
    console.log(files);
  };

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      color: vehicle?.color || "",
      manufacturingYear: vehicle?.manufacturingYear || 0,
      circulationYear: vehicle?.circulationYear || 0,
      registrationNumber: vehicle?.registrationNumber || "",
      cvNumber: vehicle?.cvNumber || "",
      plateNumber: vehicle?.plateNumber || "",
      chassisNumber: vehicle?.chassisNumber || "",
      engineNumber: vehicle?.engineNumber || "",
      model: vehicle?.model || "",
      mileage: vehicle?.mileage || 0,
      numberOfSeats: vehicle?.numberOfSeats || 0,
      fuelConsumption: vehicle?.fuelConsumption || 0,
      markId: vehicle?.mark?.id || 0,
      driverId: vehicle?.driver?.id || 0,
      autoMobileTypeId: vehicle?.automobileType?.id || 0,
      vehicleUseId: vehicle?.vehicleUse?.id || 0,
      vehicleEnergyId: vehicle?.vehicleEnergy?.id || 0,
      companyId: vehicle?.company?.id || null,
    },
  });

  const vehicleMarksQuery = useVehicleMarks({ per_page: 100 });
  const vehicleEnergiesQuery = useVehicleEnergies({ per_page: 100 });
  const driversQuery = useDrivers({ per_page: 100 });
  const vehicleUsesQuery = useVehicleUses({ per_page: 100 });
  const automobileTypesQuery = useAutomobileTypes({ per_page: 100 });
  const companiesQuery = useCompanies({ per_page: 100 });
  const automobileTypes = useSelectMemo({ data: automobileTypesQuery.data });
  const companies = useSelectMemo({ data: companiesQuery.data });
  const vehicleUses = useSelectMemo({ data: vehicleUsesQuery.data });
  const drivers = useSelectMemo({ data: driversQuery.data });
  const vehicleMarks = useSelectMemo({ data: vehicleMarksQuery.data });
  const vehicleEnergies = useSelectMemo({ data: vehicleEnergiesQuery.data });
  const formatedColors = useSelectMemo({
    data: colors,
    key: "label",
    value: "label",
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Group grow>
          <Select
            {...form.getInputProps("markId")}
            label="Marque du vehicule"
            withAsterisk
            placeholder="Choisir une marque"
            searchable
            nothingFound="No options"
            data={vehicleMarks}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={
              <ActionIcon onClick={() => vehicleMarkFormModal[1].open()}>
                {!vehicleMarksQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {vehicleMarksQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
          <Autocomplete
            label="Couleur"
            withAsterisk
            data={formatedColors}
            placeholder="couleur du vehicule..."
            {...form.getInputProps("color")}
          />
          <Autocomplete
            label="Modele"
            withAsterisk
            data={modeleCars}
            placeholder="Modele du vehicule..."
            {...form.getInputProps("model")}
          />
        </Group>
        <Group grow>
          <TextInput
            label="N° Chassis"
            withAsterisk
            placeholder="numero de chassis..."
            {...form.getInputProps("chassisNumber")}
          />
          <NumberInput
            label="Kilometrage"
            placeholder="kilometrage..."
            {...form.getInputProps("mileage")}
          />
          <Select
            {...form.getInputProps("vehicleEnergyId")}
            label="Energie"
            placeholder="Choisir le type de carburant"
            searchable
            nothingFound="No options"
            data={vehicleEnergies}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={
              <ActionIcon onClick={() => vehicleEnergyFormModal[1].open()}>
                {!vehicleEnergiesQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {vehicleEnergiesQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
        </Group>
        <Group grow>
          <NumberInput
            label="Année de fabrication"
            placeholder="année de fabrication..."
            {...form.getInputProps("manufacturingYear")}
          />
          <NumberInput
            label="Année de circulation"
            placeholder="année de circulation..."
            {...form.getInputProps("circulationYear")}
          />
          <TextInput
            label="No Immatriculation"
            withAsterisk
            placeholder="numero d'immatriculation..."
            {...form.getInputProps("plateNumber")}
          />
        </Group>
        <Group grow>
          <NumberInput
            label="Places assises"
            placeholder="Nombre de places..."
            {...form.getInputProps("numberOfSeats")}
          />
          <NumberInput
            label="Consommation"
            description="Estimation consommation de carburant par kilometre"
            placeholder="Quantité de consommation..."
            {...form.getInputProps("fuelConsumption")}
          />
          <Select
            {...form.getInputProps("vehicleEnergyId")}
            label="Type de carburant"
            placeholder="Choisir le type de carburant"
            searchable
            nothingFound="No options"
            data={vehicleEnergies}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={
              <ActionIcon onClick={() => vehicleEnergyFormModal[1].open()}>
                {!vehicleEnergiesQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {vehicleEnergiesQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
        </Group>

        <Group grow>
          <Select
            {...form.getInputProps("driverId")}
            label="Chauffeur"
            placeholder="Choisir un chauffeur"
            searchable
            nothingFound="No options"
            data={drivers}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={
              <ActionIcon onClick={() => driverFormModal[1].open()}>
                {!driversQuery.isLoading && <IconCirclePlus size={"1.45rem"} />}
                {driversQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
          <Select
            {...form.getInputProps("autoMobileTypeId")}
            label="Type d'automobile"
            placeholder="Type d'automobile"
            searchable
            nothingFound="No options"
            data={automobileTypes}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={
              <ActionIcon onClick={() => automobileTypeFormModal[1].open()}>
                {!automobileTypesQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {automobileTypesQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
          <Select
            {...form.getInputProps("vehicleUseId")}
            label="Usage"
            placeholder="Choisir une preference d'usage"
            searchable
            nothingFound="No options"
            data={vehicleUses}
            dropdownPosition="bottom"
            maxDropdownHeight={280}
            rightSection={
              <ActionIcon onClick={() => vehicleUseFormModal[1].open()}>
                {!vehicleUsesQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {vehicleUsesQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
          <Select
            {...form.getInputProps("companyId")}
            label="Entreprise"
            placeholder="Selectionner l'entreprise"
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
        </Group>
        <Box my={10}>
          <ImageFileInput
            onChange={(files) => form.setFieldValue('files', files)}
            size={"100%"}
            placeholder="Séléctionnez minimum 2 images du véhicule."
          />
        </Box>

        <Group mt="xl" position="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
      <VehicleMarkFormModal
        opened={vehicleMarkFormModal[0]}
        onClose={vehicleMarkFormModal[1].close}
        centered={false}
      />
      <VehicleEnergyFormModal
        opened={vehicleEnergyFormModal[0]}
        onClose={vehicleEnergyFormModal[1].close}
        centered={false}
      />
      <DriverFormModal
        opened={driverFormModal[0]}
        onClose={driverFormModal[1].close}
        centered={false}
      />
      <AutomobileTypeFormModal
        opened={automobileTypeFormModal[0]}
        onClose={automobileTypeFormModal[1].close}
        centered={false}
      />
      <VehicleUseFormModal
        opened={vehicleUseFormModal[0]}
        onClose={vehicleUseFormModal[1].close}
        centered={false}
      />
      <CompanyFormModal
        opened={companyFormModal[0]}
        onClose={companyFormModal[1].close}
        centered={false}
      />
    </Box>
  );
}

export default VehicleForm;

function getUsers() {
  throw new Error("Function not implemented.");
}
