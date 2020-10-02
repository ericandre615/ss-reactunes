export const clearStorageState = () => {
  if ('sessionStorage' in window) {
    sessionStorage.clear();
  }
};

export const getStorageState = key => {
  if ('sessionStorage' in window) {
    const appStorage = sessionStorage.getItem(key);

    try {
      if (appStorage) {
        const parsedStorage = JSON.parse(appStorage);

        return parsedStorage;
      }
    } catch (err) {
      return {};
    }
  }

  return {};
};

export const setStorageState = (key, state) => {
  if ('sessionStorage' in window) {
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      // no-empty blocks
    }
  }
};

export const removeStorageState = key => {
  if ('sessionStorage' in window) {
    try {
      sessionStorage.removeItem(key);
    } catch (err) {
      // no-empty blocks
    }
  }

  return undefined;
};

export default {
  clearStorageState,
  getStorageState,
  setStorageState,
  removeStorageState,
};
