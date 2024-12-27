/*
holds the function for the admin to delete 
a customer account
*/


"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"



export async function deleteCustomer(id: string) {
    const customer = await db.customer.delete({
        where: { id },
    })

    if (customer == null) return notFound()

    return customer
}