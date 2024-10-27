import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface iPropApp{
    id:number,
    name:string,
    title:string,
    image:ReactNode
}

export const categoryName:iPropApp[] =[
    {
        id:0,
        name: "template",
        title: "Template",
        image: <Globe/>

    },
    {
        id:1,
        name: "uikits",
        title: "UI Kits",
        image: <ChefHat/>

    },
    {
        id:2,
        name: "icons",
        title: "Icons",
        image: <PartyPopper/>

    }
]