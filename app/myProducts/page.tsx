import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProductCard } from "../components/ProductCard";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId:string){
      const data=prisma.product.findMany({
        where:{
            userId:userId,
        },
        select:{
            id:true,
            image:true,
            price:true,
            smallDesc:true,
            name:true,
        }
      }
      )
      return data;
}

export default async function MyProducts(){
    noStore();
    const {getUser}= getKindeServerSession();
    const user= await getUser();
    if(!user){
        throw new Error("User Not Authenticated");
    }
    const data = await getData(user.id);
     return(
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="font-bold text-2xl">My Products</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">{
                data.map((product)=>(
                    <ProductCard image={product.image} name={product.name} price = {product.price} smallDesc={product.smallDesc} id={product.id} key={product.id}/>
                ))
                }
            </div>

        </section>
     )
}