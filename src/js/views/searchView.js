import {elements} from './base.js';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () =>{
    elements.searchResList.innerHTML = "";
}

//Default parameter a ser usado caso nenhum parametro seja passado
const limitRecipeTitle = (title, limit = 17) =>{

    if (title.length > limit) {
        let newTitle = `${title.substring(0, limit)} ...`
        return newTitle;
    }
    return title;
    
};

const renderRecipe = recipe => {

    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `
    elements.searchResList.insertAdjacentHTML("beforeend", markup);

}
export const renderResults = recipes =>{
    //The current element is passed to the renderRecipe function
    recipes.forEach(renderRecipe);
}