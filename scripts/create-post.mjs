#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise(resolve => rl.question(query, resolve));
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

async function createPost() {
  console.log('Creating a new blog post...');
  const title = await askQuestion('Enter post title: ');
  const summary = await askQuestion('Enter a short summary: ');
  const tags = await askQuestion('Enter tags (comma-separated): ');
  
  rl.close();

  const slug = slugify(title);
  const date = new Date().toISOString().split('T')[0];
  const tagsArray = tags.split(',').map(tag => tag.trim());

  const frontmatter = `---
title: "${title}"
date: "${date}"
tags: [${tagsArray.map(t => `"${t}"`).join(', ')}]
summary: "${summary}"
---

## Start writing your post here...
`;

  const postsDir = path.join(process.cwd(), '_posts');
  if (!fs.existsSync(postsDir)){
      fs.mkdirSync(postsDir);
  }

  const filePath = path.join(postsDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`Error: A post with the slug "${slug}" already exists at ${filePath}`);
    return;
  }

  fs.writeFileSync(filePath, frontmatter, 'utf8');
  console.log(`\nSuccess! New post created at: ${filePath}`);
}

createPost();
