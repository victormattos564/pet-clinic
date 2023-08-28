let idj = 1;

class Pet {
    constructor(tutor, namePet, specie, photograph, Birthday, age,month, dateNoFormated) {
        this.tutor = tutor;
        this.namePet = namePet;
        this.specie = specie;
        this.photograph = photograph;
        this.Birthday = Birthday;
        this.age = age;
        this.month = month;
        this.dateNoFormated = dateNoFormated;
       this.id = this.ContId();
       this.favorite = false;
    }
    ContId() {
        idj++
        return idj
    }

}

function composePet() {
    let tutor = document.getElementById("tutorInput").value
    let namePet = document.getElementById("namePet-Input").value
    let specie = document.getElementById("species-Input").value
    let photograph = document.getElementById("Photograph-Input").value
    let Birthday = document.getElementById("Birthday-Input").value

    const originalDate = Birthday;
    const dateComponents = originalDate.split("-");
    const invertedDate = `${dateComponents[2]}/${dateComponents[1]}/${dateComponents[0]}`;

    let today = new Date();
    let birthdate = new Date(Birthday);
    let age = today.getFullYear() - birthdate.getFullYear();
    let month = today.getMonth() - birthdate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }





    const NewPet = new Pet(tutor, namePet, specie, photograph, invertedDate, age,month, Birthday, pet.ContId(), pet.favorite);
    petList.Add(NewPet);
}

class PetList {
    constructor() {
        this.petArrey = [];
    }
    Add(parameter) {
        this.petArrey.push(parameter);
    }
    remove(id) {
        const index = this.petArrey.findIndex(pet => pet.id === id);
        if (index !== -1) {
            this.petArrey.splice(index, 1);
        }
    }
    editPet(id) {
        const index = this.petArrey.findIndex(pet => pet.id === id);
        const TutorInput = document.getElementById('tutorInput');
        const newTutor = TutorInput.value.trim();
        const namePetInput = document.getElementById('namePet-Input');
        const newNamePet = namePetInput.value.trim();
        const specieInput = document.getElementById('species-Input');
        const newSpecie = specieInput.value.trim();
        const photographInput = document.getElementById('Photograph-Input');
        const newPhotograph = photographInput.value.trim();
        const BirthdayInput = document.getElementById('Birthday-Input');
        const newBirthday = BirthdayInput.value.trim();

        if (index !== -1 && newText !== '') {
            this.petArrey[index].tutor = newTutor;
            this.petArrey[index].namePet = newNamePet;
            this.petArrey[index].specie = newSpecie;
            this.petArrey[index].photograph = newPhotograph;
            this.petArrey[index].Birthday = newBirthday;
            listHTML();
        }
    }
    changeInputsEdit(id){
        const pet = this.petArrey.find(pet => pet.id == id);
        
            document.getElementById('tutorInput').value = pet.tutor;
            document.getElementById('namePet-Input').value = pet.namePet;
            document.getElementById('species-Input').value = pet.specie;
            document.getElementById('Birthday-Input').value = pet.dateNoFormated;
            document.getElementById('Photograph-Input').value = pet.photograph;
        
    }
}


const petList = new PetList();

function RegisterPet() {
    isAnyInputEmpty();
    isURLValid();
    pet.ContId();
    if (!isAnyInputEmpty() && isURLValid()) {
        composePet();
        InputsClund();

    }
    listHTML();
}

function isAnyInputEmpty() {
    let tutor = document.getElementById("tutorInput").value
    let namePet = document.getElementById("namePet-Input").value
    let specie = document.getElementById("species-Input").value
    let photograph = document.getElementById("Photograph-Input").value
    let Birthday = document.getElementById("Birthday-Input").value

    if (tutor == "" || namePet == "" || specie == "" || photograph == "" || Birthday == "") {
        sendMsg("Preencha todos os campos!", "error")
        return true
    } else {
        sendMsg("Cadastrado com sucesso", "correct")
        return false
    }
}

function sendMsg(msg, type) {
    let msgDiv = document.getElementById("text");
    msgDiv.innerHTML = '';

    let msgToScreen = `<p class="${type}"> ${msg} </p>`

    msgDiv.innerHTML = msgToScreen;
    setTimeout(function () {
        msgDiv.innerHTML = `<p class="${type}"></p>`;
    }, 3000);

}

function InputsClund() {
    document.getElementById("tutorInput").value = "";
    document.getElementById("namePet-Input").value = "";
    document.getElementById("species-Input").value = "";
    document.getElementById("Photograph-Input").value = "";
    document.getElementById("Birthday-Input").value = "";
}

