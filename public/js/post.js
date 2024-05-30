// send of data for creating a new post to api
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

// send of data for updating an existing post to api
const handleUpdatePost = async (submission) => {
  submission.preventDefault();

  console.log('postjs', submission);
  //   collect comment data
  const titleForm = document.querySelector('#title');
  const contentForm = document.querySelector('#content');

  const title = titleForm.value.trim();
  const content = contentForm.value.trim();
  const id = contentForm.dataset.blogpostId;
  //   const blogPost_id = commentForm.dataset.blogpostId;
  console.log(content, title, id);

  //   console.log(blogPost_id);

  if (content && title && id) {
    console.log(content, title, id);
    const response = await fetch(`/api/blogPost/${id}`, {
      method: 'PUT',
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

// send id of an existing post to api to delete
const handleDeletePost = async (submission) => {
  submission.preventDefault();
  console.log(submission);
  const contentForm = document.querySelector('#content');
  const id = contentForm.dataset.blogpostId;

  if (id) {
    console.log(id);
    const response = await fetch(`/api/blogPost/${id}`, {
      method: 'DELETE',
      // body: JSON.stringify({ content, title }),
      // headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('postjs response ok');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// grab create, update and delete buttons from page
const postButton = document.querySelector('#post-form');
const updateButton = document.querySelector('#edit-form');
const deleteButton = document.querySelector('#delete');

// add event listeners to buttons on page if they exist
if (postButton) {
  document
    .querySelector('#post-form')
    .addEventListener('submit', handleNewPost);
}

if (updateButton) {
  document
    .querySelector('#edit-form')
    .addEventListener('submit', handleUpdatePost);
}

if (deleteButton) {
  document.querySelector('#delete').addEventListener('click', handleDeletePost);
}
