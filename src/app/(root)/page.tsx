import LoginForm from "@/components/forms/LoginForm";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen bg-slate-50 flex items-center gap-5 flex-col justify-center">
      <div className="flex justify-center">
        <Link href={"/"} className="inline-flex  items-center">
          {/* <Image src={"/logo.png"} width={200} height={100} alt="Logo" /> */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <span className="text-xl font-bold">
                <ShoppingCart />{" "}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary uppercase leading-6 ">
                Shider
                <span className={cn("text-gray-950 font-normal", "")}>
                  Zone
                </span>{" "}
              </h1>
              <p className="text-xs text-gray-500">Online Shopping</p>
            </div>
          </div>
        </Link>
        {/* <div className="w-[100px] h-[100px] left-2/4 -translate-x-2/4 absolute p-1 border border-gray-100 overflow-hidden rounded-full bg-white -top-12">
            <Image
              src={"/images/avater.jpg"}
              alt="Image"
              width={100}
              height={100}
              className="rounded-full bg-white"
            />
          </div> */}
      </div>
      <div className=" w-[400px] sm:max-w-[400px] relative bg-white rounded border border-gray-100 p-5">
        <LoginForm />
      </div>
    </div>
  );
}
