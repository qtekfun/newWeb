import { getPostsByTag, getAllTags } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/post-card';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export function generateMetadata({ params }: { params: { tag: string } }): Metadata {
    const tag = decodeURIComponent(params.tag);
    return {
        title: `Posts tagged with #${tag} | LightWrite`,
        description: `Find all blog posts tagged with ${tag}.`,
    };
}


export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Posts tagged with <span className="text-primary">#{tag}</span>
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
