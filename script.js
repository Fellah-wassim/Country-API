'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);
//     const html = `
//     <article class="country">
//             <img class="country__img" src='${data.flags.png}'/>
//             <div class="country__data">
//               <h3 class="country__name">${data.altSpellings[0]}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)}M people</p>
//               <p class="country__row"><span>🗣️</span>${
//                 Object.values(data.languages)[0]
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 Object.values(data.currencies)[0].name
//               }</p>
//             </div>
//           </article>
//     `;
//     let htmlObject = document.createElement('div');
//     htmlObject.innerHTML = html;
//     countriesContainer.insertAdjacentElement('afterbegin', htmlObject);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src='${data.flags.png}'/>
            <div class="country__data">
              <h3 class="country__name">${data.altSpellings[0]}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}M people</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
            </div>
          </article>
    `;
  let htmlObject = document.createElement('div');
  htmlObject.innerHTML = html;
  countriesContainer.insertAdjacentElement('afterbegin', htmlObject);
  countriesContainer.style.opacity = 1;
};

// const getCountryNeighbor = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://restcountries.com/v3.1/name/${country}?fullText=true`
//   );
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(request.responseText);
//     renderCountry(data);
//     const [neighbor] = data.borders;
//     if (!neighbor) return;
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${neighbor}?fullText=true`
//     );
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(request2.responseText);
//       renderCountry(data2, 'neighbor');
//     });
//   });
// };
// getCountryNeighbor('algeria');

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders;
      if (!neighbor) return;
      console.log(neighbor[0]);
      return fetch(
        `https://restcountries.com/v3.1/alpha/${neighbor[0]}?fullText=true`
      );
    })
    .then(response => response.json())
    .then(neighborData => {
      renderCountry(...neighborData, 'neighbor');
    });
};

getCountryData('germany');
