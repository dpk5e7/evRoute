const formHandler = async (event) => {
  event.preventDefault();

  const evID = document.querySelector("#hdnEVID").value.trim();

  if (evID) {
    // attempt to delete an electric vehicle from the fleet
    const response = await fetch(`/api/fleet/${evID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete electric vehicle from your fleet.");
    }
  }
};

document
  .querySelector("#deleteEVFromFleetForm")
  .addEventListener("submit", formHandler);
