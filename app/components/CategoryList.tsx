"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { categoryName } from "../lib/CategoryName";
import { useState } from "react";

export function CategoryList(){
    const [categoryState,setCategoryState]=useState<string|null>(null)
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" >
            <input type="hidden" name="category" value={categoryState||""}/>
            {
                categoryName.map((items)=>(
                    <div className="cursor-pointer" key={items.id}>
                        
                        <Card className={items.name===categoryState?"border-2 border-primary":"border-2 border-primary/10"} onClick={()=>setCategoryState(items.name)}>
                            <CardHeader>{items.image}<h3 className="font-medium">{items.title}</h3></CardHeader>
                        </Card>
                    </div>
                ))
            }
        </div>
    )
}