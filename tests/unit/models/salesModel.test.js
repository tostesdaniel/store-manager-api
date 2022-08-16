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

  describe("Ao listar vendas", () => {
    const allSalesResponse = [
      {
        sale_id: 1,
        date: "2022-08-16T00:06:39.000Z",
        product_id: 1,
        quantity: 5,
      },
      {
        sale_id: 1,
        date: "2022-08-16T00:06:39.000Z",
        product_id: 2,
        quantity: 10,
      },
      {
        sale_id: 2,
        date: "2022-08-16T00:06:39.000Z",
        product_id: 3,
        quantity: 15,
      },
    ];
    describe("Ao listar todas as vendas", () => {
      before(async () =>
        sinon.stub(connection, "execute").resolves([allSalesResponse])
      );

      after(async () => connection.execute.restore());

      it("Verifica se é possível listar todas as vendas com sucesso", async () => {
        const response = await salesModel.get();

        expect(response).to.be.deep.equal(allSalesResponse);
      });
    });

    describe("Ao listar uma venda", () => {
      before(async () =>
        sinon.stub(connection, "execute").resolves([allSalesResponse.slice(-1)])
      );

      after(async () => connection.execute.restore());

      it("Verifica se é possível listar a venda com sucesso", async () => {
        const response = await salesModel.getById(2);

        expect(response).to.be.deep.equal([allSalesResponse[2]]);
      });
    });
  });
});
