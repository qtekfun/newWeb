export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string; // This will be HTML content
};
