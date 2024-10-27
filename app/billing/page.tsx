import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Button } from "@/components/ui/button";
import { GetStripeDashboard, UserAccountAction } from "../actions";
import { SubmitButton } from "../components/SubmitButton";

async function getData(userID:string){
    const data=prisma.user.findUnique({
        where:{
            id:userID,
        },
        select:{
            stripeConnectedLinked: true,
        }
    })
    return data;
}

export default async function BillingRoute(){
    const {getUser} = getKindeServerSession();
    const user= await getUser();
    if(!user){
        throw new Error("This page is not authorized")
    }
    const data= await getData(user.id);
         return(
            <section className="max-w-7xl mx-auto px-4 md:px-8">
                <Card>
                    <CardHeader>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>Find all your details regarding your payment</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            data?.stripeConnectedLinked === false&&(
                                <form action={UserAccountAction}>
                                  
                                  <SubmitButton title={"Link your Account to stripe"}/>
                                </form>
                            )
                        }
                        {
                            data?.stripeConnectedLinked === true &&(
                                <form action={GetStripeDashboard}>
                                  
                                  <SubmitButton title={"View Your dashboard"}/>
                                </form>
                            )
                        }
                    </CardContent>
                </Card>

            </section>
         )
}