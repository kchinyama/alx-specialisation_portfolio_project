/*
page that displays the successful purchase of an <item />
like a link to the next page after successful purchase
*/

import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formaters";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchaseSuccessPage({
    searchParams,
}: { searchParams: { payment_intent: string}

}) {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

    if (paymentIntent.metadata.productID == null) return notFound()

    const product = await db.product.findUnique({ where: {
        id: paymentIntent.metadata.productID
    }})

    if (product == null) return notFound()

    const isSuccess = paymentIntent.status === "succeeded"

    return <div className="max-w-5xl w-full mx-auto space-y-8">
        <h1 className="text-2xl font-bold">
            {isSuccess ? "Congrats! Payment Successful!": "Sorry, Error Occured!"}
            </h1>
    <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
            <Image className="object-cover" src={product.imagePath} fill alt={product.name} />
        </div>
        <div>
            <div className="text-lg">
                {formatCurrency(Number(product.price) / 100)}
            </div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="line-clamp-3 text-muted-foreground">{product.description}</div>
            <Button className="mt-4" size="lg" asChild>
                {isSuccess ? (
                    <a href={`/products/download/${await createDownloadVerification(product.id)}`}>Download</a> ) : (
                    <Link href={`/products/${product.id}/purchase`}>Please Try Again</Link>
                    )}
            </Button>
        </div>
    </div>

</div>
}

// function will hold the verification of customer to download their purchased product
async function createDownloadVerification(productID: string) {
    return (
        await db.downloadVerification.create({
        data: {productID, 
        expiresAt : new Date(Date.now() + 1000 * 60 * 
        60 * 24),
        }
    })
    ).id
}