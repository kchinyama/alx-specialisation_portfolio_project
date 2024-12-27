/*
page for the registered users on our site/customers
*/

/* 
page layout of the products page of our website
*/


import { PageHeader } from "../_components/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { MoreVertical } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formaters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_components/UserActions";


// function to get all orders
function getOrders() {
    return db.order.findMany({
        select: {
            id: true,
            pricePaid: true,
            product: { select: { name: true} },
            customer: true,
        },
        orderBy: { createdAt: "desc"}
    })
}

// displays all the orders registered so our site
export default function OrdersPage() {
    return (
        <>
        <PageHeader>Sales</PageHeader>
        <OrdersTable />
        </>
    )}

async function OrdersTable() {
    const orders = await getOrders()

    if (orders.length === 0) return <p>No Sales Available</p>
    
    return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Email </TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {orders.map(order => (
                <TableRow key={order.id}>
                    <TableCell>{order.product.name}</TableCell>
                    <TableCell>{order.customer.email}</TableCell>
                    <TableCell>
                        {formatCurrency(
                            order.pricePaid / 100)}
                    </TableCell>
                    <TableCell className="text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropdownItem id={order.id} />
                                </DropdownMenuContent>  
                            </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    )
}