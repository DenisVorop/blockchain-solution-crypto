export type TCoin = {
    name: string
    fullName: string
    imageUrl: string
    price: number
    volume24Hour: number
    changePercentDay: number
    status: string
}

export type TDeal = {
    id: number
    name: string
    open: number | undefined
    close: number | null
    status: string
    profit: number
    proportion: number
    value: number
    actualPrice: number
}
