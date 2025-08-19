import type { Post } from '@/lib/types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg">
      <div className="flex flex-wrap gap-2 mb-2">
        {post.tags.map((tag) => (
          <Link href={`/tags/${tag}`} key={tag} className="z-10 relative">
            <Badge variant="secondary" className="hover:bg-accent">{tag}</Badge>
          </Link>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <h2 className="text-2xl font-bold mb-3">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
          <span className="absolute inset-0" aria-hidden="true"></span>
          {post.title}
        </Link>
      </h2>
      <p className="text-muted-foreground mb-4">{post.summary}</p>
      <div className="flex items-center gap-2 font-semibold text-primary">
        Read more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </article>
  );
}
