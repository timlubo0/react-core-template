import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginScreen from "../features/auth/screens/LoginScreen";
import { useAuth } from "../features/auth/hooks/auth";
import RouteGuard from "./RouteGuard";
import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
import { PageNotFoundScreen } from "../features/errors/screens/PageNotFoundScreen";
import UsersScreen from "../features/auth/screens/UsersScreen";
import { Routes as appRoutes } from "./routes";
import RolesScreen from "../features/accessControl/screens/RolesScreen";
import RolePermissionsScreen from "../features/accessControl/screens/RolePermissionsScreen";
import CitiesScreen from "../features/cities/screens/CitiesScreen";
import CurrenciesScreen from "../features/currencies/screens/CurrenciesScreen";
import PayModesScreen from "../features/payModes/screens/PayModesScreen";
import RatesScreen from "../features/rates/screens/RatesScreen";
import UserDetailsScreen from "../features/auth/screens/UserDetailsScreen";
import { useFeaturePermissions } from "../features/accessControl/hooks/permissions";
import { AccessDeniedScreen } from "../features/errors/screens/AccessDeniedScreen";
import UserProfileScreen from "../features/auth/screens/UserProfileScreen";
import CompaniesScreen from "../features/companies/screens/CompaniesScreen";
import AutomobileTypesScreen from "../features/automobileTypes/screens/AutomobileTypesScreen";
import VehicleEnergiesScreen from "../features/vehicules/screens/VehicleEnergiesScreen";
import VehicleMarksScreen from "../features/vehicules/screens/VehicleMarksScreen";
import VehicleUsesScreen from "../features/vehicules/screens/VehicleUsesScreen";
import DriversScreen from "../features/drivers/screens/DriversScreen";
import VehiclesScreen from "../features/vehicules/screens/VehiclesScreen";
import RaceTypesScreen from "../features/races/screens/RaceTypesScreen";
import RacePricesScreen from "../features/races/screens/RacePricesScreen";
import StopsScreen from "../features/stops/screens/StopsScreen";
import TransportLinesScreen from "../features/transportLines/screens/TransportLinesScreen";
import EarningsScreen from "../features/earnings/screens/EarningsScreen";
import FuelPricesScreen from "../features/fuelPrices/screens/FuelPricesScreen";
import DriverProfileScreen from "../features/drivers/screens/DriverProfileScreen";
import RacesScreen from "../features/races/screens/RacesScreen";
import ReportsScreen from "../features/report/screens/ReportsScreen";

