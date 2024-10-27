import ProductFile from "@/app/components/ProductFile";
import { stripe } from "@/app/lib/stripe";

import { headers } from "next/headers";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:Request){
     const body = await req.text();
     const signature= headers().get('Stripe-signature') as string;
     

     let event;

     try {
        event=stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
     } catch (_error: unknown) {
        return new Response("webhook error",{status:400})
     }

    switch (event.type) {
        case "checkout.session.completed":{
            const session =event.data.object;
            const link = session.metadata?.link;
            const email= session.customer_details?.email;
           
            const {}= await resend.emails.send({
                from: 'Exchange UI <onboarding@resend.dev>',
                to: [email as string],
                subject: "Your Product from Exchange UI",
                react: ProductFile({
                    link:link as string
                })
            })
            break;
        }
            
        default:{
            console.log("Event handling error")
        }
            break;
    }

    return new Response(null,{status:200});

}