"use client";

import parse, { domToReact, Element } from 'html-react-parser';
import { CodeBlock } from '@/components/code-block';

type PostContentClientProps = {
  content: string;
};

export function PostContentClient({ content }: PostContentClientProps) {
  const options = {
    replace: (domNode: any) => {
      if (domNode instanceof Element && domNode.name === 'pre') {
        const codeElement = domNode.children.find(
          (child: any) => child.name === 'code'
        );
        if (codeElement && codeElement.children.length > 0) {
          const codeString = domToReact(codeElement.children);
          return <CodeBlock code={String(codeString)} />;
        }
      }
      return domNode;
    },
  };

  return (
    <div className="prose lg:prose-xl dark:prose-invert">
      {parse(content, options)}
    </div>
  );
}
