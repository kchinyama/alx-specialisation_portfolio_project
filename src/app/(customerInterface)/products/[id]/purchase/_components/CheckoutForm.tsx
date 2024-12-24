/*
file tp hold our checkout form
*/


type CheckoutFormProps = {
    product: unknown
    clientSecret: string
}

export function CheckoutForm({ product, clientSecret}
    : CheckoutFormProps
) {
    return <h1>Form</h1>
}