const getRandomCombination=(products: any[], targetAmount: number):any =>{
    // Helper function to get a random element from an array
    function getRandomElement(arr: string | any[]) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Helper function to generate a random combination of products
    function findCombination(remainingAmount: number, currentCombo: { [x: string]: {
        UnitPrice: any; Count: number; 
}; }) {
        // Base case: if the remaining amount is 0, return the current combination
        if (remainingAmount === 0) {
            return currentCombo;
        }

        // Filter products that can be added without exceeding the remaining amount
        const availableProducts = products.filter(product => product.price <= remainingAmount);

        // If no products can be added, return null (no valid combination)
        if (availableProducts.length === 0) {
            return null;
        }

        // Pick a random product from the available products
        const randomProduct = getRandomElement(availableProducts);
        
        // Add the random product to the current combination
        if (!currentCombo[randomProduct.name]) {
            currentCombo[randomProduct.name] = { Count: 0, UnitPrice: randomProduct.price };
        }
        currentCombo[randomProduct.name].Count++;

        // Recursively try to find the remaining combination
        return findCombination(remainingAmount - randomProduct.price, currentCombo);
    }

    // Start the recursive search for a combination
    const rawCombination = findCombination(targetAmount, {});

    // If no combination is found, try again
    if (!rawCombination) return getRandomCombination(products, targetAmount);

    // Transform the raw combination into the desired format
    const result = Object.keys(rawCombination).map(key => ({
        Name: key,
        Count: rawCombination[key].Count,
        UnitPrice: rawCombination[key].UnitPrice
    }));

    return result;
}
// Example usage
const products = [
    { name: "testprod1", price: 1 },
    { name: "testprod2", price: 2 },
    { name: "testprod3", price: 1 },
    { name: "testprod4", price: 2 },
    { name: "testprod5", price: 3 },
    { name: "testprod6", price: 6 }
];

export default getRandomCombination
// const targetAmount = 100;
// const combination = getRandomCombination(products, targetAmount);
// console.log(combination);
