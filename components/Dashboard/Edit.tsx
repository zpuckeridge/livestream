"use client";

import { useState } from "react";

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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

import { Eye } from "lucide-react";

interface Props {
  assetId: string;
  title: string;
  description: string;
  tag: string;
  visibility: boolean;
}

export default function Edit({
  assetId,
  title: initialTitle,
  description: initialDescription,
  tag: initialTag,
  visibility: initialVisibility,
}: Props) {
  const [title, setTitle] = useState<string>(initialTitle ?? "");
  const [description, setDescription] = useState<string>(
    initialDescription ?? ""
  );
  const [tag, setTag] = useState<string>(initialTag ?? "");
  const [visibility, setVisibility] = useState<boolean>(
    initialVisibility ?? false
  );

  const { toast } = useToast();

  const handleSubmit = async () => {
    await fetch("/api/db/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        asset_id: assetId,
        title: title,
        description: description,
        tag: tag,
        visibility: visibility,
      }),
    });

    toast({
      title: "Saved!",
      description: "Your changes have been saved! 🎉",
    });
  };

  return (
    <table className="w-full my-1">
      <tbody>
        <tr>
          <td>{title}</td>
          <td className="text-right">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Edit
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
                    <Input
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
                  <div className="flex items-center space-x-4 rounded-md border p-4">
                    <Eye />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Visibility
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Should this video be public?
                      </p>
                    </div>
                    <Switch
                      id="visibility"
                      checked={visibility}
                      onCheckedChange={(checked: boolean) =>
                        setVisibility(checked)
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={handleSubmit} size="sm">
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
