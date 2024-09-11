type Product = {
  productName: string;
  price: number;
  quantity?: number;
};

type IsyerimProduct = {
  Name: string;
  Count: number;
  UnitPrice: number;
}


const generateRandomBasket = (products: Product[], totalAmount: number): { basket: IsyerimProduct[], totalPrice: number, discount: number } => {
  let basket: Product[] = [];
  let totalPrice = 0;

  // Shuffle products to get randomness
  const shuffledProducts = products
    .map(product => ({ ...product, quantity: 0 }))
    .sort(() => Math.random() - 0.5);

  for (let i = 0; i < shuffledProducts.length; i++) {
    if (totalPrice >= totalAmount) break;

    const product = shuffledProducts[i];
    const maxQuantity = Math.floor((totalAmount - totalPrice) / product.price) + 1;

    if (maxQuantity > 0) {
      const quantity = Math.floor(Math.random() * maxQuantity) + 1;
      product.quantity = quantity;
      basket.push({ ...product });
      totalPrice += product.price * quantity;
    }
  }

  // Ensure total price is at least equal to the target amount
  if (totalPrice < totalAmount) {
    const remainingGap = totalAmount - totalPrice;
    let closestProduct: Product | null = null;
    let closestPriceDifference = Infinity;

    for (const product of products) {
      if (product.price >= remainingGap) {
        const priceDifference = product.price - remainingGap;
        if (priceDifference < closestPriceDifference) {
          closestPriceDifference = priceDifference;
          closestProduct = product;
        }
      }
    }

    if (closestProduct) {
      closestProduct.quantity = (closestProduct.quantity || 0) + 1;
      basket.push({ ...closestProduct });
      totalPrice += closestProduct.price;
    }
  }

  // Calculate the discount percentage if totalPrice is greater than the totalAmount
  let discount = 0;
  if (totalPrice > totalAmount) {
    discount = (1 - (totalAmount / totalPrice)) * 100;
  }

  // Convert basket to the desired format
  const formattedBasket: IsyerimProduct[] = basket.map((item): IsyerimProduct => ({
    Name: item.productName,
    Count: item.quantity!,
    UnitPrice: item.price
  }));

  return { basket: formattedBasket, totalPrice, discount };
};
export default generateRandomBasket
// const targetAmount = 100;
// const combination = getRandomCombination(products, targetAmount);
// console.log(combination);
