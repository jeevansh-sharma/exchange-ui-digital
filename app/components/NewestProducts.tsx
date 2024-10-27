import Link from "next/link";
import prisma from "../lib/db"
import { ProductCard } from "./ProductCard";




export async function getData(){
    const data= prisma.product.findMany({
      
        select:{
            name:true,
            price:true,
            smallDesc:true,
            category:true,
            image:true,
            id:true
        },take:4,
        orderBy:{
            createdAt: "desc"
        }
    })
    return data;
}

export async function NewwestProducts(){
    
    const data = await getData()
    return(
         <section className="mt-12 mb-24">
            
            <div className="md:flex md:justify-between md:items-center">
                 <h2 className="text-2xl font-extrabold tracking-tighter">Newest Products</h2>
                 <Link href="#" className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block">All Product<span>&rarr;</span></Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
                {
                    data.map((product)=>(
                        <ProductCard image={product.image} name={product.name} price = {product.price} smallDesc={product.smallDesc} id={product.id} key={product.id}/>
                    ))
                }
            </div>
         </section>
    )
}