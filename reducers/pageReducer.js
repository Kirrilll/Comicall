export const pageReducer = (state, action) => {
  const { page, pages } = state;
  switch (action.type) {
    case "next":
      if (page + 1 < pages) {
        return { ...state, page: page + 1, animated: action.payload };
      }
      return { ...state, page: page };
    case "back":
      if (page - 1 >= 0){
          return { ...state, page: page - 1, animated: action.payload };
      } 
      return { ...state, page: page};
    default:
      return { ...state, page: page };
  }
};