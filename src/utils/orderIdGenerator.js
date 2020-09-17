const random = () => {
    return Math.round(1 + Math.random() * (61 - 1));
};

export default () => {
    const data = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz";

    let id = '';

    for (let i = 0; i < 10; i++) {
        id += data[random()];
    }

    return id;
};


