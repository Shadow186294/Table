export type Address = {
    address: string
    city: string
    country: string
    state: string
    postalCode: string
}

export type User = {
    id: number
    firstName: string
    lastName: string
    maidenName: string
    username: string
    age: number
    email: string
    phone: string
    gender: string
    height: number
    weight: number
    image: string
    address: Address
}

export type UsersResponse = {
    users: User[]
    total: number
    limit: number
    skip: number
}