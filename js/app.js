const inputText = document.getElementById('input');
const inputButton = document.getElementById('button')
const singleCountry = document.getElementById('country');
const countryDetails = document.getElementById('country-details')
const url = `https://api.covid19api.com/summary`;
const worldDeatils = document.getElementById('world-details');

// suggestion country
const sugCountry = document.getElementById('sug-country')

const suggestedCountry = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => displaySugCountry(data.Countries));
}
const displaySugCountry = (data) => {
    data.forEach(country => {
        console.log(country);
        const option = document.createElement('option');
        option.innerText = country.Country;
        sugCountry.appendChild(option);
    })
}
suggestedCountry();

inputText.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            inputButton.click();
        }
    })
    // world statistic 
const loadData = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayAll(data));
}

loadData();
const displayAll = (data) => {
    worldDeatils.innerHTML = `
    <p>মোট আক্রান্ত <br> <br> ${data.Global.TotalConfirmed}</p>
    <p>মোট মৃত্যু <br> <br> ${data.Global.TotalDeaths}</p>
    <p>নতুন আক্রান্ত <br> <br> ${data.Global.NewConfirmed}</p>
    `
};

// showing single country in ui 
const loadDataCountries = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountry(data.Countries));
}

const displayCountry = (data) => {
    const inputField = inputText.value;
    inputText.value = "";
    data.forEach(country => {
        if (inputField === '') {
            document.getElementById('exampleModalLabel').innerHTML =
                `<h2 class ='text-white'>Please Enter a Country Name</h2>`;
            singleCountry.innerHTML = `
             <p class="text-white">Hey man!! put valid data</p>
             `
            return;
        } else if (inputField.toLowerCase() === country.Slug) {
            singleCountry.textContent = "";
            document.getElementById('exampleModalLabel').innerHTML =
                `<h2 class ='text-white'>${country.Country.toUpperCase()}</h2>`
                // console.log(country);
            singleCountry.innerHTML = `
            <div class = 'text-white'>
                <p>তারিখ : ${new Date(country.Date).toLocaleDateString('bn-BD')}</p>
                        <p>মোট আক্রান্ত : ${country.TotalConfirmed}</p>
                        <p>মোট মৃত্যু : ${country.TotalDeaths}</p>            
                        <p>নতুন আক্রান্ত : ${country.NewConfirmed}</p>
                        <p>নতুন মৃত্যু : ${country.NewDeaths}</p>
            </div>
            `;
        }
    });

}


// showing all country in ui 
const allCountry = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllCountry(data.Countries));
}

const displayAllCountry = (data) => {
    // spinner
    data.forEach(countries => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
                <div class="card full-card">
                    <div class="card-body">
                        <h5 class="card-title">${countries.Country.toUpperCase()}</h5>
                        <p>তারিখ <br> ${new Date(countries.Date).toLocaleDateString('bn-BD')}</p>
                        <p>মোট আক্রান্ত <br> ${countries.TotalConfirmed}</p>
                        <p>মোট মৃত্যু <br> ${countries.TotalDeaths}</p>            
                        <p>নতুন আক্রান্ত <br> ${countries.NewConfirmed}</p>
                        <p>নতুন মৃত্যু <br> ${countries.NewDeaths}</p>
                    </div>
                </div>
            </div>
        `;
        countryDetails.appendChild(div);
    })
}
allCountry();