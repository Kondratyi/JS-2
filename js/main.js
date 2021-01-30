const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = 'https://placeimg.com/150/220/tech') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <a href="${img}"><img src="${img}" alt="image"></a>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
    const productList = list.map(function (product) {
        return renderProduct(product.title, product.price);
    }).join('');
    document.querySelector('.products').insertAdjacentHTML('afterbegin', productList);
};

renderProducts(products);
