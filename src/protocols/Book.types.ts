type BookEntity = {
    id: number,
    createdAt: string,
    name: string,
	author: string,
	pages: number,
    read: boolean
};

type NewBookEntity = Omit<BookEntity, "id" | "createdAt">

type ToUpdateBook = Omit<BookEntity, "id" | "createdAt">

export {
    BookEntity,
    NewBookEntity,
    ToUpdateBook
}