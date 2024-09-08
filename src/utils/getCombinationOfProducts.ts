type Product = {
    _id: number;
    productName: string;
    ficheTech: { label: string }[];
    brand: string;
    badge: boolean;
    des: { en: string };
    cat: string;
    pdf: string;
    extraInfo: string;
    price: number;
    img: string;
};

type BasketItem = {
    productName: string;
    unitPrice: number;
    quantity: number;
};

type BasketResult = {
    basket: BasketItem[];
    totalAmount: string;
    targetAmount: number;
    appliedDiscount: string;
};

function generateRandomBasket(products: Product[], targetAmount: number): BasketResult {
    const tolerance = 3; // Tolerance range for the total basket amount
    const maxDiscount = 0.15; // Maximum discount of 15%

    function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function applyDiscountIfNeeded(basket: BasketItem[], totalAmount: number, targetAmount: number): { discountedAmount: number, discountPercent: number } {
        const difference = targetAmount - totalAmount;
        if (Math.abs(difference) <= tolerance) {
            return { discountedAmount: totalAmount, discountPercent: 0 }; // Total is within tolerance, no discount needed
        } else {
            const discountPercent = Math.min(maxDiscount, Math.abs(difference) / targetAmount);
            const discountedAmount = totalAmount * (1 - discountPercent);
            return { discountedAmount, discountPercent };
        }
    }

    let basket: BasketItem[] = [];
    let totalAmount = 0;
    let appliedDiscount = 0;

    // Shuffle products array for randomness
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());

    for (const product of shuffledProducts) {
        const maxQty = Math.max(1, Math.floor(targetAmount / product.price));
        const quantity = getRandomInt(1, Math.min(maxQty, 5)); // Choose a random quantity (1 to 5)

        const productTotal = product.price * quantity;

        if (totalAmount + productTotal > targetAmount + tolerance) {
            continue; // Skip adding if it exceeds target amount beyond tolerance
        }

        basket.push({ 
            productName: product.productName, 
            unitPrice: product.price, 
            quantity 
        });
        totalAmount += productTotal;

        if (totalAmount >= targetAmount - tolerance && totalAmount <= targetAmount + tolerance) {
            break; // Stop once we're within the tolerance range
        }
    }

    if (totalAmount < targetAmount - tolerance || totalAmount > targetAmount + tolerance) {
        const { discountedAmount, discountPercent } = applyDiscountIfNeeded(basket, totalAmount, targetAmount);
        totalAmount = discountedAmount;
        appliedDiscount = discountPercent * 100; // Convert to percentage
    }

    return {
        basket,
        totalAmount: totalAmount.toFixed(2),
        targetAmount,
        appliedDiscount: appliedDiscount > 0 ? `${appliedDiscount.toFixed(2)}%` : "0%" // Format discount
    };
}





export default generateRandomBasket
// const targetAmount = 100;
// const combination = getRandomCombination(products, targetAmount);
// console.log(combination);
