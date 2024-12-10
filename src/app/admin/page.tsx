/* 
boiler plate for all the pages associated with my website
*/

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formaters";

// function executes connectio to database so we can draw sales data
async function getSalesData() {
    const mySalesData = await db.order.aggregate({
        _sum: { pricePaid: true},
        _count: true
    })
    return {
        amount: (mySalesData._sum.pricePaid || 0) / 100,
        numberofSales: mySalesData._count
    }
}

// function executes connectio to database so we can draw user data
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

// function that displays the home page 'icons/cards'
export default async function AdminHomePage() {
    const [ SalesData, UserData ] = await Promise.all([
        getSalesData(),
        getCustomerData()
    ])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Homecard 
            title="Sales" 
            subtitle={`${formatNumber(SalesData.numberofSales)} Orders`}
            body={formatCurrency(SalesData.amount)}>
            </Homecard>

            <Homecard 
            title="Customer" 
            subtitle={`${formatCurrency(UserData.averageValuePerCustomer)} Average Value`}
            body={formatNumber(UserData.userCount)}
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