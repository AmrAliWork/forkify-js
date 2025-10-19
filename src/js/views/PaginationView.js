import View from './View.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _CurrPage;
  _parentElement = document.querySelector('.pagination');
  _generatMarkup() {
    this._CurrPage = this._data.page;
    const NumPages = Math.ceil(
      this._data.reuslt.length / this._data.resultPerPage
    );
    // page 1 and there are other NumPages
    if (this._CurrPage === 1 && NumPages > 1)
      return ` ${this._generatMarkupBtn('next')}`;

    // last page
    if (this._CurrPage === NumPages && NumPages > 1)
      return `${this._generatMarkupBtn('prev')}`;

    // other page
    if (this._CurrPage < NumPages)
      return `${this._generatMarkupBtn('next')} ${this._generatMarkupBtn(
        'prev'
      )}`;

    // page 1 and there are no  other NumPages
    return ``;
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generatMarkupBtn(btn) {
    return `
    <button data-goto=${
      btn === 'prev' ? this._CurrPage - 1 : this._CurrPage + 1
    } class="btn--inline pagination__btn--${btn}">
      ${
        btn === 'prev'
          ? `<svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
             </svg>
             <span>Page ${this._CurrPage - 1}</span>`
          : `<span>Page ${this._CurrPage + 1}</span>
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
             </svg>`
      }
    </button>
  `;
  }
}

export default new PaginationView();
