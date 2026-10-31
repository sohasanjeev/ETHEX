const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const filesToUpdate = [
  'app/page.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
  'app/results/page.tsx',
  'app/scholarships/page.tsx',
  'components/layout/Footer.tsx',
  'lib/services/dataService.ts',
];

for (const relPath of filesToUpdate) {
  const fullPath = path.join(root, relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace tel:9607035688 with tel:9112233995
  content = content.replace(/tel:9607035688/g, 'tel:9112233995');
  // Replace +91 9607035688 with +91 91122 33995
  content = content.replace(/\+91\s*9607035688/g, '+91 91122 33995');
  // Replace remaining 9607035688 with 9112233995
  content = content.replace(/9607035688/g, '9112233995');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated phone number in ${relPath}`);
}
