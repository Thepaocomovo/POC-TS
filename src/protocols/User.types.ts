type UserEntity = {
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: string
};

type NewUserEntity = Omit<UserEntity, "id" | "createdAt">

type UserSignIn = Omit<UserEntity, "id" | "createdAt" | "name">


export {
    UserEntity,
    NewUserEntity,
    UserSignIn
};