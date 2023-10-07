import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { IRace } from "../types";
import { IconFilter, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRaces } from "../hooks/races";
import Race from "../components/Race";
import MapView from "../../../components/MapView";
import MapViewHeader from "../components/MapViewHeader";
import MapViewFooter from "../components/MapViewFooter";
import MapWithDirections from "../../../components/MapWithDirections";

function RacesScreen() {
  const racesQuery = useRaces();
  const [selectedRace, setSelectedRace] = useState<IRace | undefined>(
    racesQuery.data[0]
  );
  const [selectedCoords, setSelectedCoords] = useState([{ lat: 0, lng: 0 }]);

  const handleRaceSelection = (race: IRace) => {
    setSelectedRace(race);
    const departureCoords = JSON.parse(race.departureCoords);
    const arrivalCoords = JSON.parse(race.arrivalCoords);

    const coords = [
      {
        lat: parseFloat(departureCoords?.latitude),
        lng: parseFloat(departureCoords?.longitude),
      },
      {
        lat: parseFloat(arrivalCoords?.latitude),
        lng: parseFloat(arrivalCoords?.longitude),
      },
    ];

    setSelectedCoords(coords);
  };

  useEffect(() => {
    setSelectedRace(racesQuery.data[0]);
    racesQuery.data.length > 0 && handleRaceSelection(racesQuery.data[0]);
  }, [racesQuery.data]);


  return (
    <Stack bg={"#F1F3F5"} mih={"100vh"} h={"100vh"} p={"md"}>
      <Flex mih={"100vh"} h={"100vh"}>
        <ScrollArea mr={10} mah={"95%"}>
          <Stack w={400} mb={15}>
            <Title size={"md"}>LIDO-TAXI COURSE</Title>
            <Flex justify={"space-between"}>
              <Input
                icon={<IconSearch size="1rem" />}
                placeholder="Chercher une course"
                size="xs"
              />
              <Button
                variant="outline"
                leftIcon={<IconFilter size="1rem" />}
                size="xs"
              >
                Filtrer
              </Button>
            </Flex>
          </Stack>
          <Stack spacing={5}>
            {racesQuery.data.map((race: IRace) => (
              <Box key={race.id}>
                <Race
                  race={race}
                  isSelected={selectedRace?.id === race.id}
                  onSelect={(race) => handleRaceSelection(race)}
                />
              </Box>
            ))}
          </Stack>  
        </ScrollArea>
        <MapWithDirections coords={selectedCoords}>
          {selectedRace && (
            <Stack align="center">
              <MapViewHeader race={selectedRace} />
              <MapViewFooter race={selectedRace} />
            </Stack>
          )}
        </MapWithDirections>
      </Flex>
    </Stack>
  );
}

export default RacesScreen;