function isURLValid() {
    const url = document.getElementById("Photograph-Input").value;

    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return true;
    } else {
        sendMsg("A url da imagem está errada!", "error")
        return false;
    }
}

function ShowRegister() {
    document.getElementById("main1").classList.remove("hidden")
    document.getElementById("main2").classList.add("hidden")
}
function ShowPets() {
    if (petList.petArrey.length > 0) {
        document.getElementById("main2").classList.remove("hidden")
    document.getElementById("main1").classList.add("hidden")
    }
    
}

function listHTML() {

    const listHTML = document.getElementById("listPets");
    let array = petList.petArrey;

    array.forEach(pet => {
        const petDiv = `<div class="petDetail" id="div${pet.id}">
        <img src="${pet.photograph}" alt="${pet.namePet}">
        <button style="background-color: #ffffff;"><i class="fa-solid fa-heart heardNone" id="fav${pet.id}" onclick="Favorited(${pet.id})"></i></button>
        <div class="flex"><p><b>Tutor: </b></p><p id="TutorP${pet.id}"> ${pet.tutor}</p></div>
        <div class="flex"><p><b>Nome do pet:</b> </p><p id="NamePetP${pet.id}"> ${pet.namePet}</p></div>
        <div class="flex"><p><b>Espécie:</b></p><p id="SpecieP${pet.id}"> ${pet.specie}</p></div>
        <div class="flex"><p><b>Nascimento:</b></p><p id="BirthdayP${pet.id}"> ${pet.Birthday}</p></div>
        <p><b>Idade:</b> ${pet.age} anos e ${pet.month} meses</p>
        <p style="display: none;" id="PhotographP${pet.id}">${pet.photograph}</p>
        <div id="petButtons">
            <button onclick="deletePet(${pet.id})">Delete</button>
            <button onclick="changeButton(${pet.id})">Editar</button>
        </div>`;
        listHTML.innerHTML += petDiv;
    })



}


const pet = new Pet();

function deletePet(id) {
    document.getElementById("div" + id).classList.add("hidden")
    petList.remove(id);
}

function editTask(id) {
   document.getElementById("div" + id).classList.add("hidden")
   petList.editTask(id);
   ShowPets();
   document.getElementById("edit").innerHTML = '<button onclick="RegisterPet()" id="add">Cadastrar</button>';
   
}

function changeButton(id) {
    ShowRegister();
    petList.changeInputsEdit(id)
    document.getElementById("add").innerHTML = '<button class="bnts1" onclick="editTask('+id+')" id="edit">Editar</button>';
    petList.remove(id);
}

function Favorited(id) {
    const pet = petList.petArrey.find(pet => pet.id == id);

    if (pet.favorite == false) {
        pet.favorite = true;
        document.getElementById("fav" + id).classList.add("heardRed")
        document.getElementById("fav" + id).classList.remove("heardNone")
        favortedHTML(id);

    }else{
        pet.favorite = false;
        document.getElementById("fav" + id).classList.remove("heardRed")
        document.getElementById("fav" + id).classList.add("heardNone")
    }

    
}

function favortedHTML(id) {
    const pet = this.petArrey.find(pet => pet.id == id);

    const listHTML = document.getElementById("favoritedsDiv");
    listHTML.innerHTML = '';

    
        const petDiv = `<div class="petDetail" id="div${pet.id}">
        <img src="${pet.photograph}" alt="${pet.namePet}">
        <button style="background-color: #ffffff;"><i class="fa-solid fa-heart heardNone" id="fav${pet.id}" onclick="Favorited(${pet.id})"></i></button>
        <div class="flex"><p><b>Tutor: </b></p><p id="TutorP${pet.id}"> ${pet.tutor}</p></div>
        <div class="flex"><p><b>Nome do pet:</b> </p><p id="NamePetP${pet.id}"> ${pet.namePet}</p></div>
        <div class="flex"><p><b>Espécie:</b></p><p id="SpecieP${pet.id}"> ${pet.specie}</p></div>
        <div class="flex"><p><b>Nascimento:</b></p><p id="BirthdayP${pet.id}"> ${pet.Birthday}</p></div>
        <p><b>Idade:</b> ${pet.age} anos e ${pet.month} meses</p>
        <p style="display: none;" id="PhotographP${pet.id}">${pet.photograph}</p>
        <div id="petButtons">
            <button onclick="deletePet(${pet.id})">Delete</button>
            <button onclick="changeButton(${pet.id})">Editar</button>
        </div>`;
        listHTML.innerHTML += petDiv;
    



}