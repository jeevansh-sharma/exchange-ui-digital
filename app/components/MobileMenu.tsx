"use client";
import { Button } from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./NavbarLinks";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MobileMenu(){
    const [isSheetOpen,SetSheetOpen]= useState(false);
    const location=usePathname();
    return(
    <Sheet open={isSheetOpen} onOpenChange={SetSheetOpen}>
        <SheetTrigger asChild>
            <Button variant="outline" size="icon" onClick={()=>{SetSheetOpen(true)}}>
                <Menu className="w-4 h-4"/>
            </Button>
        </SheetTrigger>
        <SheetContent>
           <div className="mt-5 flex px-2 space-y-1 flex-col">
           {navLinks.map((items)=>(
                <Link href={items.link} key={items.id} className={cn(
                     items.link===location?"bg-muted":"hover:bg-muted hover:bg-opacity-75",
                     "group flex items-center px-2 py-2 font-medium rounde-md"
                )} onClick={()=>SetSheetOpen(false)}>
                    {items.Name}
                </Link>
             )
             )}
           </div>

        </SheetContent>
    </Sheet>
    )
}