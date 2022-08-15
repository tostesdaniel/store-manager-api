const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");

describe("Testa salesModel", () => {
  describe("Ao cadastrar uma venda", () => {
    before(async () =>
      sinon.stub(connection, "execute").resolves([{ insertId: 3 }])
    );

    after(async () => connection.execute.restore());
    
    it("Verifica se é retornado o id da venda ao criar uma venda em sales", async () => {
      const response = await salesModel.create();

      expect(response).to.be.equal(3);
    });

    it("Verifica se é retornado true ao criar uma venda em sales_products", async () => {
      const response = await salesModel.createLink(3, 1, 1);

      expect(response).to.equal(true);
    });
  });
});
