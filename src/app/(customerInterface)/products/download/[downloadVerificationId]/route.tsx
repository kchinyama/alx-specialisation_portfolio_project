/*
takes care of downloaded itmes after they have been purchased
by the customer
*/

import db from "@/db/db"
import { NextRequest, NextResponse } from "next/server"

import fs from "fs/promises"

export async function GET(req: NextRequest, 
    { params: { downloadVerificationId },
} : { params: { downloadVerificationId: string
}}) {

    const data = await db.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiresAt: 
            { gt: new Date()}
         },
         select: { product: { select: { filePath: true, name: true }}}
    })

    // if download link is expired
    if (data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url))
    }

    // logicall end to download of purchased item

    const { size } = await fs.stat(data.product.filePath)
    const file = await fs.readFile(data.product.filePath) 
    const filetype = data.product.filePath.split(".").pop()

    return new NextResponse(file, { headers: {
        "Content-Disposition": `attachment; filename="${data.product.name}.${filetype}"`,

        "Content-Lenght": size.toString()
    }})
}
