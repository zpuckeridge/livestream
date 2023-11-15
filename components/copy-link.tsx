"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CopyLink() {
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);

    toast({
      title: "URL Copied!",
      description: "The page URL has been copied to your clipboard.",
    });

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button onClick={handleClick}>
      {copied ? (
        <div className="flex">
          <Check className="w-4 h-4 my-auto" />
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Copy className="w-4 h-4 my-auto" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </button>
  );
}
