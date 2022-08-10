export class ProfileMeDto {
    user: {
        id: Number,
        balance: Number,
        email: String,
        username: String
    };
    role: {
        id: Number,
        name: String,
    };
    person: {
        id: Number,
        name: String,
        lastName: String,
        identificacion: String
    };
    profileImage: String;
}