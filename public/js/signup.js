const handleSignupForm = async (submission) => {
    submission.preventDefault();

    //   collect new user data
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    // confirm data all exists
    if (name && email && password) {
        // send data to the api
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        // relocate to home page
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector("#signup-form")
    .addEventListener("submit", handleSignupForm);
