import { Hono } from "hono";
import auth from "./module/auth/auth.controller.js";
import profile from "./module/profile/profile.controller.js";

const router = new Hono()

// auth
router.route('/auth', auth)


// profile
router.route('/profile', profile)


export default router