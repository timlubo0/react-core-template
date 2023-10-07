const storagePrototype = {
  getItem: function (key: string) {
    return localStorageMock[key] || null;
  },
  setItem: function (key: string, value: any) {
    localStorageMock[key] = value.toString();
  },
  removeItem: function (key: string) {
    delete localStorageMock[key];
  },
  clear: function (fakeLocalStorage: any) {
    Object.keys(fakeLocalStorage).forEach(
      (key) => delete localStorageMock[key]
    );
  },
};

export const localStorageMock = Object.create(storagePrototype);
