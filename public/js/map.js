const btnClear = document.querySelector("#btnClear");
const btnSave = document.querySelector("#btnSave");
const txtTitle = document.querySelector("#txtTitle");
const txtStartAddress = document.querySelector("#txtStartAddress");
const txtDestinationAddress = document.querySelector("#txtDestinationAddress");
const ddlElectricVehicle = document.querySelector("#ddlElectricVehicle");
const directionsForm = document.querySelector("#directionsForm");
const hdnUserID = document.querySelector("#hdnUserID");
hdnUserID;

let map;
let mapMarkers = [];

// Event Listeners
directionsForm.addEventListener("submit", formHandler);
btnClear.addEventListener("click", clearMarkers);
btnSave.addEventListener("click", saveTrip);

async function getStationData(lon, lat, radius, limit) {
  let data = {};
  try {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var params = {
      latitude: lat,
      longitude: lon,
      radius: radius,
      limit: limit, // 200 is the max limit
    };

    let apiUrl = "/api/nrel/stations?";
    for (let p in params) {
      apiUrl += `${p}=${params[p]}&`;
    }
    apiUrl = encodeURI(apiUrl.slice(0, -1));

    const response = await fetch(apiUrl, requestOptions);
    data = await response.json();
  } catch (err) {
    console.log(err);
  }

  return data.fuel_stations;
}

async function setMapMarkers(lon, lat, radius, limit) {
  const stationData = await getStationData(lon, lat, radius, limit);

  // Add markers to the map.
  for (const station of stationData) {
    const el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundImage = `url(/images/blue.png)`;
    el.style.width = `32px`;
    el.style.height = `32px`;
    el.style.backgroundSize = "100%";

    // Add markers to the map.
    const marker = new mapboxgl.Marker(el)
      .setLngLat([station.longitude, station.latitude])
      .setPopup(
        new mapboxgl.Popup({
          closeButton: false,
        }).setHTML(
          `<b>${station.station_name}</b><br>${station.street_address}<br>${station.city}, ${station.state} ${station.zip}<br>EV Connector Types: ${station.ev_connector_types}`
        )
      );

    mapMarkers.push(marker);
    marker.addTo(map);
  }
}

function clearMarkers() {
  // Remove all markers
  if (mapMarkers !== null) {
    for (var i = mapMarkers.length - 1; i >= 0; i--) {
      mapMarkers[i].remove();
    }
    mapMarkers = [];
  }
}

