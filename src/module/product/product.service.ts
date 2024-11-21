import type { iSearchProduct } from "../../interface/product.js";
import prisma from "../../utils/prisma.client.js";


export const getAllProduct = async () => {
    
    try {
        const data = await prisma.product.findMany()
        if (!data) {
            throw new Error("Product not found");
        }
     
        return data
        
    } catch (error: any) {
        throw new Error(error.message)
    }
    
}


export const getProductById = async (id: string) => {

    try {
        const data = await prisma.product.findUnique({
            where: {
                id
            }
        })
        if (!data) {
            throw new Error("Product not found");
        }
     
        return data
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const searchProduct = async (search: iSearchProduct) => {
    const { productName, priceMin, priceMax, productStock, sortBySold, productCategory } = search
    const where: any = {}
    const orderBy: any = {} 

    if (productName) {
        where.productName = {
            contains: productName
        }
    }

    if (priceMin !== undefined && priceMax !== undefined) {
        where.productPrice = {
            gte: priceMin,
            lte: priceMax
        }
    }

    if (productStock !== undefined) {
        where.productStock > 0
    }

    if (sortBySold) {
        where.productSold > 0
        orderBy.productSold = "desc" 
    }

    if (productCategory) {
        where.productCategory = productCategory
    }

    const data = await prisma.product.findMany({
        where,
        orderBy
    })

    if (!data) {
        throw new Error("Product not found");
    }

    return data
}



export const updateProduct = async (id: string, data: any) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== undefined)
    );
    try {
        const product = await prisma.product.update({
            where: {
                id
            },
            data: filteredData
        })

        if (!product) {
            throw new Error("Product not found");
        }
     
        return product
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}