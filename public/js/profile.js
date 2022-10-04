const saveAddressData = async (event) => {
  event.preventDefault();

  const strAddress = document.querySelector("#txtAddress").value.trim();

  if (strAddress) {
    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ address: strAddress }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Address saved!");
      document.location.replace("/dashboard");
    } else {
      alert("Failed to save address.");
    }
  }
};

document
  .querySelector("#saveAddress")
  .addEventListener("submit", saveAddressData);
