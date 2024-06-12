// send of data for creating a new post to api
const handleNewPost = async (submission) => {
    submission.preventDefault();

    //   collect comment data
    const titleForm = document.querySelector("#title");
    const commentForm = document.querySelector("#content");

    const title = titleForm.value.trim();
    const content = commentForm.value.trim();

    // confirm data exists
    if (content && title) {
        // send data to api
        const response = await fetch("/api/blogPost", {
            method: "POST",
            body: JSON.stringify({ content, title }),
            headers: { "Content-Type": "application/json" },
        });

        // navigate to dashboard if api was successful
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

// send of data for updating an existing post to api
const handleUpdatePost = async (submission) => {
    submission.preventDefault();

    //   collect comment data
    const titleForm = document.querySelector("#title");
    const contentForm = document.querySelector("#content");

    const title = titleForm.value.trim();
    const content = contentForm.value.trim();
    const id = contentForm.dataset.blogpostId;

    // confirm data exists
    if (content && title && id) {
        // send data to api
        const response = await fetch(`/api/blogPost/${id}`, {
            method: "PUT",
            body: JSON.stringify({ content, title }),
            headers: { "Content-Type": "application/json" },
        });

        // if api was succesful relocate to dashboard
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

// send id of an existing post to api to delete
const handleDeletePost = async (submission) => {
    submission.preventDefault();

    // pull id of post from the form/button
    const contentForm = document.querySelector("#content");
    const id = contentForm.dataset.blogpostId;

    // if id was successfully pulled send it to the api
    if (id) {
        const response = await fetch(`/api/blogPost/${id}`, {
            method: "DELETE",
        });

        // if api was succesful relocate to dashboard
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

// grab create, update and delete buttons from page
const postButton = document.querySelector("#post-form");
const updateButton = document.querySelector("#edit-form");
const deleteButton = document.querySelector("#delete");

// add event listeners to buttons on page if they exist
if (postButton) {
    document
        .querySelector("#post-form")
        .addEventListener("submit", handleNewPost);
}

if (updateButton) {
    document
        .querySelector("#edit-form")
        .addEventListener("submit", handleUpdatePost);
}

if (deleteButton) {
    document
        .querySelector("#delete")
        .addEventListener("click", handleDeletePost);
}
