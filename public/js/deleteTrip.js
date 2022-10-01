const formHandler = async (event) => {
  event.preventDefault();

  const tripID = document.querySelector("#lblTripID").textContent.trim();

  if (tripID) {
    // attempt to delete a trip
    const response = await fetch(`/api/trips/${tripID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete trip.");
    }
  }
};

document
  .querySelector("#deleteTripForm")
  .addEventListener("submit", formHandler);