async function getLatLong(searchString) {
  try {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var params = {
      country: "us",
      proximity: "ip",
      limit: 1,
      types: "place,postcode,address",
      language: "en",
      access_token: config.MAPBOX_API_KEY,
    };

    let apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?`;
    for (let p in params) {
      apiUrl += `${p}=${params[p]}&`;
    }
    apiUrl = encodeURI(apiUrl.slice(0, -1));

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    return data.features[0].center; // In lon, lat format to match geoJSON
  } catch (err) {
    console.log(err);
  }
}

async function getDirections(start, destination) {
  try {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var params = {
      geometries: "geojson",
      steps: true,
      access_token: config.MAPBOX_API_KEY,
    };

    let apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${destination[0]},${destination[1]}?`;
    for (let p in params) {
      apiUrl += `${p}=${params[p]}&`;
    }
    apiUrl = encodeURI(apiUrl.slice(0, -1));

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function formHandler(event) {
  event.preventDefault();

  const start = document.querySelector("#txtStartAddress").value.trim();
  const destination = document
    .querySelector("#txtDestinationAddress")
    .value.trim();

  if (start && destination) {
    const startCoordinates = await getLatLong(start);
    const destinationCoordinates = await getLatLong(destination);

    const directions = await getDirections(
      startCoordinates,
      destinationCoordinates
    );

    const route = directions.routes[0].geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    //console.log(directions);

    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }

    // Recenter the map
    map.fitBounds([startCoordinates, destinationCoordinates], {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // Remove all markers
    clearMarkers();

    // Drop Charging stations near the start of the route
    setMapMarkers(...startCoordinates, 10, 10);

    // // Find all the waypoints
    // let electricRange = 250; // In miles.  This will need to change to the selected vehicle's range

    // //let totalDistanceSoFar = 0;

    // let waypoints = [];
    // for (let step of directions.routes[0].legs[0].steps) {
    //   //for (let coord of step.geometry.coordinates) {
    //   let objWaypoint = {
    //     longitude: step.geometry.coordinates[0][0],
    //     latitude: step.geometry.coordinates[0][1],
    //     //distance: step.distance / 1609, // convert from meters to miles
    //   };

    //   if (objWaypoint.distance > electricRange) {
    //     for (
    //       let i = 0;
    //       i < step.geometry.coordinates.length;
    //       i += Math.ceil(step.geometry.coordinates.length / 4)
    //     ) {
    //       let objMidpoint = {
    //         longitude: step.geometry.coordinates[i][0],
    //         latitude: step.geometry.coordinates[i][1],
    //         //distance: step.distance / 1609, // convert from meters to miles
    //       };
    //       waypoints.push(objMidpoint);
    //     }
    //   } else {
    //     //totalDistanceSoFar += objWaypoint.distance;
    //     waypoints.push(objWaypoint);
    //   }
    // }

    // //console.log(waypoints);

    // const totalDistance = directions.routes[0].distance / 1609; // convert meters to miles
    // console.log(`Total Distance: ${totalDistance}`);

    // let guessAtNumberOfChargingStops =
    //   Math.ceil(totalDistance / electricRange) + 1; // Add 1 for good measure
    // console.log(`Number of Charging Stops: ${guessAtNumberOfChargingStops}`);

    // let waypointsPerCharge = Math.round(
    //   waypoints.length / guessAtNumberOfChargingStops
    // );
    // console.log(`Waypoints Per Charge: ${waypointsPerCharge}`);

    // for (let i = 0; i < waypoints.length; i += 1) {
    //   console.log(waypoints[i]);
    //   await setMapMarkers(
    //     waypoints[i].longitude,
    //     waypoints[i].latitude,
    //     50,
    //     10
    //   );
    // }

    // Drop charging stations near the end of the route
    setMapMarkers(...destinationCoordinates, 10, 10);
  }
}

async function saveTrip(event) {
  event.preventDefault();

  const title = txtTitle.value.trim();
  const source_address = txtStartAddress.value.trim();
  const destination_address = txtDestinationAddress.value.trim();
  const electric_vehicle_id = ddlElectricVehicle.value;
  const user_id = hdnUserID.value.trim();

  console.log(title);
  console.log(source_address);
  console.log(destination_address);
  console.log(electric_vehicle_id);
  console.log(user_id);

  if (
    title &&
    source_address &&
    destination_address &&
    electric_vehicle_id &&
    user_id
  ) {
    const response = await fetch("/api/trips/", {
      method: "POST",
      body: JSON.stringify({
        title,
        source_address,
        destination_address,
        user_id,
        electric_vehicle_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to save trip.");
    }
  }
}

function init() {
  // Eventually we'll want to pull the center of the map from the user's default start location
  const lat = 39.7392;
  const lon = -104.9903;

  mapboxgl.accessToken = config.MAPBOX_API_KEY;
  map = new mapboxgl.Map({
    container: "map", // container ID
    //style: "mapbox://styles/mapbox/streets-v11", // style URL
    style: "mapbox://styles/mapbox/navigation-night-v1",
    center: [lon, lat], // starting position [lng, lat]
    zoom: 11, // starting zoom
  });

  map.on("dblclick", (e) => {
    console.log(e.lngLat.lat);
    setMapMarkers(e.lngLat.lng, e.lngLat.lat, 25, 25);
  });
}

init();
