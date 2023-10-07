import { Badge, Loader, Table, Text } from "@mantine/core";
import { useFuelPrices } from "../../fuelPrices/hooks/fuelPrices";
import { useAutomobileType, useAutomobileTypes } from "../../automobileTypes/hooks/automobileTypes";
import { IAutomobileType } from "../../automobileTypes/types";

interface Props {
  cityId: number;
  automobileType: IAutomobileType;
}

const RacePriceResume = ({ cityId, automobileType }: Props) => {
    const fuelPricesQuery = useFuelPrices({ key: 'city_id', value: cityId, per_page: 1 });

    const { isLoading, isFetching, data } = fuelPricesQuery;
    
    return (
      <Table striped highlightOnHover withBorder withColumnBorders>
        <tbody>
          <tr>
            <td>Prix du carburant à {data[0]?.city?.name}</td>
            <td>
              {!isLoading || !isFetching ? (
                <Badge>
                  {Array.isArray(data) ? data[0]?.price : 0} CDF /Litre
                </Badge>
              ) : (
                <Loader size={"md"} variant="dots" />
              )}
            </td>
          </tr>
          <tr>
            <td>Consomation carburant {automobileType?.name}</td>
            <td>
              <Badge tt={"capitalize"}>≈{automobileType?.fuelConsumption} Litre(s)/Km</Badge>
            </td>
          </tr>
          <tr>
            <td>Nombre des sieges pour {automobileType?.name}</td>
            <td>
              <Badge tt={"capitalize"}>≈{automobileType?.numberOfSeats}</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    );
}

export default RacePriceResume;