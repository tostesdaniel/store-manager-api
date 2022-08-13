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
    const [{ insertId }] = await connection.execute(query, [name]);

    return { id: insertId, name };
  },
  update: async (id, { name }) => {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await connection.execute(query, [name, id]);

    const [updatedProduct] = await productsModel.getProductById(id);

    return updatedProduct;
  },
};

module.exports = productsModel;
