/* 
module that sets the navigation bar on each of our
web pages - for the buyers hub
*/

"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

// styling for the navigation bar
export function Nav({ children }: { children: ReactNode}) {
    return <nav className="bg-orange-800 text-primary-foreground
    flex justify-center px-4">{children}</nav>
}

// function that allows us to add links to the navigation tags
export function NavLink(props: Omit<ComponentProps<typeof Link>, 
    "className">
) {
    const pathName = usePathname()
    return <Link {...props} className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:bg-secondary-foreground", pathName ===
    props.href && "bg-background text-foreground")}/>
}