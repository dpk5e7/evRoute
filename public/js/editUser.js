const formHandler = async (event) => {
  event.preventDefault();

  const userID = document.querySelector("#lblUserID").textContent.trim();
  const blnAdmin = document.querySelector("#chkAdmin").checked;
  const blnLocked = document.querySelector("#chkLocked").checked;
  const blnForceReset = document.querySelector("#chkForceReset").checked;

  console.log(userID);
  console.log(blnAdmin);
  console.log(blnLocked);
  console.log(blnForceReset);

  if (userID) {
    // attempt to update and article
    const response = await fetch(`/api/users/${userID}`, {
      method: "PUT",
      body: JSON.stringify({
        is_admin: blnAdmin,
        is_locked: blnLocked,
        force_password_reset: blnForceReset,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/admin/users");
    } else {
      alert("Failed to update user.");
    }
  }
};

document.querySelector("#editUserForm").addEventListener("submit", formHandler);
