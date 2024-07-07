
interface IPopulationGroup {
  group: string;
  total: number;
  primary_color: string;
  secondary_color: string;
  countries: {
    name: string;
    value: number;
  }[];
}

const getPopulation = async () => {
  try {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const createGroupCards = async () => {

  const data = await getPopulation();
  const population = data?.data;

  const groupContainer = document.getElementById('population-container');
  const groupCards: HTMLElement[] = population?.map((group: IPopulationGroup) => {
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

  groupContainer?.append(...groupCards);
  
}

createGroupCards();