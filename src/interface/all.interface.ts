
export interface menu {
    modules: Array<modulo>
}

interface modulo {
    name: string,
    isActive: boolean,
    icon: string,
    form: [
        {
            name: string,
            path: string,
            icon: string
        }
    ]
}