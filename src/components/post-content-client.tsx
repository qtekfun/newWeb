"use client";

import { useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type PostContentClientProps = {
  content: string;
};

export function PostContentClient({ content }: PostContentClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll('pre');
      
      if (codeBlocks.length > 0 && codeBlocks[0].parentElement?.classList.contains('relative')) {
        return;
      }

      codeBlocks.forEach((pre) => {
        const code = pre.querySelector('code');
        if (code) {
          const wrapper = document.createElement('div');
          wrapper.className = 'relative group';

          const button = document.createElement('button');
          const copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
          const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-green-500"><polyline points="20 6 9 17 4 12"/></svg>';
          
          button.innerHTML = copyIcon;
          button.className = 'absolute top-3 right-3 p-2 rounded-md bg-background border text-muted-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:text-accent-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring';
          
          button.onclick = () => {
            navigator.clipboard.writeText(code.innerText).then(() => {
              button.innerHTML = checkIcon;
              toast({
                title: "Copied to clipboard!",
              });
              setTimeout(() => {
                 button.innerHTML = copyIcon;
              }, 2000);
            }).catch(() => {
              toast({
                variant: "destructive",
                title: "Failed to copy",
              });
            });
          };

          pre.parentNode?.insertBefore(wrapper, pre);
          wrapper.appendChild(pre);
          wrapper.appendChild(button);
        }
      });
    }
  }, [toast]);

  return (
    <div
      ref={contentRef}
      className="prose lg:prose-xl dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
