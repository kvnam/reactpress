import { PAGEACTIONTYPES } from '../../types/pages.types';

const initialState = {
    pages: null,
    pagesLoading: false
}

const pagesReducer = (state = initialState, actions : PAGEACTIONTYPES) => {
    return state;
}

export default pagesReducer;
