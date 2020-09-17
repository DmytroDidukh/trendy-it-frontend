export const clearLocalStorage = () => {
    const shkaff = {
        wishlist: [],
        cart: [],
        currentCategory: null,
        currentSubcategory: null,

    };
    localStorage.setItem('shkaff', JSON.stringify(shkaff));
};

if (!localStorage.getItem('shkaff')) {
    clearLocalStorage();
}

export const getFromLocalStorage = (name) => {
    const localObject = JSON.parse(localStorage.getItem('shkaff'));
    return localObject[name];
};

export const setToLocalStorage = (name, item) => {
    const localObject = JSON.parse(localStorage.getItem('shkaff'));
    localObject[name] = item;
    localStorage.setItem('shkaff', JSON.stringify(localObject));
};
