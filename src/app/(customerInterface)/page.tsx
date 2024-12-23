/*
page layout of home page of the customer interface
*/

import { Button } from "@/components/ui/button"
import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductsCard"
import db from "@/db/db"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

// function to display the most popular uploaded products
function getMostPopularProducts() {
    return db.product.findMany({ 
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6 })
}

// function to display the most newly uploaded products
function getNewestProducts() {
    return db.product.findMany({ 
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc"},
        take: 6 })
}

// displays the home page to the user
export default function HomePage() {
    return <main className="space-y-12">
        <ProductGridSection 
        title="Most Popular Products"
        productsFetcher={getMostPopularProducts} />

        <ProductGridSection
        title="Newest Products" 
        productsFetcher={getNewestProducts} />
    </main>
}

// create type
type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}

/* function to create the grid sections that hold the the 
1. newest products 2. popular products
*/
function ProductGridSection({ productsFetcher, title }:
    ProductGridSectionProps) {
        return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button variant="outline" asChild>
                    <Link href="/products" className="space-x-2">
                    <span>View All</span>
                    <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={
                    <>
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                </>
                }
                >
                    <ProductSuspense productsFetcher={productsFetcher} />
                </Suspense>                
            </div>
        </div>
        )
    }

    //function that will handle the suspense loading effect
    async function ProductSuspense({ productsFetcher }: {

        productsFetcher: () => Promise<Product[]>}) 
        {
        
            return (await productsFetcher()).map(product => (
            <ProductCard key={product.id} {...product} />
        ))
    }