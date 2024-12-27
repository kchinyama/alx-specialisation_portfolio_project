/*
renders out the receipt to the client to the email address
provided - a custom email body and subject
as a receipt
*/

import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";


type PurchaseReceiptEmailProps = {
    product: {
        name: string
        imagePath: string
        description: string
    }
    order: { id: string,
        createdAt: Date,
        pricePaid: number
     }
     downloadVerificationId: string
}

PurchaseReceiptEmail.PreviewProps = {
    product: { name: "Product Name", imagePath: 
        "/products/82fdd155-fc3b-4123-b41a-bbe94aec8a79-k-6019.jpg", 
        description: "some description string",},
    order: {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaid: 100000,
    },
    downloadVerificationId: crypto.randomUUID()

} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({ product, order, downloadVerificationId }:
    PurchaseReceiptEmailProps
) {
    return (
        <Html>
            <Preview>Download {product.name} and view receipt</Preview>
            <Tailwind>
                <Head />
                <Body className="font-serif bg-slate-300">
                    <Container className="max-w-xl">
                        <Heading>Purchase Receipt</Heading>
                        <OrderInformation order={order} product={product}
                        downloadVerificationId={downloadVerificationId} />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}