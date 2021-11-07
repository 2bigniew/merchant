export interface Account {
    id: number
    firstname: string
    lastname: string
    email: string
    password: string
    createdAt: Date
}

export type CreateAccountPayload = {
    firstname: string
    lastname: string
    password: string
    email: string
}

export type UpdateAccountPayload = Partial<CreateAccountPayload> & { id: number }

export interface AccountRouter {
    'account/list': {
        response: Account[]
    }


}


export type AccountPaths = keyof AccountRouter
