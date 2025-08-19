"use client";

import { useState, useMemo } from 'react';
import type { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm) {
      return posts;
    }
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [posts, searchTerm]);

  return (
    <div>
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 text-lg py-6 rounded-full"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No posts found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
}
