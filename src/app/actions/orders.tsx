/*
file to handle all customer orders 
*/

"use server"

import db from "@/db/db"

export async function userOrderExists(email: string, productID: string) {
    return (
        (await db.order.findFirst(
        { where: { customer: { email }, productID },
        select: { id: true } })) != null
    )
}