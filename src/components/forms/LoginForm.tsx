"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormik } from "formik";
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";
import { userLogin, userLogout } from "@/actions/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useRedux";
import { setAuthUser } from "@/redux/features/authSlice";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const data = await userLogin(values);
        if (data?.success) {
          if (
            data?.payload?.role === "Admin" ||
            data?.payload?.role === "Manager"
          ) {
            dispatch(setAuthUser(data.payload));
            router.push("/admin/dashboard");
            toast.success("Login successfull");
            setIsLoading(false);
          } else {
            await userLogout();
            toast.error("You can't login this panel");
          }
        } else {
          toast.error(data?.message || "Something went wrong");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col pt-6 gap-4">
      <div className="">
        <p className="text-lg font-semibold text-gray-900 ">Login</p>
        <p className="text-slate-600 ">This panel for admin or app authority</p>
      </div>
      <div>
        <label htmlFor="email" className="text-gray-600 text-base">
          Email
        </label>
        <div className="relative">
          <Mail
            size={18}
            className="absolute text-gray-500 left-2 top-2/4 -translate-y-2/4"
          />
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full py-1  pl-8 pr-1 border-2 border-gray-200 rounded focus-visible:outline-primary"
            placeholder="Email"
          />
        </div>
        {formik.errors.email && formik.touched.email ? (
          <p className="text-red-500 text-xs font-medium">
            {formik.errors.email}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="password" className="text-gray-600 text-base">
          Password
        </label>
        <div className="relative">
          <Lock
            size={18}
            className="absolute text-gray-500 left-2 top-2/4 -translate-y-2/4"
          />
          {isShowPass ? (
            <EyeOff
              onClick={() => setIsShowPass(false)}
              size={18}
              className="absolute text-gray-500 cursor-pointer right-2 top-2/4 -translate-y-2/4"
            />
          ) : (
            <Eye
              onClick={() => setIsShowPass(true)}
              size={18}
              className="absolute text-gray-500 cursor-pointer right-2 top-2/4 -translate-y-2/4"
            />
          )}

          <input
            type={isShowPass ? "text" : "password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full py-1 pl-8 pr-6 border-2 border-gray-200 rounded focus-visible:outline-primary"
            placeholder="Password"
          />
        </div>
        {formik.errors.password && formik.touched.password ? (
          <p className="text-red-500 text-xs font-medium">
            {formik.errors.password}
          </p>
        ) : null}
      </div>
      <div className="flex justify-between">
        <Button disabled={isLoading} className="px-6">
          {isLoading ? <LoaderCircle className="animate-spin " /> : null}
          Login
        </Button>
        <Link
          href={"/forgot"}
          className="text-nowrap text-gray-700 hover:underline"
        >
          Forgot password
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
