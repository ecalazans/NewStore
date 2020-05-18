module.exports = {
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price / 100)
    },
    cleanPrice(price) {
        return price = price.replace(/\D/g, "")
    }
}