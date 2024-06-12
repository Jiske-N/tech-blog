// create a comment
const handleCommentSubmit = async (submission) => {
    submission.preventDefault();

    //   collect comment data
    const commentForm = document.querySelector("#textarea");

    const content = commentForm.value.trim();
    const blogPost_id = commentForm.dataset.blogpostId;

    // if comment data exists send it to the api
    if (content && blogPost_id) {
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({ content, blogPost_id }),
            headers: { "Content-Type": "application/json" },
        });

        // if api was succesful refresh the page to display new comment
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

// look for comment button
const commentButton = document.querySelector("#comment-form");

// if comment button exists add an event listener to it
if (commentButton) {
    document
        .querySelector("#comment-form")
        .addEventListener("submit", handleCommentSubmit);
}
