"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { HeartFilledIcon } from "@radix-ui/react-icons";

interface Props {
  assetId: string | undefined;
  likes: number | 0;
}

export default function Likes({ assetId, likes }: Props) {
  const { sessionId } = useAuth();

  const { toast } = useToast();

  const [liked, setLiked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function handleClick() {
    setButtonDisabled(true);
    setLiked(true);

    await fetch(`/api/likes/${assetId}`, {
      method: "POST",
      body: JSON.stringify({ id: assetId }),
    });

    toast({
      title: "Liked!",
      description: "Thank-you for liking this video! 😍",
    });
  }

  if (!sessionId) {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="cursor-pointer hover:text-red-500 transition-all duration-200 flex gap-2 text-sm">
            {likes}
            <HeartFilledIcon className="w-4 h-4 my-auto  " />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Oops! You are not signed in!</AlertDialogTitle>
            <AlertDialogDescription>
              To like this video, you need to signed in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <SignInButton redirectUrl={`/clip/${assetId}`} />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return (
      <button onClick={handleClick} title="Like" disabled={buttonDisabled}>
        {liked ? (
          <div className="text-red-500 flex text-sm gap-2">
            {likes + 1}
            <HeartFilledIcon className="w-4 h-4 my-auto" />
          </div>
        ) : (
          <div className="flex text-sm gap-2 hover:text-red-500 transition-all duration-200">
            <div>{likes}</div>
            <HeartFilledIcon className="w-4 h-4 my-auto " />
          </div>
        )}
      </button>
    );
  }
}
