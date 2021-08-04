import { PAGEACTIONTYPES, GET_ALL_PAGES } from '../../types/pages.types';

const initialState = {
    pages: null,
    pagesLoading: false
}

const pagesReducer = (state = initialState, action : PAGEACTIONTYPES) => {
    let newState = state;
    switch (action.type) {
        case GET_ALL_PAGES:
          newState = {
            ...state,
            pages: action.pages,
            pagesLoading: action.pagesLoading,
          };
          break;
          default: break;
        }
    return newState;
}

export default pagesReducer;
