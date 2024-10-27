
import { Card } from "@/components/ui/card";
import { SellForm } from "../components/form/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";


async function getData(userId: string){
    const data= await prisma.user.findUnique({
        where:{
            id:userId,
        },
        select:{
            stripeConnectedLinked:true,
        }
    })
    if(data?.stripeConnectedLinked===false){
        redirect("/billing");
       }
    return null;
}



export default async function SellRoute(){
   const {getUser}=getKindeServerSession();
   const user= await getUser();
   if(!user){
  
    throw new Error("Page not found");
        
    
   }
   const data= await getData(user.id);
   
    return (
        <section className="mx-w-7xl mx-auto px-4 md:px-8 mb-14">
            <Card>
                  <SellForm/>
            </Card>
        </section>
    )
}