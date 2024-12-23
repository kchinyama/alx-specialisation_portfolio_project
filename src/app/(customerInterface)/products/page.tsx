/*
page/file that holds the users products page
*/

import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductsCard";
import db from "@/db/db";
import { Suspense } from "react";

// function that stores all the products uploaded to our sit
function getProducts() {
    return db.product.findMany({ where: 
        { isAvailableForPurchase: true }, 
        orderBy: { name: "asc" } })
}

export default function ProductsPage() {
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={
                    <>
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                </>
                }
                >
                    <ProductsSuspense />
                </Suspense>                
            </div>
    )
}

// function that allows for the looping through all products so they can be displayed
async function ProductsSuspense() {
    const products = await getProducts()
    
    return products.map(product => <ProductCard key={product.id} 
        {...product} />
    ) 
}