const sinon = require("sinon");
const { expect } = require("chai");
// const productsController = require("../../../controllers/productsController");
// const productsService = require("../../../controllers/productsController");

const productsController = {
  getProducts: () => {},
  getProductById: () => {},
};

describe("Testa productsController", () => {
  const allProducts = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  describe("Ao listar todos os produtos", () => {
    const req = {};
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it("Verifica se o método status é chamado com código 200", async () => {
      await productsController.getProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it("Verifica se o método json é chamado com um array", async () => {
      await productsController.getProducts(req, res);

      expect(res.json.calledWith(allProducts)).to.be.true;
    });
  });

  describe("Ao listar um produto por ID", () => {
    const req = {};
    const res = {};

    describe("Caso o produto não exista", () => {
      const notFoundError = {
        code: 404,
        message: "Product not found",
      };

      it("Verifica se o método status é chamado com código 404", async () => {
        await productsController.getProductById(req, res);

        expect(res.status.calledWith(notFoundError.code)).to.be.true;
      });

      it("Verifica se o método json é chamado com um objeto de erro", async () => {
        await productsController.getProductById(req, res);

        expect(res.json.calledWith({ message: notFoundError.message }));
      });
    });

    describe("Caso o produto exista", () => {
      const goodResponse = {
        code: 200,
        message: allProducts[0],
      };

      it("Verifica se o método status é chamado com código 200", async () => {
        await productsController.getProductById(req, res);

        expect(res.status.calledWith(goodResponse.code)).to.be.true;
      });

      it("Verifica se o método json é chamado com um array contendo o objeto do produto", async () => {
        await productsController.getProductById(req, res);

        expect(res.json.calledWith({ message: goodResponse.message })).to.be
          .true;
      });
    });
  });
});
