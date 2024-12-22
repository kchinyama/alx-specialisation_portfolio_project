/*
module that allows for us to download products/items 
from our website
*/

import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises"

export async function GET(
    req: NextRequest, 
    { params: { id } }: { params: { id : string }}
) {
    const product = await db.product.findUnique({
        where: { id },
        select: { filePath: true, name: true },
    })

    if (product == null) return notFound()
    
    // get additional information about the downlaoded file/metadata
    const { size } = await fs.stat(product.filePath)
    const file = await fs.readFile(product.filePath) 
    const filetype = product.filePath.split(".").pop()

    return new NextResponse(file, { headers: {
        "Content-Disposition": `attachment; filename="${product.name}.${filetype}"`,

        "Content-Lenght": size.toString()
    }})
}