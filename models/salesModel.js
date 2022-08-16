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
  get: async () => {
    const query = `SELECT sale_id, date, product_id, quantity FROM 
    StoreManager.sales_products AS sp INNER JOIN
    StoreManager.sales AS s ON sp.sale_id = s.id;`;
    const [sales] = await connection.execute(query);

    return sales;
  },
  getById: async (saleId) => {
    const query = `SELECT sale_id, date, product_id, quantity FROM
    StoreManager.sales_products AS sp INNER JOIN
    StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE sale_id = ?;`;

    const [sale] = await connection.execute(query, [saleId]);

    return sale;
  },
};

salesModel.getById(2);

module.exports = salesModel;
