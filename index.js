"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getPopulation = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('./data.json');
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
});
const createGroupCards = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getPopulation();
    const population = data === null || data === void 0 ? void 0 : data.data;
    const groupContainer = document.getElementById('population-container');
    const groupCards = population === null || population === void 0 ? void 0 : population.map((group) => {
        const groupCard = document.createElement('div');
        groupCard.classList.add('group-container');
        groupCard.innerHTML = `
      <div class="group-header">
        <p class="group-value">${group.total}</p>
        <p class="group-label">${group.group}</p>
      </div>
      <div class="group-content">
        <h2 class="group-title">By country</h2>
        <div class="sub-group-container">
          ${group.countries.map((country) => {
            return `
              <div class="sub-item" style="background-color: ${group.secondary_color}">
                <p class="sub-item-value" style="background-color: ${group.primary_color}">${country.value}</p>
                <p class="sub-item-label" style="color: ${group.primary_color}">${country.name}</p>
              </div>
            `;
        }).join('')}
        </div>
      </div>
    `;
        return groupCard;
    });
    groupContainer === null || groupContainer === void 0 ? void 0 : groupContainer.append(...groupCards);
});
createGroupCards();
