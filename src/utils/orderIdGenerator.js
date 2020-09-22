const random = () => {
    return Math.round(1 + Math.random() * (36 - 1));
};

export default () => {
    const data = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let id = '';

    for (let i = 0; i < 5; i++) {
        id += data[random()];
    }

    return id;
};


