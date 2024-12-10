/* 
boiler plate for all the pages associated with my website
*/

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formaters";
// import { resolve } from "path";

// function executes connection to database so we can draw sales data
async function getSalesData() {
    const mySalesData = await db.order.aggregate({
        _sum: { pricePaid: true},
        _count: true
    })
    await waitLoading(2000)
    return {
        amount: (mySalesData._sum.pricePaid || 0) / 100,
        numberofSales: mySalesData._count
    }
}

// load spinner function for effect when page is reloading
function waitLoading(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

// function executes connection to database so we can draw user data
async function getCustomerData() {
    const [ userCount, orderData ] = await Promise.all([
        db.customer.count(),
        db.order.aggregate({
        _sum: { pricePaid: true}
        })
    ])
    return {
        userCount,
        averageValuePerCustomer: userCount === 0 ? 0 : (orderData._sum.
            pricePaid || 0) / userCount / 100
    }
}

// function allows for connect to database to display the products data
async function getProductData() {
    const [ activeProduct, inActiveProduct ] = await Promise.all([
        db.product.count({ where: {isAvailableForPurchase: true} }),
        db.product.count({ where: { isAvailableForPurchase: false }})
    ])

    return { activeProduct, inActiveProduct }

}

// function that displays the home page 'icons/cards'
export default async function AdminHomePage() {
    const [ SalesData, UserData, ProductData ] = await Promise.all([
        getSalesData(),
        getCustomerData(),
        getProductData()
    ])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Homecard 
            title="Sales" 
            subtitle={`${formatNumber(SalesData.numberofSales)} Orders`}
            body={formatCurrency(SalesData.amount)}>
            </Homecard>

            <Homecard 
            title="Customers" 
            subtitle={`${formatCurrency(UserData.averageValuePerCustomer)} Average Value`}
            body={formatNumber(UserData.userCount)}
            />

            <Homecard 
            title="Active Products" 
            subtitle={`${formatNumber(ProductData.inActiveProduct)} Inactive Products`}
            body={formatNumber(ProductData.activeProduct)}
            />
        </div>
    )
}

// created type attributes for each property in y home card 
type HomecardProps = {
    title: string
    subtitle: string
    body: string
}

// created home page card that will hold and stylise icons on home page
function Homecard({ title, subtitle, body }:
HomecardProps) {
    return <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{body}</p>
        </CardContent>
    </Card>
}