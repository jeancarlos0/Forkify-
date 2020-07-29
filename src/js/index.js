import Search from './models/Search';
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

        await state.search.getResults();

        //Clear the elements before insert the new data
        
        searchView.clearInput();

        searchView.clearResults();

        clearLoader();

        searchView.renderResults(state.search.result);

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


