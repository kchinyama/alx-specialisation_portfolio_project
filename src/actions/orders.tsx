/*
file that displays the order details to the client - ie.history
*/

"use server"

import db from "@/db/db";
import OrderHistoryEmail from "@/email/OrderHistory";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().email()

const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function emailOrderHistory(prevState: unknown,
    formData: FormData): Promise<{ message?: string; error?: string}> {

        const result = emailSchema.safeParse(formData.get("email"))

        if (result.success === false) {
            return { error: "Invalid email address submitted"}
        }

        const customer = await db.customer.findUnique({
            where: { email: result.data }, select: {
                email: true,
                orders: {
                    select: {
                        pricePaid: true,
                        id: true,
                        createdAt: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imagePath: true,
                                description: true
                            }
                        }
                    }
                }
            }

        })

        if (customer == null) {
            return {
                message: "Check your email to view your order history and download your purchased products"
            }
        }

        const orders = customer.orders.map(async order => {
            return { ...order, downloadVerificationId: (
                await db.downloadVerification.
                create({ data: { expiresAt: new Date(Date.now() + 24 * 1000 *
                60 * 60 ), productID: order.product.id},
            })
        ).id,
    }
})

        const orderInfo = await resend.emails.send({
            from: `Support <${process.env.SENDER_EMAIL}>`,
            to: customer.email,
            subject: "Order History",
            react: <OrderHistoryEmail orders={await Promise.all(orders)} />
        })

        if (orderInfo.error) {
            return { message: "An error occured when sending your email. Kindly try again"}
        }

        return { message: "Check your email to view your order history and download your purchased products"}
}