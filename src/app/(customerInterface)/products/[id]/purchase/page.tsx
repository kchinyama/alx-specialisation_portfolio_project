/* 
file that will hold the purchase page for the customer 
interface
*/

import db from "@/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/CheckoutForm"

// creat stripe opject to gain access to a payment format
const stripe  = new Stripe(
    process.env.STRIPE_SECRET_KEY as string)

export default async function PurchasePage({ 
    params: { id },
}: {
    params: { id: string }
}) {
    const product = await db.product.findUnique({
        where: { id }
    })

    if (product == null) return notFound()
    
    // create an intent to make a payment
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(product.price),
        currency: "USD",
        metadata: { productID: product.id }
    }
    )

    if (paymentIntent.client_secret == null) {
        throw Error("Sorry, failed to create a payment intent")
    }  
    
    return <CheckoutForm product={product} 
        clientSecret={paymentIntent.client_secret}/>
}