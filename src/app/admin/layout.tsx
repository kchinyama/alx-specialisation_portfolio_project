/* file that lays out the structure of the 
 home page of the buyers hub
*/

import { Nav, NavLink } from "./components/Nav";

// restrict the caching of admin activity
export const dynamic = "force-dynamic";

/*
 use children attribute to create navigation bar
for the home page
*/

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <div className="flex space-x-4">
          <NavLink href="/admin">Admin Home</NavLink>
          <NavLink href="/admin/products">Products</NavLink>
          <NavLink href="/admin/users">Customers</NavLink>
          <NavLink href="/admin/orders">Sales</NavLink>
        </div>
        <NavLink href="/login">
          <h1 className="ml-auto">Sign Out</h1>
        </NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
