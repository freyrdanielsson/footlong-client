import { HIGHLIGHTS_REQUEST,
    HIGHLIGHTS_ERROR,
    HIGHLIGHTS_SUCCESS,
} from '../actions/highlights';



const initialState = {
  isFetching: false,
  highlights: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HIGHLIGHTS_REQUEST:    
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case HIGHLIGHTS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        highlights: action.highlights,
      };
    case HIGHLIGHTS_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
      };
    default:
      return state;
  }
};