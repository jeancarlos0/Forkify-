import {elements} from './base.js';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () =>{
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

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

//Create the next and previous page button based on the parameters passed
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1: page + 1}>
        <span>Page ${type === 'prev' ? page - 1: page + 1}</span>    
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left': 'right'}"></use>
        </svg>
    </button>

`;

const renderButtons = (page, numberOfResults, resultsPerPage) =>{
    const pages = Math.ceil(numberOfResults / resultsPerPage);
    let button;
    if(page === 1 && pages > 1){
        //In this case we only needd a button to go to the next page 
        button = createButton(page, 'next');
    }else if(page < pages){
        //Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    }else if(page ===  pages && pages > 1){
        //Here we are in the last page, so we need a button to go back
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resultsPerPage = 10) =>{
    const start = (page - 1) * resultsPerPage;
    const end = resultsPerPage * page;
    /**
     * Rendering recipes per page
     * The current element is passed to the renderRecipe function
    */
    recipes.slice(start, end).forEach(renderRecipe);
    //Rendering page buttons
    renderButtons(page,recipes.length ,resultsPerPage);

}