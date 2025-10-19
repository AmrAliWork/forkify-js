import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultView from './views/resultView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import PaginationView from './views/PaginationView.js';
import recipeView from './views/recipeView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

if (module.hot) module.hot.accept();

/////////////////////////////

// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();
    //0 update result
    ResultView.update(model.ResultPerPage());
    bookmarkView.update(model.state.bookmarks);
    // 1 load recipe
    await model.loadRecipe(id);
    // 2 render recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError(err);
  }
};
const controlSearchResult = async function () {
  try {
    ResultView.renderSpinner();
    //1:get query and clear input
    const query = SearchView.getQuery();
    if (!query) return;
    //2: load serach result
    await model.loadSerachResult(query);

    //3:render result
    ResultView.render(model.ResultPerPage());
    //4: render initial pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {}
};
const controlPagination = function (page) {
  ResultView.render(model.ResultPerPage(page));
  PaginationView.render(model.state.search);
};
const controlUpdateServings = function (newServing) {
  model.UpdateServings(newServing);
  RecipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  //1 add/delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2 update recipeview
  recipeView.update(model.state.recipe);
  //3 render bookmark
  bookmarkView.render(model.state.bookmarks);
};
const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (NewRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(NewRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarkView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  RecipeView.addHandlerRnder(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlUpdateServings);
  RecipeView.addHandlerBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResult);
  PaginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
