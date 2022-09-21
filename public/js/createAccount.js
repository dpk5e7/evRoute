const loginFormHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector("#txtUserName").value.trim();
  const email = document.querySelector('#txtEmail').value.trim().toLowerCase();
  const password = document.querySelector('#txtPassword').value.trim();


  if (userName && email && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ name: userName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create user.");
    }
  }
};

document
  .querySelector("#createAccountForm")
  .addEventListener("submit", loginFormHandler);
