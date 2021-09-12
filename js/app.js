const loadData = () => {
    const url = `https://api.covid19api.com/summary`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAll(data));
}

loadData();

const displayAll = (data) => {
    // console.log(data);
    const worldDeatils = document.getElementById('world-details');
    worldDeatils.innerHTML = `
    <p>মোট আক্রান্ত <br> <br> ${data.Global.TotalConfirmed}</p>
    <p>মোট মৃত্যু <br> <br> ${data.Global.TotalDeaths}</p>
    <p>নতুন আক্রান্ত <br> <br> ${data.Global.NewConfirmed}</p>
    `
};

const loadDataCountries = () => {
    const url = `https://api.covid19api.com/summary`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountry(data.Countries));
}

const displayCountry = (data) => {
    let inputField = document.getElementById('input').value;
    data.forEach(country => {
        const countryDetails = document.getElementById('country-details');

        if (inputField.toLowerCase() === country.Slug) {
            const singleCountry = document.getElementById('a-country');
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${country.Country}</h5>
                <p>তারিখ : ${new Date(country.Date).toLocaleDateString('bn-BD')}</p>
                        <p>মোট আক্রান্ত : ${country.TotalConfirmed}</p>
                        <p>মোট মৃত্যু : ${country.TotalDeaths}</p>            
                        <p>নতুন আক্রান্ত : ${country.NewConfirmed}</p>
                        <p>নতুন মৃত্যু : ${country.NewDeaths}</p>
            </div>
            `;
            singleCountry.appendChild(div);
        }
        const div = document.createElement('div');
        // console.log(country)
        div.innerHTML = `
        <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${country.Country}</h5>
                        <p>তারিখ <br> ${new Date(country.Date).toLocaleDateString('bn-BD')}</p>
                        <p>মোট আক্রান্ত <br> ${country.TotalConfirmed}</p>
                        <p>মোট মৃত্যু <br> ${country.TotalDeaths}</p>            
                        <p>নতুন আক্রান্ত <br> ${country.NewConfirmed}</p>
                        <p>নতুন মৃত্যু <br> ${country.NewDeaths}</p>
                    </div>
                </div>
            </div>
        `
        countryDetails.appendChild(div);
    })
}

loadDataCountries();