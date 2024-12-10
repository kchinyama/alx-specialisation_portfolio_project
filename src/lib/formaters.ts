/*
module that crates format that will display currencies
for our sales and price data
*/

const currencyFormatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 0,
})


export function formatCurrency(amount: number) {
    return currencyFormatter.format(amount)
}

const numberFormater = new Intl.NumberFormat("en-US")

export function formatNumber(number: number) {
    return numberFormater.format(number)
}