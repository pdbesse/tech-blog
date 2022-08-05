const createButton = async () => {
    await fetch('/dashboard/new', {
       method: 'GET',
   });
       // document.location.replace('/dashboard/new')
};

document
    .querySelector('#new')
    .addEventListener('click', createButton);
