export const isEmpty = (obj) => {
    return obj && Object.keys(obj).length === 0
}

export const fetcher = (url) => fetch(url).then((res) => res.json())

export const generateRandomCarData = () => {
    const makers = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW"]
    const models = ["Camry", "Civic", "F-150", "Silverado", "3 Series"]
    const packages = ["Base", "Premium", "Limited", "Sport", "Deluxe"]
    const colors = ["Red", "Blue", "Black", "White", "Silver"]
    const categories = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback"]

    const randomCarData = {
        imgUrl: `https://example.com/${Math.floor(Math.random() * 1000)}`,
        maker: makers[Math.floor(Math.random() * makers.length)],
        model: models[Math.floor(Math.random() * models.length)],
        package: packages[Math.floor(Math.random() * packages.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        year: (Math.floor(Math.random() * 10) + 2010).toString(),
        category: categories[Math.floor(Math.random() * categories.length)],
        mileage: String(Math.floor(Math.random() * 100000)),
        price: String(Math.floor(Math.random() * 50000) + 10000),
    }

    return randomCarData
}
