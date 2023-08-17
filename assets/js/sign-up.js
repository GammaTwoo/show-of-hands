const form = document.getElementById('signUpForm')

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const inputDataArray = [];

    formData.forEach((value, name) => {
        inputDataArray.push({ name,value })
    });

    console.log('Input Data Array', inputDataArray)
})