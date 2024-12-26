/*
redirrect page when download link has expired
or when there is an error
*/

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Expired() {
    return (
        <>
        <h1 className="text-3xl mb-4">Sorry, Download Link Expired</h1>
        <Button asChild size="lg">
            <Link href="/orders">Get New Link</Link>
        </Button>
        </>
    )
}