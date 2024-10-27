"use client"
import {  CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";


import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";


import { toast } from "sonner";


import { SellProduct, State } from "@/app/actions";
import { CategoryList } from "../CategoryList";
import { TipTapEditor } from "../Editor";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { SubmitButton } from "../SubmitButton";

export function SellForm(){
    const initialState:State ={status: undefined , message:""
    }
    const[state,formAction] = useFormState(SellProduct,initialState);
    const [ json,setJson]= useState<null|JSONContent>(null);
    const [images,setImages]=useState<string[]>([]);
    const [productFile,setProductFile]=useState<null|string>(null);
    useEffect(()=>{
        if(state?.status==="success"){
           toast.success(state.message);
           
        }  
        else if(state?.status==="error"){
            toast.error(state.message); 
        }
},[state])
    return(
        <form action={formAction}>
        <CardHeader>
        <CardTitle>Please sell your product with ease</CardTitle>
        <CardDescription>Please descibe about your product in detail so that it can be sold</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
                <Label>Name</Label>
                <Input type="text" placeholder="Write the name of product" name="name" required minLength={3}/>
                
                   <p className="text-destructive">{state?.errors?.["name"]?.[0]} </p>  
                    
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Category</Label>
                <CategoryList/>
                <p className="text-red-500">{state?.errors?.["category"]?.[0]}</p>
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Price</Label>
                <Input type="number" placeholder="$28" name="price"/>
                
                    <p className="text-red-500">{state?.errors?.["price"]?.[0]}</p>
                
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Small Summary</Label>
                <Textarea placeholder="Write a small summary of your product" name="smallDescription"/>
                <p className="text-red-500">{state?.errors?.["smallDescription"]?.[0]}</p>
            </div>

            <div className="flex flex-col gap-y-2">
                <input type="hidden" name="description" value={JSON.stringify(json)}/>
                <Label>Description</Label>
                <TipTapEditor setJson={setJson} json={json}/>
                <p className="text-red-500">{state?.errors?.["description"]?.[0]}</p>
            </div>
            <div className="flex flex-col gap-y-2">
                <input  name="images" type="hidden" value={JSON.stringify(images)}/>
                <Label>Upload Product Image</Label>
                <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res)=>{
                    setImages((prevImages) => [
                        ...prevImages,  // Spread the existing images
                        ...res.map((item) => item.url)  // Add new uploaded images
                    ]);
                    toast.success('your images are uploaded')
                }}  
                onUploadError={(_error:Error)=>{
                    toast.error("your images are not uploaded")
                }}
                
                />
                  <p className="text-red-500">{state?.errors?.["images"]?.[0]}</p>
                
            </div>
            <div className="flex flex-col gap-y-2">
            <input type="hidden" name="files" value={productFile ?? ""}/>
                <Label >Upload the zip file</Label>
                <UploadDropzone endpoint="fileUploader" onClientUploadComplete={(res)=>{
                     setProductFile(res[0].url)
                     toast.success('your files are uploaded')
                }}
                onUploadError={(_error:Error)=>{
                    toast.error("your files are not uploaded")
                }}
                />
                 <p className="text-red-500">{state?.errors?.["files"]?.[0]}</p>
                
            </div>
        </CardContent>
        <CardFooter>
           <SubmitButton title="Sell your Product"/>
        </CardFooter>
      </form>
    )
}