export interface address {
    province?: string
    city? :string
    district?   :string
    subDistrict?:string
    detail?     :string
}
export interface iUpdateProfile {
    email?: string,
    username?: string,
    name?: string,
    userImg?: string
    address?: address
}

