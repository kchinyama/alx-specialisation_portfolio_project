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


// function to get all customers
function getCustomers() {
    return db.customer.findMany({
        select: {
            id: true,
            email: true,
            orders: { select: { pricePaid: true} },
            // createdAt: true,
            // updatedAt: true
        },
        orderBy: { createdAt: "desc"}
    })
}

// displays the customers who are registered so our site
export default function CustomersPage() {
    return (
        <>
        <div className="pl-4">
        <PageHeader>Customers</PageHeader>
        </div>
        <CustomersTable />
        </>
    )}

async function CustomersTable() {
    const customers = await getCustomers()

    if (customers.length === 0) return <p className="pl-4">No Customers Found</p>
    
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
            {customers.map(customer => (
                <TableRow key={customer.id}>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{formatNumber(customer.orders.length)}</TableCell>
                    <TableCell>
                        {formatCurrency(
                            customer.orders.reduce((sum, o) => 
                        o.pricePaid + sum, 0) / 100)}
                    </TableCell>
                    <TableCell className="text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropdownItem id={customer.id} />
                                </DropdownMenuContent>  
                            </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    )
}