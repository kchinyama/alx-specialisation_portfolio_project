/*
component to be used as product card insise the customer home 
page interface
*/

import { formatCurrency } from "@/lib/formaters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";


// declare the product type properties
type ProductCardProps = {
    id: string
    name: string
    price: bigint
    description: string
    imagePath: string
}

// displays each product as you would a card on the page
export function ProductCard({ 
    id, 
    name, 
    price, 
    description, 
    imagePath, }:
    ProductCardProps
) {
    return (
    <Card className="flex overflow-hidden flex-col">
        <div className="relative w-full h-auto aspect-video">
            <Image src={imagePath} fill alt={name} />
        </div>
        <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{formatCurrency(Number(price) / 100)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="line-clamp-4">{description}</p>
        </CardContent>
        <CardFooter>
            <Button asChild size="lg" className="w-full bg-orange-800">
                <Link href={`/products/${id}/purchase`}>Purchase</Link>
            </Button>
        </CardFooter>
    </Card>
    )
}


// design features that displays products in skeleton/loading format for effect
export function ProductCardSkeleton(){
    return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
        <div className="w-full aspect-video bg-gray-300" />
        <CardHeader>
            <CardTitle>
                <div className="w-3/4 h-6 rounded-full bg-gray-300" />
            </CardTitle>
            <CardDescription>
                <div className="w-1/2 h-4 rounded-full bg-gray-300" />
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
        </CardContent>
        <CardFooter>
            <Button className="w-full" disabled size="lg"></Button>
        </CardFooter>
    </Card>
    )
}