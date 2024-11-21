import type { use } from "hono/jsx";
import prisma from "../../utils/prisma.client.js";
import type { iUpdateProfile } from "../../interface/profile.js";
import bcrypt from 'bcrypt';

//  get user profile by email
export const getUserProfile = async (email: string) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select : {
                email: true,
                username: true,
                name: true,
                userImg : true,
                alamat: true
            }
        });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        return user
        
    } catch (error :any) {
        throw new Error(error.message)
    }
}





// update user profile using email 
export const updateProfile = async (email: string, data: iUpdateProfile) => {
    try {

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== null && value !== undefined)
        );

        

        const user = await prisma.user.update({
            where: {
                email
            },
            data: filteredData
        });

        if (!user) {
            throw new Error("Cant update user, something wrong");
        }

        return {
            email: user.email,
            username: user.username,
            name: user.name
        };

    } catch (error: any) {
        throw new Error(error.message);
    }
}
