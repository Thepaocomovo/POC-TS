type UserEntity = {
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: string
};

type NewUserEntity = Omit<UserEntity, "id" | "createdAt">

export {
    UserEntity,
    NewUserEntity
}