const fs = require("fs");
const createFile = async () => {
  if (!fs.existsSync("products.json")) {
    return await fs.promises.writeFile("products.json", "[]");
  }
};

createFile();

class productManager {
  constructor(fileName) {
    this.path = "products.json";
    this.fileName = fileName;
    this.products = [];
    this.id = 0;
  }

  async addProducts(title, description, price, thumbnail, code, stock) {
    if (![title, description, price, thumbnail, code, stock].every(Boolean)) {
      throw new Error(
        "¡Error! Los campos no pueden ser indefinidos, nulos o espacios vacíos."
      );
    }

    const file = await fs.promises.readFile(this.path, "utf-8");
    const products = file ? JSON.parse(file) : [];

    const isDuplicated = products.find((product) => product.code === code);
    if (isDuplicated) {
      console.log("El producto con condigo: ", code, " ya existe");
      return;
    }

    const newProduct = {
      id: this.#generateId(),
      title,
      description,
      price,
      thumbnail,
      code,
    };
    products.push(newProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(products));
    console.log(`Producto ${products.name} agregado con éxito`);
  }

  #generateId() {
    return ++this.id;
  }

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    console.log(fileProductsParse);
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);
    if (findProd) {
      return console.log(findProd);
    } else {
      console.log("Producto no encontrado");
    }
  }

  async updateProduct(id, prop, newValue) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);
    if (findProd == undefined) {
      console.log("Producto no encontrado");
    } else {
      findProd[prop] = newValue;
      const productsString = JSON.stringify(fileProductsParse);
      await fs.promises.writeFile(this.path, productsString);
    }
  }

  async deleteProducts(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const positionProduct = fileProductsParse.findIndex(
      (prod) => prod.id == id
    );
    if (positionProduct == -1) {
      console.log("Producto no encontrado");
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );
      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
    }
  }

  async clearProducts() {
    const filePath = "products.json";
    const data = JSON.stringify([]);
    await fs.promises.writeFile(filePath, data);
  }
}

const myProduct = new productManager();

async function NewProd() {
  //agrego los poductos
  await myProduct.addProducts(
    "Notebook lenovo",
    "notebook lenovo de 13 pulgadas, core i9, con placa de video",
    200,
    "Alguna Imagen",
    "sdj234",
    25
  );
  await myProduct.addProducts(
    "Monitor LCD",
    "monitor lcd de 24 pulgadas",
    58800,
    "imagen monitor",
    "lkh234",
    27
  );
  await myProduct.addProducts(
    "Mouse",
    "mouse logitec",
    28800,
    "imagen mouse",
    "lkm235",
    66
  );

  await myProduct.addProducts(
    "guitarra",
    "es una guitarra electrica marca kapone",
    42322,
    "fotoGuitarra",
    "234oio",
    23
  );

  await myProduct.addProducts(
    "pizarra",
    "Pizarra blanca de 1,20m x 80m",
    20000,
    "fotoDeGuitarra",
    "879ijw",
    60
  );

  await myProduct.addProducts(
    "Calculadora",
    "Casio classwiz fx-570LA",
    42322,
    "fotoCalculadora",
    "149ljk",
    69
  );
  await myProduct.getProducts();
  // utiliza esta linea si quieres un producto por id
  /* console.log("llamada a producto por Id");
  await myProduct.getProductById(2); */
  //En esta linea actualizo el titulo de mi producto
  /* console.log("producto sin cambios");
  await myProduct.getProductById(2);
  console.log("producto con cambios");
  await myProduct.updateProduct(2, "title", "mi nuevo producto");
  await myProduct.getProductById(2); */
  //borro un objeto de mi jason
  /* console.log("antes de borrar");
  await myProduct.getProducts();
  console.log("despues de borrar mi producto");
  await myProduct.deleteProducts(2);
  await myProduct.getProducts(); */

  //borro todo mi archivo
  /*   await myProduct.clearProducts();
  console.log("despues de eliminar todos mis objetos");
  await myProduct.getProducts(); */
}
NewProd();
