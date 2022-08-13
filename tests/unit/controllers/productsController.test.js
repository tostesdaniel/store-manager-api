const sinon = require("sinon");
const { expect } = require("chai");
const productsController = require("../../../controllers/productsController");
const productsService = require("../../../services/productsService");

describe("Testa productsController", () => {
  const allProducts = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  describe("Ao listar todos os produtos", () => {
    const req = {};
    const res = {};

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, "getProducts").resolves(allProducts);
    });

    after(async () => productsService.getProducts.restore());

    it("Verifica se o método status é chamado com código 200", async () => {
      await productsController.getProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it("Verifica se o método json é chamado com um array contendo todos os produtos", async () => {
      await productsController.getProducts(req, res);

      expect(res.json.calledWith(allProducts)).to.be.true;
    });
  });

  describe("Ao listar um produto por ID", () => {
    describe("Caso o produto não exista", () => {
      const notFoundError = {
        code: 404,
        message: "Product not found",
      };

      const req = {};
      const res = {};

      before(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        req.params = { id: 103254987 };

        sinon
          .stub(productsService, "getProductById")
          .resolves({ error: notFoundError });
      });

      after(async () => productsService.getProductById.restore());

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

      const req = {};
      const res = {};

      before(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        req.params = { id: 1 };

        sinon.stub(productsService, "getProductById").resolves(allProducts[0]);
      });

      after(async () => productsService.getProductById.restore());

      it("Verifica se o método status é chamado com código 200", async () => {
        await productsController.getProductById(req, res);

        expect(res.status.calledWith(goodResponse.code)).to.be.true;
      });

      it("Verifica se o método json é chamado com um array contendo o objeto do produto", async () => {
        await productsController.getProductById(req, res);

        expect(res.json.calledWith(goodResponse.message)).to.be.true;
      });
    });
  });

  describe("Ao cadastrar um produto", () => {
    const rightResponse = { id: 4, name: "Product name" };
    const emptyBodyResponse = { message: '"name" is required|400' };
    const nameLengthResponse = {
      message: '"name" length must be at least 5 characters long|422',
    };

    describe("Caso não seja passado name no corpo da requisição", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon.stub(productsService, "create").resolves(emptyBodyResponse);
      });

      after(() => productsService.create.restore());

      it("Verifica se next é chamado com objeto de erro correto", async () => {
        await productsController.create(req, res, next);

        expect(next.calledWith(emptyBodyResponse)).to.be.true;
      });
    });

    describe("Caso name no corpo da requisição tenha menos de 5 caracteres", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = { name: "Gum" };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon.stub(productsService, "create").resolves(nameLengthResponse);
      });

      after(() => productsService.create.restore());

      it("Verifica se next é chamado com objeto de erro correto", async () => {
        await productsController.create(req, res, next);

        expect(next.calledWith(nameLengthResponse)).to.be.true;
      });
    });

    describe("Caso o corpo da requisição seja passado corretamente", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = { name: "Product name" };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon.stub(productsService, "create").resolves(rightResponse);
      });

      after(() => productsService.create.restore());

      it("Verifica se status é chamado com código 201", async () => {
        await productsController.create(req, res, next);

        expect(res.status.calledWith(201)).to.be.true;
      });

      it("Verifica se json é chamado com as informações da inserção", async () => {
        await productsController.create(req, res, next);

        expect(res.json.calledWith({ id: 4, name: "Product name" })).to.be.true;
      });
    });
  });

  describe("Ao atualizar um produto", () => {
    const service = {
      update: () => {},
    };

    describe("Caso o produto não exista no banco de dados", () => {
      const errorMessage = { message: "Product not found" };

      const req = {};
      const res = {};

      before(() => {
        req.body = { name: "Mjolnir" };
        req.params = { id: 4 };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, "update").resolves(errorMessage);
      });

      after(() => productsService.update.restore());

      it("Verifica se status é chamado com código 404", async () => {
        await productsController.update(req, res);

        expect(res.status.calledWith(404)).to.be.true;
      });

      it("Verifica se json é chamado com objeto de erro", async () => {
        await productsController.update(req, res);

        expect(res.json.calledWith(errorMessage));
      });
    });

    describe("Caso o produto exista no banco de dados", () => {
      const updatedProduct = { id: 1, name: "Mjolnir" };

      const req = {};
      const res = {};

      before(() => {
        req.body = { name: "Mjolnir" };
        req.params = { id: 1 };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, "update").resolves(updatedProduct);
      });

      after(() => productsService.update.restore());

      it("Verifica se status é chamado com código 200", async () => {
        await productsController.update(req, res);

        expect(res.status.calledWith(200)).to.be.true;
      });

      it("Verifica se json é chamado com as informações do produto", async () => {
        await productsController.update(req, res);

        expect(res.json.calledWith(updatedProduct));
      });
    });
  });
});
