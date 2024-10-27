import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
interface iAppProps{
    image: string[],
    name:string,
    price:number,
    smallDesc:string,
    id:string,
}
export function ProductCard({image,name,price,smallDesc,id}:iAppProps){
    return(
        <div className="rounded-lg">
            <Carousel className="w-full mx-auto">
                <CarouselContent>{

                    image.map((item,index)=>(
                        <CarouselItem key={index}>
                        <div className="relative h-[230px]">
                            
                  <Image alt="product image" src={item} fill className="w-full h-full object-cover rounded-lg"></Image>
            </div>
            
                    </CarouselItem>

                    ))
                }
                </CarouselContent>
                <CarouselPrevious className="ml-16"/>
                <CarouselNext className="mr-16"/>
            </Carousel>
            
            <div className="flex justify-between items-center mt-2">
                   <h1 className="font-semibold text-xl">{name}</h1>
                   <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">${price}</h3>
            </div>
            <p className="text-gray-600 line-clamp-2 mt-2">{smallDesc}</p>
            <Button asChild className="w-full mt-5">
                <Link href={`product/${id}`}>Learn More</Link> 
            </Button>
        </div>
    )
}
export function LoadingPageHeading(){
    return(
        <div className="flex flex-col">
            <Skeleton className="w-full h-[230px]"/>
        <div className="flex flex-col mt-2 gap-y-2">
            <Skeleton className="h-4 width-full"></Skeleton>
            <Skeleton className="h-6 width-full"></Skeleton>

        </div>

        </div>
        
           
        
    )
}