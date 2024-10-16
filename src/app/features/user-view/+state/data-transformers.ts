import { User, UserFormData, UserUiData } from "../models/users.model";

/**
 * 
 * Helper function that does the transformation. This can be used to set defaults in case 
 * the data may not be what we expect.
 */
export function mapUserResponseToUserFormDataArray(response: User[]): UserFormData[] {
    return response.map(user => ({
        id: String(user.id),
        name: user.name,
        username: user.username,
        email: user.email,
        isEditing: false
    }))
}

export function mapUserFormDataToUserUiData(data: UserFormData): UserUiData {
    return {
        id: Number(data.id),
        name: data.name,
        username: data.username,
        email: data.email
    }
}