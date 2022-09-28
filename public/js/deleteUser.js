const formHandler = async (event) => {
  event.preventDefault();

  const userID = document.querySelector("#lblUserID").textContent.trim();

  if (userID) {
    // attempt to delete an article
    const response = await fetch(`/api/users/${userID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/admin/users");
    } else {
      alert("Failed to delete user.");
    }
  }
};

document
  .querySelector("#deleteUserForm")
  .addEventListener("submit", formHandler);
