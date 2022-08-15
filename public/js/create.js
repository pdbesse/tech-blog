const createButton = async () => {
    await fetch('/dashboard/new', {
       method: 'GET',
   });
       // document.location.replace('/dashboard/')
};

document
    .querySelector('#new')
    .addEventListener('click', createButton);
