import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { error } from "console";
import { Users } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function GET(){
    const {getUser}=getKindeServerSession();
    const user = await getUser();

    if(!user||user===null||!user.id){
        throw error ("Something went wrong.......");
    }

    let dbUser= await prisma.user.findUnique(
        {
            where:{
                id:user.id,
            }
        }
    )
    if(!dbUser){
        const account = await stripe.accounts.create({
            email: user.email as string,
            controller:{
                losses:{
                    payments:"application"
                },
                fees:{
                    payer:"application"
                },
                stripe_dashboard:{
                    type:"express",
                }
            }
        })
        dbUser = await prisma.user.create(
            {
                data:{
                    id: user.id,
                    email: user.email ?? "",
                    firstName: user.given_name??"",
                    lastName: user.family_name ?? "",
                    connectedAccountId:account.id,
                    profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                },
            }
        )
    }

    return NextResponse.redirect("http://localhost:3000")
}