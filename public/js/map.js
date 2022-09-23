async function getStationData(lat, lon) {
  // This will eventually be a fetch to the NREL API
  let data = {};
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var params = {
      latitude: lat,
      longitude: lon,
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

async function setMapMarkers(map, lat, lon) {
  const stationData = await getStationData(lat, lon);

  // Add markers to the map.
  for (const station of stationData) {
    // Create a DOM element for each marker.
    const el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundImage = `url(/images/red-dot.png)`;
    el.style.width = `32px`;
    el.style.height = `32px`;
    el.style.backgroundSize = "100%";

    // Add markers to the map.
    new mapboxgl.Marker(el)
      .setLngLat([station.longitude, station.latitude])
      .setPopup(
        new mapboxgl.Popup({
          closeButton: false,
        }).setHTML(
          `<b>${station.station_name}</b><br>${station.street_address}<br>${station.city}, ${station.state} ${station.zip}<br>EV Connector Types: ${station.ev_connector_types}`
        )
      )
      .addTo(map); // add popup
  }
}

function init() {
  // Eventually we'll want to pull the center of the map from the user's default start location
  const lat = 39.7392;
  const lon = -104.9903;

  mapboxgl.accessToken = config.MAPBOX_API_KEY;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [lon, lat], // starting position [lng, lat]
    zoom: 11, // starting zoom
  });

  setMapMarkers(map, lat, lon);
}

init();
