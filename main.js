const header = document.querySelector("div.profile-main-container div.resume");
const titleHeader = document.querySelector("div.profile-main-container div.resume h3");
const sectionCourses = document.querySelector("div div.courses-main-container");
const sectionJobs = document.querySelector("div div.jobs-main-container");
async function obtenerData(){
    const datos = await fetch("https://cache1.phantombooster.com/pzuhC3LNq4M/IdxH8QXujr7vApwc6HP4qQ/result.json");
    const datosJson = datos.json();
    return datosJson;
}
function populateHeader(jsonObj) {
    const general = jsonObj[0]["general"];
    titleHeader.textContent = "Hola, Mi nombre es " + general.fullName;

    const myresume = document.createElement("p");
    myresume.textContent = general.description;
    header.appendChild(myresume);
}
function showlicences(jsonObj) {
    const licences = jsonObj[0]["licences"];
    for (let i = 0; i < licences.length; i++) {
        const myArticle = document.createElement("article");
        myArticle.className += "courses-container";
        const myh3 = document.createElement("h6");
        const mylink = document.createElement("a");
        myh3.textContent = licences[i].name;
        mylink.textContent = "Ver certificado";
        mylink.className += "blogs-button";
        mylink.href = licences[i].credentialUrl;
        mylink.target = "_blank";
        myArticle.appendChild(myh3);
        myArticle.appendChild(mylink);

        sectionCourses.appendChild(myArticle);
    }
}
function showJobs(jsonObj){
    const jobs = jsonObj[0]["jobs"];
    for (let i = 0; i < jobs.length; i++) {
        const myArticle = document.createElement("article");
        myArticle.className += "jobs-container";
        const myH4 = document.createElement("h5");
        const fecha = document.createElement("em");
        const salto = document.createElement("br");
        const description = document.createElement("span");
        if (jobs[i].jobTitle===null) {
            myH4.textContent = jobs[i].companyName;
        }else{
            myH4.textContent = jobs[i].jobTitle + " en " + jobs[i].companyName;    
        }
        fecha.textContent = jobs[i].dateRange;
        const descriptionText = jobs[i].description;
        const descriptionTextFinal = descriptionText;
        description.textContent = descriptionTextFinal;
        myArticle.appendChild(myH4);
        myArticle.appendChild(fecha);
        myArticle.appendChild(salto);
        myArticle.appendChild(description);
        sectionJobs.appendChild(myArticle);


    }
}
obtenerData().then(populateHeader);
obtenerData().then(showlicences);
obtenerData().then(showJobs);
