const handleCommentSubmit = async (submission) => {
  submission.preventDefault();

  console.log('commentjs', submission);
  //   collect comment data
  const commentForm = document.querySelector('#textarea');

  const content = commentForm.value.trim();
  const blogPost_id = commentForm.dataset.blogpostId;

  //   console.log(blogPost_id);

  if (content && blogPost_id) {
    console.log(content, blogPost_id);
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ content, blogPost_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('commentjs response ok');
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const commentButton = document.querySelector('#comment-form');

if (commentButton) {
  document
    .querySelector('#comment-form')
    .addEventListener('submit', handleCommentSubmit);
}
