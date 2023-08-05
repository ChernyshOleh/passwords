import React, { createContext, useReducer } from "react";

const asyncReduser = (state, action) => {
  switch (action.type) {
    case "aaa":
      return { ...state, user: "aaa" };
    default:
      return state;
  }
};
export const AsyncContext = createContext();
export const LoadingContext = ({ children }) => {
  const initialState = { user: "user!!!" };

  const [state, dispatch] = useReducer(asyncReduser, initialState);
  const userFromAsync = () => dispatch({ type: "aaa" });

  return (
    <AsyncContext.Provider value={{ user: state.user, userFromAsync }}>
      {children}
    </AsyncContext.Provider>
  );
};
