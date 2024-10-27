
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "../lib/db";
import { Card } from "@/components/ui/card";
import { SettingComponent } from "../components/SettingComponent";


async function getData(userId: string){
      const data = await prisma.user.findUnique({
        where:{
            id: userId,
        },
        select:{
            lastName:true,
            firstName:true,
            email:true
        }
      })
      return data;
}

export default async function SettingPage(){
    const {getUser}= getKindeServerSession();
    const user= await getUser();
    if(!user){
        throw new Error("Not Authorised");
    }
    const data  = await getData(user.id);
    return(
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <Card>
                <SettingComponent firstName={data?.firstName as string} lastName={data?.lastName as string} email={data?.email as string}/>
            </Card>
        </section>


    )
}