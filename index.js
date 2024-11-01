const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE' //default mode
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    if (id) {
        mode = 'EDIT'
        selectedId = id
    }

    //load old user data
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`)
        const user = response.data

        // Get all the input elements
        let firstNameDOM = document.querySelector('input[name=firstname]')
        let lastNameDOM = document.querySelector('input[name=lastname]')
        let ageDOM = document.querySelector('input[name=age]')
        let descriptionDOM = document.querySelector('textarea[name=description]')

        firstNameDOM.value = user.firstname
        lastNameDOM.value = user.lastname
        ageDOM.value = user.age
        descriptionDOM.value = user.description

        let genderDOMs = document.querySelectorAll('input[name=gender]')
        let interestDOMs = document.querySelectorAll('input[name=interest]')

        for (let i = 0; i < genderDOMs.length; i++) {
            if (genderDOMs[i].value == user.gender) {
                genderDOMs[i].checked = true
            }
        }

        for (let i = 0; i < interestDOMs.length; i++) {
            if (user.interests.includes(interestDOMs[i].value)) {
                interestDOMs[i].checked = true
            }
        }

    } catch (error) {
        console.log('error', error)
    }
    //put user data back to input html
}

const validateData = (userData) => {
    let errors = []

    if (!userData.firstname) {
        errors.push('Firstname is required')
    }
    if (!userData.lastname) {
        errors.push('Lastname is required')
    }
    if (!userData.age) {
        errors.push('Age is required')
    }
    if (!userData.gender) {
        errors.push('Gender is required')
    }
    if (!userData.interests) {
        errors.push('Interests is required')
    }
    if (!userData.description) {
        errors.push('Description is required')
    }
    return errors
}

const submitData = async () => {
    // Get all the input elements
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {}
    let descriptionDOM = document.querySelector('textarea[name=description]')

    let messageDOM = document.getElementById('message')

    try {
        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i != interestDOMs.length - 1) {
                interest += ', '
            }
        }

        console.log('test')
        // Create a user data object
        let userData = {
            firstname: firstNameDOM.value,
            lastname: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        }

        console.log('submit data', userData)

        const errors = validateData(userData)

        if (errors.length > 0) {
            throw {
                message: 'Incomplete information',
                errors: errors
            }
        }

        // submit data
        let message = 'save success'
        if (mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/users`, userData)
            console.log('response data', response.data)
        } else {
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
            message = 'update success'
            console.log('response data', response.data)
        }

        messageDOM.innerText = message
        messageDOM.className = 'message success'
    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)
        if (error.response) {
            console.log(error.response)
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }

        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'

        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }
}