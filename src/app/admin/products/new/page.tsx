/*
module that will control how each product is loaded onto
our system
*/

import { PageHeader } from "../../_components/PageHeader"
import { ProductForm } from "../_components/ProductForm"

export default function NewProductPage() {
    return (
        <>
            <PageHeader>Add Product</PageHeader>
            <ProductForm />
        </>
    )
}
