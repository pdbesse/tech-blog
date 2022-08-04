const newPostFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const title = document.querySelector('#new-post-title').value.trim();
    const description = document.querySelector('#new-post-description').value.trim();

    if (title && description) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const createButton = async () => {
    document.location.replace('/dashboard/new')
};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostFormHandler);

document
    .querySelector('#new')
    .addEventListener('click', createButton);

