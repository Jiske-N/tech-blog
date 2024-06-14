const handleLoginForm = async (submission) => {
    submission.preventDefault();

    //   collect login data
    const name = document.querySelector("#name").value.trim();
    const password = document.querySelector("#password").value.trim();

    // if login data exists send it to the api
    if (name && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" },
        });

        // if api was successful relocate to homepage
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector("#login-form")
    .addEventListener("submit", handleLoginForm);
