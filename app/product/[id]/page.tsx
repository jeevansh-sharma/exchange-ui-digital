import { BuyProduct } from "@/app/actions";
import { ProductDescription } from "@/app/components/ProductDescription";
import { BuyButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";

async function getData(id:string){
    const data= prisma.product.findUnique({
        where:{
              id:id,
             
        },
        select:{
            image:true,
            name:true,
            productFile:true,
            desc:true,
            smallDesc:true,
            price:true,
            createdAt:true,
            category:true,
            user:{
                select:{
                    profileImage:true,
                    firstName:true,
                    id:true,
                }
            },
            id:true
        }
     })
     return data;
}

export default async function ProductPage({params,}:{
    params:{
        id:string;
        
    }
}){
    const {getUser}=getKindeServerSession();
    const user = await getUser();
    const data= await getData(params.id);

    return(
        
        <section className="max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            
              <Carousel className="lg:row-end-1 lg:col-span-4">
                <CarouselContent>
                      {
                        data?.image.map((image,index)=>(
                            <CarouselItem key={index}>
                                <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                                <Image alt="product Image" src={image as string} fill className="object-cover w-full h-full rounded-lg"></Image>
                                </div>
                            </CarouselItem>
                        ))
                      }
                </CarouselContent>
                <CarouselPrevious className="ml-16"/>
                <CarouselNext className="mr-16"/>

              </Carousel>
              <div className="max-w-2xl mx-auto  mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{data?.name}</h1>
                <p className="mt-6 text-muted-foreground">{data?.smallDesc}</p>
                <form action={BuyProduct}>
                <input type="hidden" name="id" value={data?.id}/>
                <BuyButton price={data?.price as number}/>
                </form>
                
                <div className="border-t border-gray-200 my-10 pt-10">
                    <div className="grid grid-cols-2 gap-y-3 w-full">
                          <h3 className="text-sm font-medium text-muted-foreground col-span-1">Released at:</h3>
                          <h3 className="text-sm font-medium col-span-1">{data?.createdAt.toDateString()}</h3>

                          <h3 className="text-sm font-medium text-muted-foreground col-span-1">Category:</h3>
                          <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>

                          <h3 className="text-sm font-medium text-muted-foreground col-span-1">Created By:</h3>
                          <h3 className="text-sm font-medium col-span-1">{data?.user?.firstName}</h3>
                    </div>
                    <div className="border-t border-gray-200 mt-10">

                    </div>
                </div>
              </div>
              <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                  <ProductDescription content={data?.desc as JSONContent}/>
              </div>
        </section>
    )
}
