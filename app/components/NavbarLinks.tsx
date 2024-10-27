"use client"
import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation";

export const navLinks=[
    {
        id:0,
        Name: "Home",
        link: "/"
    },
    {
        id:1,
        Name: "Templates",
        link: "/products/template"
    },
    {
        id:2,
        Name: "UI Kits",
        link: "/products/uikits"
    },
    {
        id:3,
        Name: "Icons",
        link: "/products/icons"
    },
]

export function NavbarLinks(){
    const location = usePathname();
    return(
        <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
             {navLinks.map((items)=>(
                <Link href={items.link} key={items.id} className={cn(
                     items.link===location?"bg-muted":"hover:bg-muted hover:bg-opacity-75",
                     "group flex items-center px-2 py-2 font-medium rounde-md"
                )}>
                    {items.Name}
                </Link>
             )
             )}

        </div>
    )
}