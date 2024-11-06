
const state = {
    user: {
        token: sessionStorage.getItem("TOKEN"),
        data: {},
        Products
    },
    products: {
        loading:false,
        data: []
    }
};

export default state();
