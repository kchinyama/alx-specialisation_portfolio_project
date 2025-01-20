/*
module that will control how each product is loaded onto
our system
*/

import { PageHeader } from "../../_components/PageHeader"
import { ProductForm } from "../_components/ProductForm"

export default function NewProductPage() {
    return (
        <>
            <div className="pl-4">
            <PageHeader>Add Product</PageHeader>
            <ProductForm />
            </div>
        </>
    )
}
