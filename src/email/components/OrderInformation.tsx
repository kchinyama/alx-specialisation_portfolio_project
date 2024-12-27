/*
page email to provide to the customer the information
about their purchase
*/

import { formatCurrency } from "@/lib/formaters"
import { Button, Column, Img, Row, Section, Text } from "@react-email/components"

type OrderInformationProps = {
    order: { id: string;
        createdAt: Date;
        pricePaid: number
     },
    product: { imagePath: string; name: string; description: string },
    downloadVerificationId: string
}

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "short" })

export function OrderInformation({
    order, product, downloadVerificationId
}:
OrderInformationProps) {
    return <>
    <Section>
        <Row>
            <Column>
            <Text className="mb-0 text-grey-300 whitespace-nowrap text-nowrap mr-5">Order ID</Text>
            <Text className="mt-0 mr-5">{order.id}</Text>
            </Column>

            <Column>
            <Text className="mb-0 text-grey-300 whitespace-nowrap text-nowrap mr-5">Day of Purchase</Text>
            <Text className="mt-0 mr-5">{dateFormatter.format(order.createdAt)}</Text>
            </Column>

            <Column>
            <Text className="mb-0 text-grey-300 whitespace-nowrap text-nowrap mr-5">Price Paid</Text>
            <Text className="mt-0 mr-5">{formatCurrency(order.pricePaid / 100)}</Text>
            </Column>
        </Row>
    </Section>
    <Section 
    className="border border-solid border-grey-300 rounded-lg p-5 md:p-8 my-2">
        <Img width="100%" alt={product.name}
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`} />
        <Row className="mt-6">
            <Column className="align-bottom">
                <Text className="text-lg font-semibold m-0 mr-4">{product.name}</Text>
            </Column>
            <Column align="right">
                <Button href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
                className="bg-blue-900 text-white px-3 py-7 rounded text-lg">
                    Download
                </Button>
            </Column>
        </Row>
        <Row>
            <Column>
            <Text className="text-grey-700 mb-1">{product.description}</Text>
            </Column>
        </Row>
    </Section>
    </>
}