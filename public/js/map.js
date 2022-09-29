const btnClear = document.querySelector("#btnClear");
const btnDirections = document.querySelector("#btnDirections");
const btnSave = document.querySelector("#btnSave");
const txtTitle = document.querySelector("#txtTitle");
const txtStartAddress = document.querySelector("#txtStartAddress");
const txtDestinationAddress = document.querySelector("#txtDestinationAddress");
const ddlElectricVehicle = document.querySelector("#ddlElectricVehicle");
const directionsForm = document.querySelector("#directionsForm");
const hdnUserID = document.querySelector("#hdnUserID");
const hdnTripID = document.querySelector("#hdnTripID");
const hdnSelectedEVID = document.querySelector("#hdnSelectedEVID");

let map;
let mapMarkers = [];

// Event Listeners
btnDirections.addEventListener("click", getDirections);
btnClear.addEventListener("click", clearMarkers);
directionsForm.addEventListener("submit", saveTrip);

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

async function getLonLat(searchString) {
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

async function fetchDirections(start, destination) {
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

async function getDirections(event) {
  event.preventDefault();

  const start = document.querySelector("#txtStartAddress").value.trim();
  const destination = document
    .querySelector("#txtDestinationAddress")
    .value.trim();

  if (start && destination) {
    const startCoordinates = await getLonLat(start);
    const destinationCoordinates = await getLonLat(destination);

    const directions = await fetchDirections(
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

    // Drop Charging stations near the start of the route
    //setStationMarkersNearCoordinates(...startCoordinates, 10, 10);

    // Find all the waypoints
    let waypoints = [];
    for (let step of directions.routes[0].legs[0].steps) {
      const distance = await getDistanceAsCrowFlies(
        startCoordinates,
        step.geometry.coordinates[0]
      );
      if (distance > 20) {
        let objWaypoint = {
          longitude: step.geometry.coordinates[0][0],
          latitude: step.geometry.coordinates[0][1],
        };
        waypoints.push(objWaypoint);
      }
    }

    waypoints.reverse(); // start at the destination

    // Use the waypoints to build a LINESTRING for NREL's nearby-route API
    // LINESTRING(-74.0 40.7, -87.63 41.87, -104.98 39.76)
    let lineString = "LINESTRING(";
    for (wp of waypoints) {
      lineString += `${wp.longitude} ${wp.latitude}, `;
    }
    lineString = lineString.slice(0, -2) + ")";

    const response = await fetch(
      `/api/nrel/stationsNearRoute?route=${lineString}`
    );
    const data = await response.json();

    // Remove all markers
    await clearMarkers();

    // Set the markers for the fuel stations
    await setStationMarkers(data.fuel_stations);

    // Set the markers for the start and destination
    await setMarker(`<b>${start}</b>`, startCoordinates, "yellow-dot");
    await setMarker(`<b>${destination}</b>`, destinationCoordinates, "red-dot");

    // Drop charging stations near the end of the route
    //setStationMarkersNearCoordinates(...destinationCoordinates, 10, 10);
  }
}

// Modified from https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
async function getDistanceAsCrowFlies(start, end) {
  var R = 3960; // Radius of the earth in miles
  var dLat = await deg2rad(end[1] - start[1]); // deg2rad below
  var dLon = await deg2rad(end[0] - start[0]);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(await deg2rad(start[1])) *
      Math.cos(await deg2rad(end[1])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in miles
  return d;
}

async function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

async function setStationMarkers(stationData) {
  // Add markers to the map.
  for (const station of stationData) {
    setMarker(
      `<b>${station.station_name}</b><br>${station.street_address}<br>${station.city}, ${station.state} ${station.zip}<br>EV Connector Types: ${station.ev_connector_types}`,
      [station.longitude, station.latitude],
      "blue"
    );
  }
}

async function setStationMarkersNearCoordinates(lon, lat, radius, limit) {
  const stationData = await getStationData(lon, lat, radius, limit);
  await setStationMarkers(stationData);
}

async function setMarker(text, coordinates, image) {
  const el = document.createElement("div");
  el.className = "marker";
  el.style.backgroundImage = `url(/images/${image}.png)`;
  el.style.width = `32px`;
  el.style.height = `32px`;
  el.style.backgroundSize = "100%";

  // Add markers to the map.
  const marker = new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
    new mapboxgl.Popup({
      closeButton: false,
    }).setHTML(`<b>${text}</b>`)
  );

  mapMarkers.push(marker);
  marker.addTo(map);
}

async function clearMarkers() {
  // Remove all markers
  if (mapMarkers !== null) {
    for (var i = mapMarkers.length - 1; i >= 0; i--) {
      mapMarkers[i].remove();
    }
    mapMarkers = [];
  }
}

async function saveTrip(event) {
  event.preventDefault();

  const title = txtTitle.value.trim();
  const source_address = txtStartAddress.value.trim();
  const destination_address = txtDestinationAddress.value.trim();
  const electric_vehicle_id = ddlElectricVehicle.value;
  const user_id = hdnUserID.value.trim();

  try {
    if (
      title &&
      source_address &&
      destination_address &&
      electric_vehicle_id &&
      user_id
    ) {
      const body = {
        title,
        source_address,
        destination_address,
        user_id,
        electric_vehicle_id,
      };

      let response;
      let data;

      if (!hdnTripID.value) {
        // Insert
        const response = await fetch("/api/trips/", {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (response.ok) {
          alert("Trip inserted successfully.");
          document.location.assign(`/map/${data.id}`);
        } else {
          alert("Failed to insert trip.");
        }
      } else {
        // Update
        const response = await fetch(`/api/trips/${hdnTripID.value}`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (response.ok) {
          alert("Trip updated successfully.");
        } else {
          alert("Failed to update trip.");
        }
      }

      // I don't know why, but the function is returning after a successful fetch and not continuing with the lines below.
      // console.log("Stormy Weather");
      // console.log(response);
      // console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
}

async function init() {
  const defaultStartCoordinates = await getLonLat(txtStartAddress.value.trim());

  mapboxgl.accessToken = config.MAPBOX_API_KEY;
  map = new mapboxgl.Map({
    container: "map", // container ID
    //style: "mapbox://styles/mapbox/streets-v11", // style URL
    style: "mapbox://styles/mapbox/navigation-night-v1",
    center: defaultStartCoordinates, // starting position [lng, lat]
    zoom: 11, // starting zoom
  });

  map.on("dblclick", (e) => {
    setStationMarkersNearCoordinates(e.lngLat.lng, e.lngLat.lat, 25, 25);
  });

  // if we're pre-loading a trip, make sure the right vehicle is selected and click the directions button
  if (hdnTripID.value.trim() !== "") {
    ddlElectricVehicle.value = hdnSelectedEVID.value;
    btnDirections.click();
  }
}

init();