export default function MainNavigator() {

  const auth = useAuth();
  const permissionsChecker = useFeaturePermissions();

  return (
    <Routes>
      <Route path={appRoutes.login} element={<LoginScreen />} />
      <Route path={appRoutes.notFound} element={<PageNotFoundScreen />} />
      <Route path={appRoutes.denied} element={<AccessDeniedScreen />} />
      <Route
        path={appRoutes.home}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.home)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.home} element={<DashboardScreen />} />
      </Route>
      <Route
        path={appRoutes.users}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.users)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.users} element={<UsersScreen />} />
      </Route>
      <Route
        path={`${appRoutes.users}/:uid`}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.users)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route
          path={`${appRoutes.users}/:uid`}
          element={<UserDetailsScreen />}
        />
      </Route>
      <Route
        path={appRoutes.roles}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.roles)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.roles} element={<RolesScreen />} />
      </Route>
      <Route
        path={`${appRoutes.roles}/:uid${appRoutes.permissions}`}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.roles)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route
          path={`${appRoutes.roles}/:uid${appRoutes.permissions}`}
          element={<RolePermissionsScreen />}
        />
      </Route>
      <Route
        path={appRoutes.cities}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.cities)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.cities} element={<CitiesScreen />} />
      </Route>
      <Route
        path={appRoutes.currencies}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn &&
              permissionsChecker(appRoutes.currencies)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.currencies} element={<CurrenciesScreen />} />
      </Route>
      <Route
        path={appRoutes.payModes}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.payModes)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.payModes} element={<PayModesScreen />} />
      </Route>
      <Route
        path={appRoutes.rates}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.rates)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.rates} element={<RatesScreen />} />
      </Route>
      <Route
        path={appRoutes.userProfile}
        element={
          <RouteGuard
            isRouteAccessible={auth.isLoggedIn}
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
        handle={{ crumb: (data: any) => <span>{data?.threadName}</span>,}}
      >
        <Route path={appRoutes.userProfile} element={<UserProfileScreen />} />
      </Route>
      <Route
        path={appRoutes.driverProfile}
        element={
          <RouteGuard
            isRouteAccessible={auth.isLoggedIn}
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
        handle={{ crumb: (data: any) => <span>{data?.threadName}</span>,}}
      >
        <Route path={appRoutes.driverProfile} element={<DriverProfileScreen />} />
      </Route>
      <Route
        path={appRoutes.companies}
        element={
          <RouteGuard
            isRouteAccessible={auth.isLoggedIn && permissionsChecker(appRoutes.companies)?.canRead}
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.companies} element={<CompaniesScreen />} />
      </Route>
      <Route
        path={appRoutes.automobileTypes}
        element={
          <RouteGuard
            isRouteAccessible={auth.isLoggedIn && permissionsChecker(appRoutes.automobileTypes)?.canRead}
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.automobileTypes} element={<AutomobileTypesScreen />} />
      </Route>
      <Route
        path={appRoutes.vehicleEnergies}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.vehicleEnergies)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
        handle={{ crumb: (data: any) => <span>{data?.threadName}</span>,}}
      >
        <Route path={appRoutes.vehicleEnergies} element={<VehicleEnergiesScreen />} />
      </Route>
      <Route
        path={appRoutes.vehicleMarks}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.vehicleMarks)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
        handle={{ crumb: (data: any) => <span>{data?.threadName}</span>,}}
      >
        <Route path={appRoutes.vehicleMarks} element={<VehicleMarksScreen />} />
      </Route>
      <Route
        path={appRoutes.vehicleUses}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.vehicleUses)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
        handle={{ crumb: (data: any) => <span>{data?.threadName}</span>,}}
      >
        <Route path={appRoutes.vehicleUses} element={<VehicleUsesScreen />} />
      </Route>
      <Route
        path={appRoutes.drivers}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.drivers)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.drivers} element={<DriversScreen />} />
      </Route>
      <Route
        path={`${appRoutes.drivers}/:uid`}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.drivers)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route
          path={`${appRoutes.drivers}/:uid`}
          element={<DriverProfileScreen />}
        />
      </Route>
      <Route
        path={appRoutes.raceTypes}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.raceTypes)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.raceTypes} element={<RaceTypesScreen />} />
      </Route>
      <Route
          path={`${appRoutes.races}`}
          element={<RacesScreen />}
        />
      <Route
          path={`${appRoutes.reports}`}
          element={<ReportsScreen />}
        />
      <Route
        path={appRoutes.races}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && !permissionsChecker(appRoutes.races)?.canRead 
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.races} element={<RacesScreen />} /> 
      </Route>
      <Route
        path={appRoutes.racePrices}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.racePrices)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.racePrices} element={<RacePricesScreen />} />
      </Route>
      <Route
        path={appRoutes.stops}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.stops)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.stops} element={<StopsScreen />} />
      </Route>
      <Route
        path={appRoutes.transportLines}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.transportLines)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.transportLines} element={<TransportLinesScreen />} />
      </Route>
      <Route
        path={appRoutes.earnings}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.earnings)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.earnings} element={<EarningsScreen />} />
      </Route>
      <Route
        path={appRoutes.fuelPrices}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.fuelPrices)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.fuelPrices} element={<FuelPricesScreen />} />
      </Route>
      <Route
        path={appRoutes.vehicles}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.vehicles)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.vehicles} element={<VehiclesScreen />} />
      </Route>
      <Route path="*" element={<Navigate to={appRoutes.notFound} />} />
    </Routes>
  ); 
}
  