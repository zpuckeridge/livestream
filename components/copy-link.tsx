"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
    <button onClick={handleClick} title="Copy URL">
      {copied ? (
        <div className="inline-flex">
          <Check className="my-auto" />
        </div>
      ) : (
        <Copy />
      )}
    </button>
  );
}
