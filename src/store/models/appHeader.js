export const header = {
    state: { isShowing: true },
    reducers: {
      setIsShowing(state, payload) {
        return { ...state, isShowing: payload };
      },
    },
  };