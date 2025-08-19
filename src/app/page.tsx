import { getAllPosts } from '@/lib/posts';
import { PostList } from '@/components/post-list';

export default function Home() {
  const posts = getAllPosts();

  return (
    <section>
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          The <span className="text-primary">LightWrite</span> Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Insights on DevOps, cloud infrastructure, and modern software development.
        </p>
      </div>
      <PostList posts={posts} />
    </section>
  );
}
