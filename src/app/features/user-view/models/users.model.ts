export interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    }
}
export interface UserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}
export interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;
}

export type UsersResponse = UserData[];


export type UserUiData = Pick<UserData, 'id' | 'name'| 'username' |'email'> & {
    isEditing: boolean;
};