
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const postsFilePath = path.join(process.cwd(), 'src', 'lib', 'posts.ts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function createPost() {
  console.log('Creating a new blog post...');

  const title = await question('Enter post title: ');
  if (!title) {
    console.error('Title is required.');
    rl.close();
    return;
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const date = new Date().toISOString().split('T')[0];
  
  const tagsStr = await question('Enter tags (comma-separated): ');
  const tags = tagsStr.split(',').map(tag => `'${tag.trim()}'`).join(', ');

  const summary = await question('Enter a short summary: ');

  const newPostObject = `
  {
    slug: '${slug}',
    title: '${title}',
    date: '${date}',
    tags: [${tags}],
    summary: '${summary.replace(/'/g, "\\'")}',
    content: \`
      <h2 class="text-2xl font-bold mb-4">Your Title Here</h2>
      <p class="mb-4">Start writing your post content here. You can use HTML tags.</p>
    \`,
  },
];`;

  try {
    let postsFileContent = fs.readFileSync(postsFilePath, 'utf-8');
    
    // Find the closing bracket of the posts array and insert the new post before it
    const insertionPoint = postsFileContent.lastIndexOf('];');
    if (insertionPoint === -1) {
        throw new Error("Could not find the closing bracket of the posts array '];'.");
    }

    // Replace the last post's closing brace and comma with the new structure
    const lastPostRegex = /},\s*];$/s;
    if (lastPostRegex.test(postsFileContent)) {
        postsFileContent = postsFileContent.replace(lastPostRegex, `},\n${newPostObject}`);
    } else {
        // Fallback for an empty array
        const emptyArrayRegex = /const posts: Post\[] = \[\];/s;
        const newContentForEmpty = `const posts: Post[] = [\n${newPostObject.replace('];', '')}`;
        postsFileContent = postsFileContent.replace(emptyArrayRegex, newContentForEmpty);
    }

    fs.writeFileSync(postsFilePath, postsFileContent, 'utf-8');
    console.log(`\n✅ Successfully created new post: "${title}"`);
    console.log(`➡️  Check it out in src/lib/posts.ts`);

  } catch (error) {
    console.error('\n❌ Failed to create post:', error.message);
  }

  rl.close();
}

createPost();
