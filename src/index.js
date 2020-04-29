document.addEventListener('DOMContentLoaded', () => {

    const url = "http://localhost:3000/dogs"
    const tableBody = document.getElementById("table-body")

    const getDogs = () => {
        fetch(url).then(response => response.json()).then(renderDogs)
    }

    const renderDogs = dogs => {
        tableBody.innerHTML = ''

        dogs.forEach(dog => {
            const row = document.createElement('tr')
            row.dataset.id = dog.id
            
            row.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td>
                <button class="edit"> Edit </button>
            </td>
            `
            tableBody.append(row)
        })
    }

    tableBody.addEventListener("click", event => {
        if(event.target.className === "edit"){
            const row = event.target.parentNode.parentNode
            const cells = row.getElementsByTagName("td")

            const name = cells[0].textContent
            const breed = cells[1].textContent
            const sex = cells[2].textContent

            const form = document.getElementById("dog-form")

            form.name.value = name
            form.breed.value = breed 
            form.sex.value = sex 
            form.dataset.id = row.dataset.id
        }
    })

    document.addEventListener('submit', event => {
        event.preventDefault()
        
        const form = event.target
        
        const id = form.dataset.id
        const name = form.name.value
        const breed = form.breed.value
        const sex = form.sex.value

        fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({name, breed, sex})
        })
        .then(response => response.json())
        .then(getDogs)

    })

    getDogs()

})