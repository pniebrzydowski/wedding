import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

export async function getContentData({ id, filePath = '', locale = 'en' }) {
  const contentDirectory = path.join(process.cwd(), 'content');
  const fullPath = path.join(contentDirectory, locale, `${filePath}${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the content metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const data: any = matterResult.data;

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...data
  };
}
