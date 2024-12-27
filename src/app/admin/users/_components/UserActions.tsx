"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteCustomer } from "../../_actions/customers";
import { useRouter } from "next/navigation";



// inside of the drop down here we delete an item
export function DeleteDropdownItem({
    id,
}: {
    id: string
}) {
    const [ isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
    <DropdownMenuItem 
    variant="destructive"
    disabled={isPending}
    onClick={() => {
        startTransition(async () => {
            await deleteCustomer(id)
            router.refresh()
        })
    }}>
        Delete
    </DropdownMenuItem>
    )

}