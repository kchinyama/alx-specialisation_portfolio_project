/*
page that will hold the myOrders page of the 
customer interface
*/

"use client"


import { emailOrderHistory } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";


export default function MyOrdersPage() {

    const [ data, action ] = useActionState(emailOrderHistory, {})

    return (
        <form action={action} className="pl-4 max-2-x1 mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>Enter you email for order history as well as download links</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <Label htmlFor="email" >Email</Label>
                    <Input type="email" required name="email" id="email"
                    />
                    {data.error && <div className="text-destructive">{data.error}</div>}
                </div>
            </CardContent>
            <CardFooter>
                {data.message ? <p>{data.message}</p> : <SubmitButton />}
            </CardFooter>
        </Card>

    </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return <Button className="w-full bg-orange-800" size="lg" disabled={pending}
    type="submit" >{pending ? "Sending..." : "Send"}</Button>
}