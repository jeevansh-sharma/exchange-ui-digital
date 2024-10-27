"use client"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { SettingPage, State } from "../actions";
import { useEffect } from "react";
import { toast } from "sonner";

interface iAppProps{
    firstName:string,
    lastName:string,
    email:string,
}

export  function SettingComponent({firstName,lastName,email}:iAppProps){
    const initialState:State = {status: undefined , message: ""}
    const [state,formAction]=useFormState(SettingPage,initialState)

    useEffect(()=>{
        if(state?.status==="success"){
           toast.success(state.message);
         
        }  
        else if(state?.status==="error"){
            toast.error(state.message); 
        }
},[state])
    return (
        <form action={formAction}>
           <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Here you can do changes to your account</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
                <Label>First Name</Label>
                <Input type="text" defaultValue={firstName} name="firstName"/>
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Last Name</Label>
                <Input type="text" defaultValue={lastName} name="lastName"/>
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input type="text" disabled defaultValue={email}/>
            </div>

        </CardContent>
        <CardFooter>
            <SubmitButton title="Update your Settings"/>
        </CardFooter>
        </form>
    )
}