# evRoute

[![License:](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Index

1. [Overview](#overview)
2. [Features](#features)
3. [Future Enhancements](#future-enhancements)
4. [Acceptance Criteria](#acceptance-criteria)
5. [Website Preview](#website-preview)
6. [Technologies](#technologies)
7. [Collaborators](#collaborators)
8. [License](#license)
9. [Resources](#resources)

## Overview

### Description

TBD

### User Story

```
TBD
```

## Features

1. TBD

## Future Enhancements

1. TBD

## Acceptance Criteria

```
As a User

WHEN I visit the site
THEN I am presented with the login page where I am able to login in, create an account, or reset a forgotten password

WHEN I create an account
THEN the system prompts me for a username, email, password.

WHEN I type my password incorrectly 3 times within an hour,
THEN I am locked out of my account.  (Maybe a stretch goal.)

WHEN I log in correctly
THEN I am sent to my Dashboard page 

WHEN I am logged in
THEN I see my username and context-sensitive help (instructions) on every page
AND I see navigation links for the Dashboard, my profile, my trips, my fleet, and the option to log out

WHEN I visit the Profile page
THEN I am allowed to update my default start address.

WHEN I visit the Dashboard page
THEN I see my fleet, my saved trips, and links to create a new trip and add vehicles to my fleet
AND options to delete vehicles from my fleet and my trips.

WHEN I visit the Trip page
THEN I can input a start address (defaulted to the address in my profile), destination address, and my intended EV
THEN I am presented with a map of my trip with markers on the map of charging stations along the way (courtesy of the NREL Alternative Fuel Stations API).
WHEN I click the Save/Submit button
THEN the trip is saved to my account.

WHEN I double-click on the map
THEN up to 25 charging stations within a 25-mile radius are displayed on the map

WHEN I attempt to perform any delete action
THEN I am presented with either a Modal or another Page warning me of the consequences of the action.

WHEN I click on the logout option in the navigation
THEN I am signed out of the site

WHEN I am idle on the site for more than a set time and then I try to perform another action
THEN I am prompted to log in again


As an Admin

WHEN I am logged in
THEN I see an Admin menu with links to User Management and EV Management.

WHEN I visit the User Management page
THEN I see all registered users, able to lock/unlock their account, see their last login date/time, delete their account, and make them an admin, or remove their admin status.

WHEN I visit the EV Management page
THEN I see all electric vehicles pulled from the NREL Alternative Fuel Vehicle API and can pull an update of the vehicles


As a Developer

WHEN I am collaborating with team mates
THEN I want consistently formatted code with Prettier
AND I want to ensure correct syntax with ESLint
```

## Website Preview

### Static Screenshots

TBD

### Video Preview

TBD

## Technologies

1. HTML
2. CSS
3. JavaScript
4. [GitHub](https://www.github.com)
5. [Node.js](https://nodejs.org/)
6. [Express.js](https://expressjs.com/)
7. [MySQL](https://www.mysql.com/)
8. [Sequelize](https://sequelize.org/)
9. [Bootstrap v5.2.1](https://www.getbootstrap.com)
10. [Syntactically Awesome Style Sheets](https://sass-lang.com/)
11. [Heroku](https://www.heroku.com/)
12. [MapBox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)

### 3rd Party Application Programming Interfaces

1. [MapBox Directions](https://docs.mapbox.com/api/navigation/directions/)
2. [NREL Alternative Fuel Stations](https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/)
3. [NREL Alternative Fuel Vehicles](https://developer.nrel.gov/docs/transportation/vehicles-v1/)

## Collaborators

1. Andrew Lovato: [Github LINK](https://github.com/drewlovato)
2. Dan Kelly: [Github LINK](https://github.com/dpk5e7)
3. Drew Lederman: [Github LINK](https://github.com/TREWSKII)

## License

[![License:](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This application is covered under the [MIT License](https://opensource.org/licenses/MIT).

## Resources

1. GitHub Repo: [https://github.com/dpk5e7/evRoute](https://github.com/dpk5e7/evRoute)
2. Heroku Hosted URL: TBD
