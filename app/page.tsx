import { NewwestProducts } from "./components/NewestProducts";
import { ProductCard } from "./components/ProductCard";
import { ProductRow } from "./components/ProductRow";

export default function Home() {
  return (
       <section className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-7xl text-center font-semibold">
                 <h1>Find the Best Tailwind</h1>
                 <h1 className="text-primary">Templates & Icons</h1>
                 <p className="mx-auto lg:text-lg mt-5 w-[90%] text-muted-foreground font-normal text-base">
                 Welcome to our UI FINDER! Here, you can explore a wide range of customizable icons and design elements tailored for your projects. Here, you can explore a wide range of customizable icons and design elements tailored for your projects. 
                 </p>
            </div>
             <ProductRow category="Newest"/>
             <ProductRow category="Templates"/>
             <ProductRow category="UI Kits"/>
             <ProductRow category="Icons"/>
        </section>
  );
}
