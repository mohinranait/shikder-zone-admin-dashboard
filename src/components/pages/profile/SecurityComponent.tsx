import { changePassword } from "@/actions/userApi";
import { Button } from "@/components/ui/button";
import { TUserType } from "@/types/user.type";
import { Pen } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
type Props = {
  user: TUserType;
};

const SecurityComponent = ({ user }: Props) => {
  // Local State
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState({
    password: "",
    confirmPassword: "",
  });

  // Update Password function
  const handleUpdateProfile = async () => {
    // Validation
    const newErrors: Record<string, string> = {};
    if (!profile.password) {
      newErrors.password = "Password is required";
    } else if (profile.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (!profile.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (profile.password !== profile.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (!user?._id) return;
      const data = await changePassword({
        userId: user?._id,
        password: profile?.password,
      });

      if (data?.success) {
        setIsEdit(false);

        toast.success("Password changed successfully");
        setProfile({
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold leading-none tracking-tight">
            Change Password
          </p>

          <div className="flex gap-2 items-center">
            {isEdit ? (
              <Button
                onClick={() => setIsEdit(false)}
                className="py-1 px-2 rounded h-[30px]"
                variant={"outline"}
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={() => setIsEdit(true)}
                variant={"outline"}
                className="py-1 px-3 rounded h-[30px]"
              >
                <Pen size={10} />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
      {isEdit ? (
        <div className="flex flex-col space-y-3 p-6 pt-0  pb-6">
          <div className="flex gap-3">
            <div className="min-w-[200px]">
              <p className="text-slate-400 text-sm">New Password</p>
              <input
                type="text"
                className="border border-slate-100 py-0 px-1 rounded text-sm  w-full"
                value={profile.password}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    password: e.target.value,
                  })
                }
              />
              {errors.password && (
                <p className="text-xs font-normal text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="min-w-[200px]">
              <p className="text-slate-400 text-sm">Confirm Password</p>
              <input
                type="text"
                className="border border-slate-100 py-0 px-1 rounded text-sm  w-full"
                value={profile.confirmPassword}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {errors.confirmPassword && (
                <p className="text-xs font-normal text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div>
            <Button
              onClick={handleUpdateProfile}
              className="py-1 px-3 rounded h-[30px]"
            >
              Update Password
            </Button>
          </div>
        </div>
      ) : (
        <div className="m-6 p-6 mt-0 bg-gray-100">
          <p className="font-semibold text-sm ">
            Are you sure you want to change password?
          </p>

          <p className="text-gray-600 text-sm">
            If yes, please click the{" "}
            <span
              className="text-primary font-semibold cursor-pointer "
              onClick={() => setIsEdit(true)}
            >
              Edit
            </span>{" "}
            button to proceed.
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityComponent;
