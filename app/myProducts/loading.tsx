import { LoadingPageHeading } from "@/app/components/ProductCard";


export default function LoadingFile(){
    return(
        <div className="max-w-7xl px:4 mx-auto sm:px-8 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 lg:grid-cols-3">
                <LoadingPageHeading/>
                <LoadingPageHeading/>
                <LoadingPageHeading/>
                <LoadingPageHeading/>
                <LoadingPageHeading/>
                <LoadingPageHeading/>
            </div>
        </div>
    )
}