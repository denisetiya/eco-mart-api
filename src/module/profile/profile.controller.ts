import { Hono } from "hono";
import Res from "../../utils/api.response.js";
import { getUserProfile,updateProfile } from "./profile.service.js";
import type { iUpdateProfile } from "../../interface/profile.js";


const profile = new Hono()

profile.get('/:email', async(c) => {
    const email = c.req.param('email');
    try {
        const user = await getUserProfile(email);

        if (!user) {
            return Res(c, 404, 'User not found');
        }

        return Res(c, 200, 'Success', null, user);

    } catch (error :any) {
        return Res(c, 500, 'Some thing wrong', error.message);
    }
})


profile.put('/:email', async (c) => {
    const email = c.req.param('email');
    const data : iUpdateProfile = await c.req.json();

    try {
        const user = await getUserProfile(email);

        if (!user) {
            return Res(c, 404, 'User not found');
        }

        const updatedUser = await updateProfile(email, data);

        if (!updatedUser) {
            return Res(c, 500, 'Failed to update profile');
        }

        return Res(c, 200, 'Success', null, updatedUser);

    } catch (error :any) {
        return Res(c, 500, 'Some thing wrong', error.message);
    }
})

        





export default profile