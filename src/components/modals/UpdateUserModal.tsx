import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProfileComponent from "../pages/profile/ProfileComponent";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setSelectedUser } from "@/redux/features/userSlice";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const UpdateUserModal = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.users);
  if (!selectedUser) return null;
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        dispatch(setSelectedUser(null));
      }}
    >
      <DialogContent className="max-w-[900px] overflow-y-auto">
        <ProfileComponent user={selectedUser} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
