import { Hono } from "hono";
import Res from "../../utils/api.response.js";
import { getAllProduct,getProductById,searchProduct } from "./product.service.js";
import type { iSearchProduct } from "../../interface/product.js";
const product = new Hono()

product.get('/products', async (c) => {
    try {
        const data = await getAllProduct();

        if (!data) {
            return Res(c, 404, 'Product not found');
        }

        return Res(c, 200, 'Success', null, data)
    } catch (error: any) {
        return Res(c, 500, 'Some thing wrong', error.message)
    }
})

product.get('/product/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const data = await getProductById(id);

        if (!data) {
            return Res(c, 404, 'Product not found');
        }
    } catch (error: any) {
        return Res(c, 500, 'Some thing wrong', error.message)
    }
})

product.get('/product/search', async (c) => {
    try {
        const data:iSearchProduct = await c.req.json();

        if (!data) {
            return Res(c, 400, 'Plaese fill at least one field', '');
        }

        const result = await searchProduct(data);

        if (!result) {
            return Res(c, 404, 'Product not found');
        }

        return Res(c, 200, 'Success', null, result)


    } catch (error:any) {
        return Res(c, 500, 'Some thing wrong', error.message)
    }
})



export default product


