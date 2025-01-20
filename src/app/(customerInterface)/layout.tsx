/* file that lays out the structure of the 
customers home page
*/


// import { Nav, NavLink } from "./components/Nav";
import { NavLink } from "../admin/components/Nav";
import { Nav } from "./components/Nav";

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

        <NavLink href="/client/login">
          <h1  className="ml-auto">Sign Out</h1>
        </NavLink>
    </Nav>
    <div className="container my-6">{children}</div>
    </>
}