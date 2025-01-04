/*
page layout of home page of the customer interface
*/

import { Button } from "@/components/ui/button"
import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductsCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

// variable to display the most popular uploaded products - checking results after each day
const getMostPopularProducts = cache(() => {
    return db.product.findMany({ 
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6 })
}, ["/", "getMostPopularProducts"],
{ revalidate: 60 * 60 * 24})

// variabble to display the most newly uploaded products
const getNewestProducts = cache(() => {
    return db.product.findMany({ 
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc"},
        take: 6 })
}, ["/", "getNewestProducts"])

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

    //function that will handle the suspense loading effect.0
    async function ProductSuspense({ productsFetcher }: { productsFetcher: () => Promise<Product[]> }) {
    const products = await productsFetcher();

    // Convert BigInt to String
    const serializedProducts = products.map(product => ({
        ...product,
        price: product.price.toString() // Convert BigInt to string
    }));

    return serializedProducts.map(product => (
        <ProductCard key={product.id} {...product} />
    ));
}
