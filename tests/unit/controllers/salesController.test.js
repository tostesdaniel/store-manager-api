// const sinon = require("sinon");
const { expect } = require("chai");
// const salesService = require("../../../controllers/salesController");
// const salesController = require("../../../controllers/salesController");

describe("Testa salesController", () => {
  describe("Ao cadastrar uma venda", () => {
    const noProductIdSaleBody = [{ productId: 1999, quantity: 9 }];
    const goodSaleBody = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ];
    const notFoundResponse = { message: "Product not found|404" };

    const salesController = {
      create: () => {},
    };

    describe("Caso o produto não exista no banco de dados", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = [...noProductIdSaleBody];
        res.status = res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
      });

      it("Verifica se next é chamado com objeto de erro", async () => {
        await salesController.create(req, res, next);

        expect(next.calledWith(notFoundResponse)).to.be.true;
      });
    });

    describe("Caso o produto exista no banco de dados", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = [...goodSaleBody];
        res.status = res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
      });

      it("Verifica se status é chamado com status 201", async () => {
        await salesController.create(req, res, next);

        expect(res.status.calledWith(201)).to.be.true;
      });

      it("Verifica se json é chamado com os detalhes da inserção", async () => {
        await salesController.create(req, res, next);

        expect(res.json.calledWith({ id: 3, itemsSold: goodSaleBody })).to.be
          .true;
      });
    });
  });
});
