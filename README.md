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

- While electric vehicles are becoming more and more available, the infrastructure required for long distance trips are not mature as the infrastructure for gas vehicles or as well known. 
- Various government agencies are working on these issue
	- Examples:
		- US Dept of Energy’s [Alternative Fuels Data Center](https://afdc.energy.gov/)
		- [National Renewable Energy Lab](https://developer.nrel.gov/)
		- CDOT Dept of Innovative Mobility and the Colorado Energy Office’s [NEVI Program](https://www.codot.gov/programs/innovativemobility/electrification/nevi-plan)
	- However, the private companies that have the most market share for providing Driving Directions have yet to incorporate this feature, but a couple are starting to work on it, i.e MapBox & Tom-Tom.
- This project aims to help long distance EV travelers gain confidence that they will not be stuck on the side of the road with a depleted battery.

### User Story

```
As an Electric Vehicle Owner,
I want to know where charging stations are located prior to my trips
because charging stations are not as prevalent as gas stations (yet).
```

## Features

- User
	- Create Account
	- Login/Logout
	- Change Password
	- Add & Remove EVs to their Fleet
	- Add & Remove Trips
	- View EV Charging Stations along their route
	- Specify a default starting address/location
- Administration
	- User Management
		- Lock/Unlock Users
		- Delete Users
	- EV Management
		- Import new EVs from NREL’s Alternative Fuel Vehicles API

## Future Enhancements

- Allow the user to reset a forgotten password.
- Force a user to change their password on their next login.
- Automatically lock out a user on a set number of failed login attempts.
- Add paging to the administration tables.

## Acceptance Criteria

```
As a User

WHEN I visit the site
THEN I am presented with the login page where I am able to login in, create an account, or reset a forgotten password

WHEN I create an account
THEN the system prompts me for a username, email, password.

WHEN I log in correctly
THEN I am sent to my Dashboard page 

WHEN I am logged in
THEN I see navigation links for the Dashboard, my profile, my trips, my fleet, and the option to log out

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

- HTML
- CSS
- JavaScript
- [GitHub](https://www.github.com)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
- [Node-fetch](https://www.npmjs.com/package/node-fetch)
- [Bootstrap v5.2.1](https://www.getbootstrap.com)
- [Syntactically Awesome Style Sheets](https://sass-lang.com/)
- [Heroku](https://www.heroku.com/)
- [MapBox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)

### 3rd Party Application Programming Interfaces

- [MapBox Directions](https://docs.mapbox.com/api/navigation/directions/)
- [NREL Alternative Fuel Stations](https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/)
- [NREL Alternative Fuel Vehicles](https://developer.nrel.gov/docs/transportation/vehicles-v1/)

## Collaborators

- Dan Kelly: [Github LINK](https://github.com/dpk5e7)
- Drew Lederman: [Github LINK](https://github.com/TREWSKII)
- Andrew Lovato: [Github LINK](https://github.com/drewlovato)

## License

[![License:](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This application is covered under the [MIT License](https://opensource.org/licenses/MIT).

## Resources

- GitHub Repo: [https://github.com/dpk5e7/evRoute](https://github.com/dpk5e7/evRoute)
- Heroku Hosted URL: [https://dpk5e7-evroute.herokuapp.com/](https://dpk5e7-evroute.herokuapp.com/)
