"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProuct, toggleProductAvailability } from "../../_actions/products";
import { useRouter } from "next/navigation";

// import React from 'react';
// import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import { useTransition } from "react";
// import { deleteProuct, toggleProductAvailability } from "../../_actions/products";

// function CustomDropdownItem({ onClick, children, disabled }) {
//     return (
//         <div
//             className={`dropdown-item ${disabled ? 'disabled' : ''}`}
//             onClick={disabled ? undefined : onClick}
//             style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}
//         >
//             {children}
//         </div>
//     );
// }

// export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) {
//     const [isPending, startTransition] = useTransition();

//     return (
//         <DropdownMenu>
//             <DropdownMenuItem
//                 onClick={() => {
//                     startTransition(async () => {
//                         await toggleProductAvailability(id, !isAvailableForPurchase);
//                     });
//                 }}
//                 disabled={isPending}
//             >
//                 {isAvailableForPurchase ? "Deactivate" : "Activate"}
//             </DropdownMenuItem>
//         </DropdownMenu>
//     );
// }

// export function DeleteDropdownItem( { id, }: { id: string}) {
//     const [isPending, startTransition] = useTransition();

//     return (
//         <DropdownMenu>
//             <DropdownMenuItem
//             // variant='destructive'
//                 onClick={() => {
//                     startTransition(async () => {
//                         await deleteProuct(id)
//                     });
//                 }}
//                 disabled={isPending}
//             >
//                 Delete
//             </DropdownMenuItem>
//         </DropdownMenu>
//     );
// }

// #######################################################
export function ActiveToggleDropdownItem({
    id,
    isAvailableForPurchase,
}: {
    id: string
    isAvailableForPurchase: boolean
}) {
    const [ isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
    <DropdownMenuItem 
    disabled={isPending}
    onClick={() => {
        startTransition(async () => {
            await toggleProductAvailability(id, !isAvailableForPurchase)
            router.refresh()
        })
    }}>
        {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
    )
}


export function DeleteDropdownItem({
    id,
    disabled,
}: {
    id: string
    disabled: boolean
}) {
    const [ isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
    <DropdownMenuItem 
    variant="destructive"
    disabled={disabled || isPending}
    onClick={() => {
        startTransition(async () => {
            await deleteProuct(id)
            router.refresh()
        })
    }}>
        Delete
    </DropdownMenuItem>
    )

}