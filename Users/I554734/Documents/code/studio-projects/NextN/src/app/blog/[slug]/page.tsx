import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PostContentClient } from '@/components/post-content-client';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const awaitedParams = await params;
  const post = getPostBySlug(awaitedParams.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: `${post.title} | LightWrite`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;
  const post = getPostBySlug(awaitedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          {post.title}
        </h1>
        <p className="text-muted-foreground text-lg mb-4">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag}>
              <Badge variant="secondary" className="text-sm cursor-pointer hover:bg-accent">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      </header>
      
      <PostContentClient content={post.content} />
    </article>
  );
}
