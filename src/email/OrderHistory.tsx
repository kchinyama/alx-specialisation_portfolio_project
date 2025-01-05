/*
renders out the receipt to the client to the email address
provided - a custom email body and subject
as a receipt
*/

import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";


type OrderHistoryEmailProps = {
    orders: {
        id: string
        pricePaid: number
        createdAt: Date
        downloadVerificationId: string

        product: {
            name: string
            imagePath: string
            description: string
        }
    }[]

}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaid: 100000,
        downloadVerificationId: crypto.randomUUID(),

        product: { name: "Product Name", imagePath: 
            "/products/82fdd155-fc3b-4123-b41a-bbe94aec8a79-k-6019.jpg", 
            description: "some description string",
        },
     },   
     {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaid: 200000,
        downloadVerificationId: crypto.randomUUID(),

        product: { name: "Product Name 2", imagePath: 
            "/products/82fdd155-fc3b-4123-b41a-bbe94aec8a79-k-6019.jpg", 
            description: "some other description string",
        },
     },       
    ]
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }:
    OrderHistoryEmailProps
) {
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head />
                <Body className="font-serif bg-slate-300">
                    <Container className="max-w-xl">
                        <Heading>Order History</Heading>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                            <OrderInformation 
                            order={order} 
                            product={order.product}
                            downloadVerificationId={order.downloadVerificationId} />
                            {index < orders.length - 1 && <Hr />}
                            </React.Fragment>
                        ))}
                            
                            
                        
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}