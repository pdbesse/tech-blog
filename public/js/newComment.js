const newCommentFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const comment = document.querySelector('#comment-description').value.trim();
    console.log(commenet);

    if (comment) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/api/posts/:id');
        } else {
            console.error(err);
        }
    }
};

document
    .querySelector('#new-comment')
    .addEventListener('click', newCommentFormHandler);
