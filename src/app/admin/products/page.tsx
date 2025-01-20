/* 
page layout of the products page of our website
*/


import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formaters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductsActions";

export default function HomeProductsPage() {
    return <>
    <div className="pl-4 flex justify-between items-center gap-4">
    <PageHeader>Products</PageHeader>
    <Button asChild className="bg-green-900">
        <Link href="/admin/products/new">Add Product</Link>
    </Button>
    </div>
    <ProductsTable />
    </>
}

// renders the tables and items uploaded by the admin
async function ProductsTable() {

    // we have specified how we want the data to be displayed
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true}}
        },
        orderBy: { name: "asc"}
    })

    if (products.length === 0) return <p className="pl-4">Sorry, no products have been uploaded</p>
    
    return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0">
                    <span className="sr-only">Available For Purchase
                    </span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map(product => (
                <TableRow key={product.id}>
                    <TableCell>
                        {product.isAvailableForPurchase ? (
                        <>
                            <span className="sr-only">Available</span>
                            <CheckCircle2 />
                        </>
                        ) : (
                        <>
                            <span className="sr-only">Unavailable</span>
                            <XCircle className="stroke-destructive"/>
                        </>
                        )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{formatCurrency(Number(product.price) / 100)}</TableCell>
                    <TableCell>{formatNumber(product._count.orders)}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>
                                        Download
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>
                                        Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem 
                                    id={product.id}
                                    isAvailableForPurchase={product.isAvailableForPurchase} />
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem id={product.id} 
                                    disabled={product._count.orders > 0} 
                                    />
                                </DropdownMenuContent>  
                            </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    )
}