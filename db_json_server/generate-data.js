const faker = require('faker');
const fs = require('fs');

//Set local to use Vietname
faker.locale = 'vi';

//Random data
const randomListCategory = (n) => {
  const listCategory = [];
  //loop and push category
  if(n>0){
    Array.from(new Array(n)).forEach(() => {
      const category = {
        id: faker.random.uuid(),
        name: faker.commerce.department(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      listCategory.push(category);
    })
  }
  return listCategory;
}

const randomListProduct = (listCategory, numberOfProduct) => {
  const listProduct = [];
  if(numberOfProduct > 0){
    for(const category of listCategory){
      Array.from(new Array(numberOfProduct)).forEach(() => {
        const product = {
          id: faker.random.uuid(),
          cateroryId: category.id,
          name: faker.commerce.productName(),
          description: faker.commerce.productMaterial(),
          cost: Number.parseFloat(faker.commerce.price()),
          image: faker.image.imageUrl(300, 500),
          color: faker.commerce.color(),
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        listProduct.push(product); 
      });
    }
  }
  return listProduct;
}

// IFFE
(() => {
  const listCategory = randomListCategory(5);
  const listProduct = randomListProduct(listCategory, 5);

  //prepare db object
  const db = {
    categories: listCategory,
    products: listProduct,
    profile: {
      name: "pro"
    }
  }

  //random data
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log("success full");
  });

})();