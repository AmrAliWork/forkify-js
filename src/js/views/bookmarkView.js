import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmark yet , find a nice recipe and bookmark it ;)';
  _message = '';
  _generatMarkup() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarkView();
