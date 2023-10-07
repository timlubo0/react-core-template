export const Routes = {
    login: "/",
    home: "/home",
    notFound: "/404",
    denied: "/401",
    users: "/users",
    userProfile: "/profile",
    roles: "/roles",
    permissions: "/permissions",
    cities: "/cities",
    currencies: "/currencies",
    payModes: "/pay-modes",
    userPayModes: "/user-pay-modes",
    rates: "/rates",
    companies: "/companies",
    automobileTypes: "/automobile-types",
    automobileOwners: "/automobile-owners",
    vehicles: "/vehicles",
    vehicleUses: "/vehicle-uses",
    vehicleMarks: "/vehicle-marks",
    vehicleEnergies: "/vehicle-energies",
    drivers: "/drivers",
    driverProfile: "/driver-profile", 
    prices: "/prices",
    raceTypes: "/race-types",
    races: "/races", 
    racePrices: '/race-prices',
    stops: '/stops',
    transportLines: '/transport-lines',
    earnings: '/earnings',
    fuelPrices: '/fuel-prices',
    reports: '/reports',
};

export const excludeInAppLayoutRoutes = [
    Routes.login,
    Routes.notFound
];

  