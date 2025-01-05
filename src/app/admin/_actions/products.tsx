/*
module that allows us to store data/items that are loaded
onto the website by the admin
*/

"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"


// variable to hold the file data inputed
//const FileSchema = z.instanceof(File, { message: "Required" })
// Check if the code is running in the browser
const isBrowser = typeof window !== "undefined" && typeof File !== "undefined";

const FileSchema = isBrowser
  ? z.instanceof(File, { message: "Required" })
  : z.any(); // Fallback for server-side

// variable that holds the image data inputed by the admin
const ImageSchema = FileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/")
)

// function that creates the input data from the admin page
const AddSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: FileSchema.refine(file => file.size > 0, "Required"),
    image: ImageSchema.refine(file => file.size > 0, "Required")
})

// function allows for us to add product for sale to our website
export async function addProduct(prevState: unknown, formData: FormData) {
    const myData = AddSchema.safeParse(Object.fromEntries(formData.entries()))

    if (myData.success === false) {
        return myData.error.formErrors.fieldErrors
    }

    const data = myData.data

    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`

    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products", { recursive: true })
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`

    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await db.product.create({ data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        price: data.priceInCents,
        filePath,
        imagePath 
    }})

    revalidatePath("/")
    revalidatePath("/products")

    redirect("/admin/products")
}

// schema for updating file paths and images
const editSchema = AddSchema.extend({
    file: FileSchema.optional(),
    image: ImageSchema.optional()
})


// allows for us to edit/update an already uploaded ppoduct
export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
    const myData = editSchema.safeParse(Object.fromEntries(formData.entries()))

    if (myData.success === false) {
        return myData.error.formErrors.fieldErrors
    }

    const data = myData.data
    const product = await db.product.findUnique({ where: { id }})

    if (product == null) return notFound()
    
    let filePath = product.filePath
    if (data.file != null && data.file.size > 0) {
        await fs.unlink(product.filePath)

        filePath = `products/${crypto.randomUUID()}-${data.file.name}`

        await fs.writeFile(
            filePath, Buffer.from(await data.file.arrayBuffer()))
        
    }

    let imagePath = product.imagePath
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${product.imagePath}`)
        
        imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`

        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    
    }    

    await db.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            price: data.priceInCents,
            filePath,
            imagePath 
    }})


    revalidatePath("/")
    revalidatePath("/products")

    redirect("/admin/products")
}

// check product availability on our site
export async function toggleProductAvailability(id: string,
    isAvailableForPurchase: boolean) {
    await db.product.update({ where: { id }, data: { isAvailableForPurchase }})   
    
    revalidatePath("/")
    revalidatePath("/products")
}


//delete product when we choose
export async function deleteProduct(id: string) {
    const product = await db.product.delete( { where : { id }})

    if (product == null) return notFound()
    
    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)

    revalidatePath("/")
    revalidatePath("/products")
}