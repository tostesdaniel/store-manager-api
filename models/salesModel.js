const connection = require('./connection');

const salesModel = {
  create: async () => {
    const query = 'INSERT INTO StoreManager.sales () VALUES ();';
    const [{ insertId: id }] = await connection.execute(query);

    return id;
  },
  createLink: async (saleId, productId, quantity) => {
    const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?);`;

    await connection.execute(query, [saleId, productId, quantity]);

    return true;
  },
};

module.exports = salesModel;
