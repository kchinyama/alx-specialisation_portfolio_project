/*
module that allows us to store data/items that are loaded
onto the website by the admin
*/

"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { redirect } from "next/navigation"


// variable to hold the file data inputed
const FileSchema = z.instanceof(File, { message: "Required" })

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

export async function addProduct(formData: FormData) {
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
        name: data.name,
        description: data.description,
        price: data.priceInCents,
        filePath,
        imagePath 
    }})

    redirect("/admin/products")
}