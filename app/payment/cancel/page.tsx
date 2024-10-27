import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage(){
    return(
    <section className="min-h-[80vh] w-full flex items-center justify-center">
        <Card className="w-[350px]">
        <div className="p-6">
            <div className="w-full flex justify-center">
                <XCircle className="rounded-full w-12 h-12 bg-red-500/30 text-red-500 p-2"/>
            </div>
            <div className="mt-3 sm:mt-5 text-center w-full">
                <h3 className="text-lg leading-6 font-medium">Payment Cancelled</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                    Something went wrong with your Payment You have not been charged Please try again
                </p>
                <Button className="mt-5 sm:mt-6 w-full">
                    <Link href="/">Back to Homepage</Link>
                </Button>
            </div>
            


        </div>
        </Card>
        

    </section>
    )
}