const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");

describe("Testa productsService", () => {
  const allProducts = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  describe("Ao listar todos os produtos", () => {
    before(async () =>
      sinon.stub(productsModel, "getProducts").resolves(allProducts)
    );

    after(async () => productsModel.getProducts.restore());

    it("Verifica se é retornado um array", async () => {
      const products = await productsService.getProducts();

      expect(products).to.be.an("array");
    });

    it("Verifica se são retornados todos os produtos", async () => {
      const products = await productsService.getProducts();

      expect(products).to.be.equal(allProducts);
    });
  });

  describe("Ao listar um produto por ID", () => {
    describe("Caso o produto não exista", () => {
      const notFoundError = {
        error: {
          code: 404,
          message: "Product not found",
        },
      };

      before(async () =>
        sinon.stub(productsModel, "getProductById").resolves([])
      );

      after(async () => productsModel.getProductById.restore());

      it("Verifica se é retornado um erro", async () => {
        const product = await productsService.getProductById(103254987);

        expect(product).to.be.deep.equal(notFoundError);
      });
    });

    describe("Caso o produto exista", () => {
      before(async () =>
        sinon.stub(productsModel, "getProductById").resolves([allProducts[0]])
      );

      after(async () => productsModel.getProductById.restore());

      it("Verifica se o retorno é um objeto contendo informações do produto", async () => {
        const product = await productsService.getProductById(1);

        expect(product).to.be.deep.equal(allProducts[0]);
      });

      it("Verifica se é retornado o produto buscado", async () => {
        const product = await productsService.getProductById(1);

        expect(product).to.be.deep.equal(allProducts[0]);
      });
    });
  });

  describe("Ao cadastrar um produto", () => {
    const newProduct = { id: 4, name: "Product name" };

    before(async () =>
      sinon.stub(productsModel, "create").resolves(newProduct)
    );

    after(async () => productsModel.create.restore());

    it("Verifica se retorna erro caso a requisição não contenha o nome do produto", async () => {
      const product = await productsService.create({});

      expect(product).to.be.deep.equal({ message: '"name" is required|400' });
    });

    it("Verifica se retorna erro caso a requisição contenha um nome com menos de 5 caracteres", async () => {
      const product = await productsService.create({ name: "Gum" });

      expect(product).to.be.deep.equal({
        message: '"name" length must be at least 5 characters long|422',
      });
    });

    it("Verifica se retorna os dados do produto cadastrado em caso de sucesso", async () => {
      const product = await productsService.create({ name: "Product name" });

      expect(product).to.be.equal(newProduct);
    });
  });

  describe("Ao atualizar um produto", () => {
    const updatedProduct = { id: 1, name: "Mjolnir" };

    describe("Caso o produto não exista no banco de dados", () => {
      const nonexistentProduct = { name: "Tesla" };

      before(async () =>
        sinon.stub(productsModel, "update").resolves(updatedProduct)
      );

      after(async () => productsModel.update.restore());

      it("Verifica que não é possível realizar a operação", async () => {
        const product = await productsService.update(4, nonexistentProduct);

        expect(product).to.be.deep.equal({ message: "Product not found|404" });
      });
    });

    describe("Caso o produto exista", () => {
      const productToUpdate = { name: "Martelo de Thor" };
      const updatedProduct = { id: 1, name: "Mjolnir" };

      before(async () =>
        sinon.stub(productsModel, "update").resolves(updatedProduct)
      );

      after(async () => productsModel.update.restore());

      it("Verifica se é retornado o produto atualizado", async () => {
        const product = await productsService.update(1, productToUpdate);

        expect(product).to.be.equal(updatedProduct);
      });
    });
  });

  describe("Ao deletar um produto", () => {
    const service = {
      delete: () => {},
    };

    it("Verifica se retorna erro ao deletar um produto inexistente", async () => {
      const deletion = service.delete(103254987);

      expect(deletion).to.be.equal({ message: "Product not found|404" });
    });
  });
});
