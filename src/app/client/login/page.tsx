/*
login page before heading to the buyers/customers landing 
page
*/

"use client"

import Image from "next/image";
// import LoginForm from "@/app/admin/components/LoginForm";
import LoginFormClient from "@/app/(customerInterface)/components/LoginFormClient";


export default function BuyersLoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="flex w-3/4 p-20 bg-orange-800 shadow">
                <div className="w-1/2">
                    <Image
                        src="/images/k-9296.jpg"
                        alt="Description"
                        className="object-cover w-full h-full pr-1"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="w-1/2 max-w-md p-8 bg-white shadow">
                    <h1 className="mb-6 text-2xl font-bold text-center text-orange-800">Buyers Hub</h1>
                    <LoginFormClient />
                </div>
            </div>
        </div>
    );
}


