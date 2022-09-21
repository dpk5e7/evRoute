const formHandler = async (event) => {
  event.preventDefault();

  const currentPassword = document
    .querySelector("#txtCurrentPassword")
    .value.trim();
  const newPassword = document.querySelector("#txtNewPassword").value.trim();
  const confirmPassword = document
    .querySelector("#txtConfirmPassword")
    .value.trim();

  if (newPassword === confirmPassword) {
    const response = await fetch(`/api/users/password/`, {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Password primarylly changed.");
      document.location.replace("/profile");
    } else {
      alert(`Failed to update password.`);
    }
  } else {
    alert("The New & Confirm Passwords must match.");
  }
};

document
  .querySelector("#changePasswordForm")
  .addEventListener("submit", formHandler);
