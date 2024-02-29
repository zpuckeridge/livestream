"use client";

import { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  Edit,
  Eye,
  Loader2,
  MoreHorizontal,
  Trash,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  asset_id: string;
  title: string;
  description: string;
  tag: string;
  visibility: boolean;
  date: Date;
}

export default function PublishEdit({
  asset_id,
  title: initialTitle,
  description: initialDescription,
  tag: initialTag,
  visibility: initialVisibility,
  date: initialDate,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [tag, setTag] = useState(initialTag);
  const [visibility, setVisibility] = useState<boolean>(initialVisibility);
  const [date, setDate] = useState<Date>(initialDate);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  async function handleSubmit() {
    await fetch("/api/db/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        asset_id: asset_id,
        title: title,
        description: description,
        tag: tag,
        visibility: visibility,
        date: date,
      }),
    });

    toast({
      title: "Saved!",
      description: "Your changes have been saved! 🎉",
    });

    router.refresh();
  }

  async function deleteVideo() {
    const res = await fetch(`/api/db/update`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        asset_id: asset_id,
      }),
    });

    if (!res?.ok) {
      toast({
        title: "Something went wrong.",
        description: `${title} was not deleted. Please try again.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Open menu</span>
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Video Metadata</DialogTitle>
            <DialogDescription>
              Make changes to video metadata.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => setDate(day as Date)}
                    initialFocus
                  />
                  {/* NEED TO FIX THE TIMEZONE HERE */}
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Eye />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Should this video be public?
                </p>
              </div>
              <Switch
                id="visibility"
                checked={visibility}
                onCheckedChange={(checked: boolean) => setVisibility(checked)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Save Changes</Button>
            <Button
              onClick={() => setShowDeleteAlert(true)}
              variant="destructive"
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this video?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are deleting {title}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);

                const deleted = await deleteVideo();

                if (deleted) {
                  startTransition(() => {
                    if (pathname.includes(asset_id)) {
                      router.push(`/`);
                    }
                    // Force a cache invalidation.
                    router.refresh();
                  });
                  toast({
                    title: "Video Deleted",
                    description: `${title} was successfully deleted.`,
                    variant: "default",
                  });
                }
                setIsLoading(false);
                setShowDeleteAlert(false);
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isMutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
