const connection = require('./connection');
const helper = require('../utils/salesHelper');

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
    StoreManager.sales AS s ON sp.sale_id = s.id
    ORDER BY sale_id, product_id;`;
    const [sales] = await connection.execute(query);

    const formattedSales = helper.formatAllSales(sales);

    return formattedSales;
  },
  getById: async (id) => {
    const query = `SELECT sale_id, date, product_id, quantity FROM
    StoreManager.sales_products AS sp INNER JOIN
    StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE sale_id = ? ORDER BY sale_id, product_id;`;

    const [sales] = await connection.execute(query, [id]);

    if (!sales.length) return sales;

    const formattedSales = helper.formatSingleSale(sales);

    return formattedSales;
  },
  delete: async (id) => {
    const query = 'DELETE FROM StoreManager.sales WHERE id = ?;';

    await connection.execute(query, [id]);

    return true;
  },
  update: async (id, { productId, quantity }) => {
    const query = ` UPDATE StoreManager.sales_products 
    SET quantity = ? WHERE sale_id = ? AND product_id = ?;`;

    await connection.execute(query, [quantity, id, productId]);

    return id;
  },
};

module.exports = salesModel;
