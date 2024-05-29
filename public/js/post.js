const handleNewPost = async (submission) => {
  submission.preventDefault();

  console.log('postjs', submission);
  //   collect comment data
  const titleForm = document.querySelector('#title');
  const commentForm = document.querySelector('#content');

  const title = titleForm.value.trim();
  const content = commentForm.value.trim();
  //   const blogPost_id = commentForm.dataset.blogpostId;

  //   console.log(blogPost_id);

  if (content && title) {
    console.log(content, title);
    const response = await fetch('/api/blogPost', {
      method: 'POST',
      body: JSON.stringify({ content, title }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('postjs response ok');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#post-form').addEventListener('submit', handleNewPost);
