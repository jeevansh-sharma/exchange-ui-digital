import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";


export async function Navbar(){
    const {getUser}= getKindeServerSession();
    const user = await getUser();
    return(
        <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
        <div className="md:col-span-3">
         <Link href="/">
         
         <div className="flex items-center">
                <h1 className="text-2xl font-semibold">
                    EXCHANGE<span className="text-primary ml-1">UI</span>
                </h1>
                {/* Insert logo here, with some margin for spacing */}
                <div className="ml-2 border-2 rounded-full">
                            <Image src="/logo.png" alt="logo" height={40} width={40} className="rounded-full"/>
                        </div>
            </div>
               
         </Link> 
        </div>
        <NavbarLinks/>
       
        


        <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {
            user ? (<UserNav userName={user.given_name as string} userEmail={user.email as string} userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}/>):
            (
                <div className="flex items-center gap-x-2">
            <Button asChild>
                <LoginLink>
                Login
                </LoginLink>
            </Button>
            <Button variant="secondary" asChild>
                <RegisterLink>
                Register
                </RegisterLink>
            </Button>
                </div>
            )
        }
            
        </div> 
        <div className="md:hidden">
            <MobileMenu/>
        </div>
    </nav>

    )
}