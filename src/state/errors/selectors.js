export const getError = key => state => ((state.errors) ? state.errors[key] : null);
