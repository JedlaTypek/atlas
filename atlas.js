year.innerText = new Date().getFullYear();

fetch('https://restcountries.com/v3.1/region/europe')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach(stat => {
            let countryCard = `
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">      
                <div class="card h-100">     
                    <a href="#" data-bs-toggle="modal" data-bs-target="#${stat.cca2}Modal">    
                    <img class="card-img-top p-3" src="${stat.flags.png}" alt="${stat.flags.alt}">
                    <div class="card-body">
                        <h4 class="card-title">${stat.translations.ces.common}</h4>
                        </a>
                        <p class="card-text">
                            Počet obyvatel: ${stat.population}<br>
                            Rozloha: ${stat.area} km<sup>2</sup>
                        </p>
                    </div>
                </div>
            </div>`;
            let modal = `
            <div class="modal fade" id="${stat.cca2}Modal" tabindex="-1" role="dialog" aria-labelledby="${stat.cca2}ModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${stat.cca2}ModalTitle">${stat.translations.ces.common}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img class="card-img-top p-3" src="${stat.flags.png}" alt="${stat.flags.alt}">
                    <img class="card-img-top p-3" src="${stat.coatOfArms.png}">
                    <p><b>Oficiální název:</b> ${stat.name.official}</p>
                    <p><b>Měna:</b> ${Object.values(stat.currencies).map(c => c.name)} (${Object.values(stat.currencies).map(c => c.symbol)})</p>
                </div>
                </div>
            </div>
            </div>
            `;
            staty.innerHTML += countryCard + modal;
        });
        
        // Inicializujeme modální dialogy
        var modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            new bootstrap.Modal(modal);
        });
    });