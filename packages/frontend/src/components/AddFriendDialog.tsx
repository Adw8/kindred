import {SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddFriendDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFriend: (friendData: FormFields) => void;
}

const schema = z.object({
  name: z.string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  birthday: z.string().nonempty({ message: "Birthday is required" }),
  info: z.string().max(200, { message: "Info must be at most 200 characters long" }),
});

type FormFields = z.infer<typeof schema>;

const AddFriendDialog: React.FC<AddFriendDialogProps> = ({ open, onOpenChange, onAddFriend }) => {
  const {
      register,
      handleSubmit,
      setError,
      formState: {errors, isSubmitting},
      reset,
    } = useForm<FormFields>({resolver: zodResolver(schema)});

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a network request
      onAddFriend(data);
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      setError("root", {
        message: "Failed to add friend. Please try again.",
      })
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Friend</DialogTitle>
          <DialogDescription>
            Fill out the details below to add a new friend.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Name must be at most 50 characters long",
                },
              })}
              type="text"
              name="name"
              id="name"
              className="border rounded-md p-2"
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="birthday" className="text-sm font-medium">Birthday</label>
            <input
              {...register("birthday", {
                required: "Birthday is required",
              })}
              type="date"
              name="birthday"
              id="birthday"
              className="border rounded-md p-2"
            />
            {errors.birthday && <div className="text-red-500 text-sm">{errors.birthday.message}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="info" className="text-sm font-medium">Info</label>
            <textarea
              {...register("info", {
                maxLength: {
                  value: 200,
                  message: "Info must be at most 200 characters long",
                }
              })}
              name="info"
              id="info"
              rows={3}
              className="border rounded-md p-2"
            />
            {errors.info && <div className="text-red-500 text-sm">{errors.info.message}</div>}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Friend"}
            </Button>
          </div>
            {errors.root && (
              <div className="text-red-500 text-sm mt-2">
                {errors.root.message}
              </div>
            )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
