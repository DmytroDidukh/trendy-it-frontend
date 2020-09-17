export const clearLocalStorage = () => {
    const trendy = {
        wishlist: [],
        cart: []
    };
    localStorage.setItem('trendyIT', JSON.stringify(trendy));
};

if (!localStorage.getItem('trendyIT')) {
    clearLocalStorage();
}

export const getFromLocalStorage = (name) => {
    const localObject = JSON.parse(localStorage.getItem('trendyIT'));
    return localObject[name];
};

export const setToLocalStorage = (name, item) => {
    const localObject = JSON.parse(localStorage.getItem('trendyIT'));
    localObject[name] = item;
    localStorage.setItem('trendyIT', JSON.stringify(localObject));
};
