const saveAddressData = async (event) => {
    event.preventDefault();

    const strAddress = document.querySelector("#txtAddress").value.trim();

    if (strAddress) {
        console.log("not working");
        const response = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify({ address: strAddress }),
            headers: { "Content-Type": "application/json"},
        });
        console.log("working");

        if(response.ok){
            alert("Address saved!");
        } else {
            alert("Failed to save address.");
        }
    }
};

document
    .querySelector("#saveAddress")
    .addEventListener("submit", saveAddressData);