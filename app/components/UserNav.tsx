import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";


interface appIprops{
    userName: string,
    userEmail:string,
    userImage:string|undefined
}

export function UserNav({userName,userEmail,userImage}: appIprops){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                          <AvatarImage src={userImage} alt="image"/>
                         <AvatarFallback>{userName.slice(0,3)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/> 
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link href="/sell">Sell your Product</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/setting'>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/myProducts'>My Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/billing'>My Billings</Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/> 
            <DropdownMenuItem asChild>
                
                    <LogoutLink>
                         Log out
                    </LogoutLink>
                
            </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}