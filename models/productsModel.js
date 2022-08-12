const connection = require('./connection');

const productsModel = {
  getProducts: async () => {
    const query = 'SELECT id, name FROM StoreManager.products;';
    const [products] = await connection.execute(query);

    return products;
  },
  getProductById: async (id) => {
    const query = 'SELECT id, name FROM StoreManager.products WHERE id = ?;';
    const [products] = await connection.execute(query, [id]);

    return products;
  },
  create: async ({ name }) => {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [products] = await connection.execute(query, [name]);

    const { insertId: id } = products[0];

    return {
      id,
      name,
    };
  },
};

module.exports = productsModel;
