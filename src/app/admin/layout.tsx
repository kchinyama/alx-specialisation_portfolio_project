/* file that lays out the structure of the 
home page
*/


import { Nav, NavLink } from "./components/Nav";

// restrict the caching of admin activity
export const dynamic = "force-dynamic"

/*
 use children attribute to create navigation bar
for the home page
*/

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
    <Nav>
        <NavLink href="/admin">Home</NavLink>
        <NavLink href="admin/products">Products</NavLink>
        <NavLink href="admin/customers">Customers</NavLink>
        <NavLink href="admin/orders">Orders</NavLink>
    </Nav>
    <div className="container my-6">{children}</div>
    </>
}