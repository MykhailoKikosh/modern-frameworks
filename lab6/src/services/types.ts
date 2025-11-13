export interface Readable<T> {
    get(params: any): Promise<T[]>;

    getById(id: number): Promise<T>;
}

export interface Creatable<T> {
    create(data: T): Promise<T>;
}

export interface Editable<T> {
    update(id: number, data: T): Promise<T>;
}

export interface Deletable<T> {
    delete(id: number): Promise<T>;
}
