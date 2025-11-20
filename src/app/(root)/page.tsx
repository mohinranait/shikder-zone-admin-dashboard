import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen bg-slate-50 flex items-center justify-center">
      <div className=" w-[400px] sm:max-w-[400px] relative bg-white rounded border border-gray-100 p-5">
        <div>
          <div className="w-[100px] h-[100px] left-2/4 -translate-x-2/4 absolute p-1 border border-gray-100 overflow-hidden rounded-full bg-white -top-12">
            <Image
              src={"/images/avater.jpg"}
              alt="Image"
              width={100}
              height={100}
              className="rounded-full bg-white"
            />
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
