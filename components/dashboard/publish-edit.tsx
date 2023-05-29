import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { CalendarIcon, Eye, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

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

  const handleSubmit = async () => {
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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Video Metadata</DialogTitle>
          <DialogDescription>Make changes to video metadata.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tag" className="text-right">
              Tag
            </Label>
            <Input
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
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
          <DialogClose asChild>
            <Button onClick={handleSubmit} size="sm">
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
