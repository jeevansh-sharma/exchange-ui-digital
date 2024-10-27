"use server";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {z} from 'zod'
import prisma from './lib/db';
import { error } from 'console';
import { CategoryType } from '@prisma/client';
import { stripe } from './lib/stripe';
import { redirect } from 'next/navigation';
import localFont from 'next/font/local';

export type State={
    status: "error"|"success"|undefined,
    errors?: {
        [key:string]: string[] 
    },
    message?: string | null,

}
const ProductSchema=z.object({
    name: z.string().min(3,{message:"minimum length of name is 3"}),
    category: z.string().min(1,{message:"category is required"}),
    price: z.number().min(1,{message:"price should be greater than 1"}),
    smallDescription: z.string().min(10,{message: "description should have string of length more than 10"}),
    description: z.string().min(10,{message: "description should have string of length more than 10"}),
    images:z.array(z.string(),{message: "image is required"}),
    files: z.string().min(1,{message: "file is required"})

})

const SettingSchema=z.object({
    firstName: z.string().min(3,{message:"minimmum length should be 3"}).or(z.literal("")).optional(),
    lastName: z.string().min(3,{message:"minimmum length should be 3"}).or(z.literal("")).optional(),
})

export async function SellProduct( prevState: any,formData: FormData) {
    const {getUser} =getKindeServerSession()
    const user = await getUser();
      
    if(!user || user===null ||!user.id){
         throw new Error("something went wrong...");
    }
    const ValidateProduct = ProductSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
        images:JSON.parse(formData.get("images") as string ),
        files:formData.get("files") ,
    })
    
    if(!ValidateProduct.success){
         const state: State = {
            status: "error",
            errors: ValidateProduct.error.flatten().fieldErrors,
            message: "Oops there is some kind of error"
         }
         return state;
    }
   const data= await prisma.product.create(
        {
            data:{
                name: ValidateProduct.data.name,
                category: ValidateProduct.data.category as CategoryType,
                price: ValidateProduct.data.price,
                image: ValidateProduct.data.images,
                productFile: ValidateProduct.data.files,
                desc: JSON.parse(ValidateProduct.data.description),
                smallDesc:ValidateProduct.data.smallDescription,
                userId: user.id
            }
        }
    )
   
    redirect(`/product/${data.id}`)
}

export async function SettingPage(prevState: any,formData:FormData){
    const {getUser} = getKindeServerSession();
    const user= await getUser();

    if(!user){
        throw new Error("There is some kind of error");
    }
    
    const ValidateSetting=SettingSchema.safeParse({
         firstName: formData.get("firstName"),
         lastName: formData.get("lastName"),
    })

    if(!ValidateSetting.success){
        const state: State = {
            status: "error",
            errors: ValidateSetting.error.flatten().fieldErrors,
            message: "Oops there is some kind of error"
        }
        return state;
    }
    const data = await prisma.user.update({
        where:{
            id: user.id,
        },
        data:{
            firstName: ValidateSetting.data.firstName,
            lastName: ValidateSetting.data.lastName,
        }
    })
    const state: State = {
        status: "success",
        message: "Your changes have been made"
    };
    return state;
}

export async function BuyProduct(formData: FormData){
    const id= formData.get("id") as string;
    const data= await prisma.product.findUnique({
        where:{
            id: id,
        },
        select:{
            name:true,
            smallDesc:true,
            price:true,
            image:true,
            user:{
                select:{
                    connectedAccountId:true,
                }
            }
        }
    })
    const session = await stripe.checkout.sessions.create({
        mode:"payment",
        line_items:[
            {
            price_data:{
                currency:"usd",
                unit_amount:Math.round((data?.price as number)*100),
                product_data:{
                    name: data?.name as string,
                    description:data?.smallDesc,
                    images:data?.image
                }
            },
            quantity:1,
        }
        ],
        payment_intent_data:{
             application_fee_amount:Math.round((data?.price as number)*100) *0.1,
             transfer_data:{
                destination: data?.user?.connectedAccountId as string
             }
        },
        success_url:"http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/cancel",
        
    });
    return redirect(session.url as string);
}

export async function UserAccountAction(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        throw new Error("There is some kind of error");
    }
    
    const data = await prisma.user.findUnique({
        where:{
            id:user.id,
        },
        select:{
            connectedAccountId: true,
        }
    });

    const accountLink = await stripe.accountLinks.create({
        account: data?.connectedAccountId as string,
        refresh_url: "http://localhost:3000/billing",
        return_url: `http://localhost:3000/return/${data?.connectedAccountId}`,
        type: 'account_onboarding'
    })
    return redirect(accountLink.url);
}

export async function GetStripeDashboard(formData:FormData){
    const {getUser} = getKindeServerSession();
    const user= await getUser();

    if(!user){
        throw new Error("There is some kind of error");
    }
    const data=await  prisma.user.findUnique({
        where:{
            id:user.id,
        },
        select:{
            connectedAccountId:true,
        }
    })

    const loginLink= await stripe.accounts.createLoginLink(
        data?.connectedAccountId as string
    )
    redirect(loginLink.url);

}