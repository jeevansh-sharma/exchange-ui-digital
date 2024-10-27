import { ProductCard } from "@/app/components/ProductCard";
import prisma from "@/app/lib/db";
import { CategoryType } from "@prisma/client";
import { notFound } from "next/navigation";

async function getData(category:string){
      let input;
      switch (category) {
        case "template":
            input="template"
            break;
        case "uikits":
            input="uikits"
            break;
        case "icons":
            input="icons"
            break;
        case "all":
            input=undefined
            break;
        default:
            return notFound();
            break;
      }
      const data=await prisma.product.findMany({
        where: input ? { category: input as CategoryType} : {},
        select:{
            id:true,
            image:true,
            price:true,
            smallDesc:true,
            name:true,
        }
      })
      return data;
}

export default async function({params}:{params:{category:string}}){
    const data= await getData(params.category)
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">{
                data.map((product)=>(
                    <ProductCard image={product.image} name={product.name} price = {product.price} smallDesc={product.smallDesc} id={product.id} key={product.id}/>
                ))
                }
            </div>

        </section>
    )
}