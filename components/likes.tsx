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
          <div className="inline-flex cursor-pointer">
            {likes}
            <Heart className="my-auto ml-2 hover:text-red-500 transition-all duration-200" />
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
          <div className="text-red-500 inline-flex">
            {likes + 1}
            <Heart className="my-auto ml-2" />
          </div>
        ) : (
          <div className="inline-flex space-x-2">
            <div>{likes}</div>
            <Heart className="my-auto hover:text-red-500 transition-all duration-200" />
          </div>
        )}
      </button>
    );
  }
}
