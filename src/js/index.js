import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
import {elements, renderLoader, clearLoader} from './views/base';

/**Global state
 * - Search object
 * - Current recipe
 * - Liked recipes
 * - shopping list object
*/

const state = {};

const controlSearch = async() =>{
    //1 - Get query from input
    //2 - Add new search to state
    //3 - Search for recipes
    //4 - Render results on the UI
    const query = searchView.getInput();
    console.log(query);

    if(query){
        state.search = new Search(query);

        renderLoader(elements.searchRes);
        //Clear the elements before insert the new data
            
        searchView.clearInput();

        searchView.clearResults();

        try {
             await state.search.getResults();
             clearLoader();
             searchView.renderResults(state.search.result);
            
        } catch (error) {
            alert("Sometrhing went wrong...");
            clearLoader();
        }

        

    }
};

elements.searchForm.addEventListener('submit', e => {
    //cancela oss comportamentos padrão do objeto
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/** RECIPE CONTROLLER */

const controlRecipe = async () => {

    //Pega apenas o hash da url e retira o simbolo de '#' da string
    const id = window.location.hash.replace('#', '');

    if(id){

        state.recipe = new Recipe(id);


        try {
            await state.recipe.getRecipe();

            state.recipe.calcTime();
            state.recipe.calcServings();
    
            console.log(state.recipe);   

        } catch (error) {
            alert('Ooooops, Something went wrong!');
            console.log(error);
        }

    }

}

//Ação disparada apenas quando a hash dda url muda

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

