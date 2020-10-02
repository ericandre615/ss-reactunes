export const getIsFetching = key => state => state.isFetching[key] || false;

export default {
  getIsFetching,
};
