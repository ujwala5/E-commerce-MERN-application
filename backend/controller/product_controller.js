const products = [
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Smartphone", price: 25000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Shoes", price: 3000 },
];

const getData_controller = async (req, res) => {
    res.send({
        code: 200,
        message: "Successfully fetch",
        data: products
    })
}

module.exports = { getData_controller };