/* file that lays out the structure of the 
customers home page
*/


// import { Nav, NavLink } from "./components/Nav";
import { Nav, NavLink } from "../admin/components/Nav";

// restrict the caching of admin activity
export const dynamic = "force-dynamic"

/*
 use children attribute to create navigation bar
for the home page
*/

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
    <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
        <NavLink href="/client/login">Sign out</NavLink>
    </Nav>
    <div className="container my-6">{children}</div>
    </>
}