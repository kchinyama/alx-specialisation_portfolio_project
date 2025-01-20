/*
login page before heading to the admin landing 
page
*/


import Image from "next/image";
import LoginForm from "../admin/components/LoginForm";


export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="flex w-3/4 p-20 bg-green-900 shadow">
                <div className="w-1/2">
                    <Image
                        src="/images/k-9247.jpg"
                        alt="Description"
                        className="object-cover w-full h-full pr-1"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="w-1/2 max-w-md p-8 bg-white shadow">
                    <h1 className="mb-6 text-2xl font-bold text-center text-green-900">Sellers Hub</h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}


