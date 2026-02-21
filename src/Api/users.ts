import type {UsersResponse} from "../types/user"

type FetchUsersParams = {
    limit: number
    skip: number
    sortBy?: string
    order?: "asc" | "desc"
}

export async function fetchUsers(
    params: FetchUsersParams
): Promise<UsersResponse> {

    const {limit, skip, sortBy, order} = params

    const url = new URL("https://dummyjson.com/users")
    url.searchParams.append("limit", String(limit))
    url.searchParams.append("skip", String(skip))

    if (sortBy && order){
        url.searchParams.append("sortBy", sortBy)
        url.searchParams.append("order", order)
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
        throw new Error("Ошибка загрузки")
    }
    const data: UsersResponse = await response.json()
    return data
}