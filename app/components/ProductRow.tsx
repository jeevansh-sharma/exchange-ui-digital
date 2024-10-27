import Link from "next/link";
import prisma from "../lib/db"
import { LoadingPageHeading, ProductCard } from "./ProductCard";


import { notFound } from "next/navigation";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";


interface iAppProps{
    category: "Newest" | "Templates" | "UI Kits" | "Icons";
}

async function getData({category}: iAppProps){
    switch (category) {
        case "Newest":{
            const data= await prisma.product.findMany({
                
                select:{
                    name:true,
                    price:true,
                    smallDesc:true,
                    category:true,
                    image:true,
                    id:true
                },take:3,
                orderBy:{
                    createdAt: "desc"
                }
            })
            return {
                data: data,
                title: "Newest Products",
                link: "/products/all"
            }
        }            
        case "Templates":{
            const data=await prisma.product.findMany({
                where:{
                    category: "template"
                },
                select:{
                    name:true,
                    price:true,
                    smallDesc:true,
                    category:true,
                    image:true,
                    id:true
                },take:3,
                orderBy:{
                    createdAt: "desc"
                }
            })
            return {
                data: data,
                title: "Templates",
                link: "/products/template"
            }   
        }
        case "UI Kits":{
            const data= await prisma.product.findMany({
                where:{
                    category: "uikits"
                },
                select:{
                    name:true,
                    price:true,
                    smallDesc:true,
                    category:true,
                    image:true,
                    id:true
                },take:3,
                orderBy:{
                    createdAt: "desc"
                }
            })
            return {
                data: data,
                title: "UI Kits",
                link: "/products/uikits"
            }   
        }
        case "Icons":{
            const data= await prisma.product.findMany({
                where:{
                    category: "icons"
                },
                select:{
                    name:true,
                    price:true,
                    smallDesc:true,
                    category:true,
                    image:true,
                    id:true
                },take:3,
                orderBy:{
                    createdAt: "desc"
                }
            })
            return {
                data: data,
                title: "Icons",
                link: "/products/icons"
            }   
        }
        default:
            return notFound();
            
    }

    
}



export function ProductRow({category}:iAppProps){
    return(
    <section className="mt-12 mb-24">
    <Suspense fallback={<LoadingHomeProductState/>}>
    <LoadProducts category={category}/>
    </Suspense>
    
    </section>
    )
}

async function LoadProducts({category}:iAppProps){
    
    const data = await getData({category:category})
    return(
         
            <>
            <div className="md:flex md:justify-between md:items-center">
                 <h2 className="text-2xl font-extrabold tracking-tighter">{data.title}</h2>
                 <Link href={data.link} className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block">All Product<span>&rarr;</span></Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
                {
                    data.data.map((product)=>(
                        <ProductCard image={product.image} name={product.name} price = {product.price} smallDesc={product.smallDesc} id={product.id} key={product.id}/>
                    ))
                }
            </div>
            </>
    )
}

function LoadingHomeProductState(){
    return(
        <div>
            <Skeleton className="h-8 w-56"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-10">
                <LoadingPageHeading/>
                <LoadingPageHeading/>
                <LoadingPageHeading/> 

            </div>
        </div>
    )
}