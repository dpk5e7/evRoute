const btnImport = document.querySelector("#btnImport");

btnImport.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("/api/nrel/vehicles", {
      method: "PUT",
    });

    if (response.ok) {
      alert("Vehicles Updated.");
      document.location.reload();
    } else {
      alert("Failed to update vehicles.");
    }
  } catch (err) {
    alert(err);
  }
});
