const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  // Story Bento Section (8)
  { id: '1542744173-8e7e53415bb0', path: 'public/images/landing/team-coding-collab.jpg' }, 
  { id: '1577896851231-70ef18881754', path: 'public/images/landing/classroom-mentoring.jpg' },
  { id: '1569420951336-7bf7d1c68437', path: 'public/images/landing/computer-training.jpg' },
  { id: '1549463959-1e3093202b54', path: 'public/images/landing/coworking-space.jpg' }, 
  { id: '1534067783741-512d0deaf5de', path: 'public/images/landing/woman-laptop-outdoor.jpg' },
  { id: '1581007871115-f14bc016e0a4', path: 'public/images/landing/tech-hub-learning.jpg' },
  { id: '1542385151-efd9000e85a4', path: 'public/images/landing/woman-coding-night.jpg' },
  { id: '1577962917762-a4deed3883d0', path: 'public/images/landing/team-group-photo.jpg' },

  // Global Industries (4)
  { id: '1600880292203-757bb62b4baf', path: 'public/images/industries/fintech.png' },
  { id: '1616530940355-351fabd9524b', path: 'public/images/industries/nollywood.png' },
  { id: '1574943320219-553eb213f72d', path: 'public/images/industries/agritech.png' },
  { id: '1521791136064-7986c2920216', path: 'public/images/industries/ecommerce.png' },

  // Before After Section (2)
  { id: '1541534741688-6078c6bfb5c5', path: 'public/images/landing/pair-programming.jpg' },
  { id: '1531545514256-b1400bc00f31', path: 'public/images/landing/happy-students-laptops.jpg' },

  // Community Section (1)
  { id: '1529156069898-49953e39b3ac', path: 'public/images/landing/community-hero.jpg' },

  // AI Experience Section (2)
  { id: '1571260899304-425eee4c7efc', path: 'public/images/landing/workshop-collab.jpg' },
  { id: '1531384441138-2736e62e0919', path: 'public/images/landing/solo-laptop.jpg' },

  // Problem Solution Section (4)
  { id: '1556761175-5973dc0f32e7', path: 'public/images/landing/ps-business.jpg' },
  { id: '1543269865-cbf427effbad', path: 'public/images/landing/ps-creative.jpg' },
  { id: '1522202176988-66273c2fd55f', path: 'public/images/landing/ps-chatgpt.jpg' },
  { id: '1531403009284-440f080d1e12', path: 'public/images/landing/ps-prompt.jpg' },

  // Showcase Section (3)
  { id: '1573496359142-b8d87734a5a2', path: 'public/images/landing/show-learning.jpg' },
  { id: '1500648767791-00dcc994a43e', path: 'public/images/landing/show-workspace.jpg' },
  { id: '1524178232363-1fb2b075b655', path: 'public/images/landing/show-community.jpg' },

  // Global Vision Section (3)
  { id: '1576267423445-b2e0074d68a4', path: 'public/images/landing/vision-connected.jpg' },
  { id: '1618828665011-0abd973f7bb8', path: 'public/images/landing/vision-hubs.jpg' },
  { id: '1590845947670-c009801ffa74', path: 'public/images/landing/vision-builder.jpg' },
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
};

async function run() {
  const dirs = new Set(images.map(i => path.dirname(i.path)));
  for (const d of dirs) {
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, { recursive: true });
    }
  }

  const promises = images.map(async (img) => {
    const url = `https://images.unsplash.com/photo-${img.id}?w=1600&h=1000&fit=crop&q=95`;
    console.log(`Downloading ${img.path}...`);
    try {
      await downloadImage(url, img.path);
      console.log(`Done: ${img.path}`);
    } catch (e) {
      console.error(`Error downloading ${img.path}:`, e.message);
    }
  });
  
  await Promise.all(promises);
  console.log('All downloads completed.');
}

run();
