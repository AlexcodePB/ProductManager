//@ts-check
class productManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    console.log(this.products);
    return this.products;
  }
  getProductById(id) {
    const found = this.products.find((prod) => prod.id === id);
    if (found) {
      return found;
    } else {
      console.log("Not found");
      return undefined;
    }
  }
  #getProductByCode(code) {
    const existsInArray = this.products.find((prod) => prod.code === code);
    return existsInArray;
  }
  #generateId() {
    let maxId = 0;
    for (let i = 0; i < this.products.length; i++) {
      const prod = this.products[i];
      if (prod.id > maxId) {
        maxId = prod.id;
      }
    }
    return ++maxId;
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    const fields = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];
    for (const field of fields) {
      if (!this._isValidField(eval(field))) {
        throw new Error(
          `Error: ${field} cannot be undefined, null or an empty string`
        );
      }
    }
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.#generateId(),
    };
    this.products.push(newProduct);
  }

  _isValidField(value) {
    return value !== undefined && value !== null && value !== "";
  }
}

const myProduct = new productManager();

myProduct.addProducts(
  "Monitor Led Samsung",
  'Monitor de 24", led, maxima calidad en monitores',
  80000,
  "imagen de monitor",
  "#ash333",
  "50"
);
myProduct.addProducts(
  "Monitor Led Samsung",
  'Monitor de 27", led, maxima calidad en monitores',
  120000,
  "imagen de monitor",
  "#ash323",
  "50"
);

const found1 = myProduct.getProductById(1);
const found2 = myProduct.getProductById(2);

console.log(found1);
console.log(found2);

//console.log(myProduct.products);
