import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFile(){
    return (
        <div className="mx-auto max-w-7xl px-4 md:px-8">
            <Card>
                <CardHeader className="h-[1000px]">
                    <Skeleton className="w-full h-full"></Skeleton>
                </CardHeader>
            </Card>

        </div>
    )
}