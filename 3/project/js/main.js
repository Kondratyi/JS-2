const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!
/*let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
}*/
function getRequest(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.status === 200){
      res(xhr.responseText)
    } else {
      rej(('Ошибка'))
    } 
  }
  })
};
getRequest(API).then((data) => {
  console.log(data);
}).catch((error) => console.log(error))
// ------------------------------------------------

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    // this._goods = [];
    this.#goods = [];
    this.#allProducts = [];

    //this.#fetchGoods();

    this.#getProducts().then((data) => {
      this.#goods = [...data];
      this.#render();
    });
  }

  sum() {
    return this.#goods.reduce((sum, {
      price
    }) => sum + price, 0);
  }

  // #fetchGoods() {
  //   getRequest(`${API}catalogData.json`, (data) => {
  //     console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //   })
  // }

  #getProducts() {
    return fetch(`${API}catalogData.json`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img; // this.img = product.img || 'https://placehold.it/200x150';
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}
const productList = new ProductList();