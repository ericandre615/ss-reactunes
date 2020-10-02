export const transformKey = fetchKey => fetchKey.toUpperCase().replace(/\s/g, '_');
export const getRequestActionType = fetchKey => `FETCH_${transformKey(fetchKey)}_REQUEST`;
export const getSuccessActionType = fetchKey => `FETCH_${transformKey(fetchKey)}_SUCCESS`;
export const getFailureActionType = fetchKey => `FETCH_${transformKey(fetchKey)}_FAILURE`;
export const getRequestActionTypes = (fetchKey) => {
  const key = transformKey(fetchKey);

  return {
    request: `FETCH_${key}_REQUEST`,
    success: `FETCH_${key}_SUCCESS`,
    failure: `FETCH_${key}_FAILURE`,
  };
};

export default {
  getRequestActionType,
  getSuccessActionType,
  getFailureActionType,
  getRequestActionTypes,
};
