import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outRoot = path.join(root, "public", "work");

const zcool = (id) => `https://www.zcool.com.cn/work/${id}.html`;
const portfolio = (name) => `https://qwhe.github.io/portfolio/assets/img/${name}`;

const cases = [
  {
    id: "baidu-planetary-moon",
    title: "Baidu Planetary Moon Festival",
    client: "Baidu",
    year: "2020",
    category: "Mid-Autumn Gift System",
    hero: "https://img.zcool.cn/community/0154045f81848b11013e4584b75353.jpg?k=63e1ec41b6165ee6396988b5add038be&t=6a3bff00",
    zcool: zcool("ZNDgxOTAxNDg="),
    fallback: [portfolio("moonparty-2021.jpg"), portfolio("baidu-ai-2018.jpg")]
  },
  {
    id: "baidu-premium-dragon",
    title: "Baidu Premium Dragon Gift",
    client: "Baidu",
    year: "2020",
    category: "Dragon Boat Gift System",
    hero: "https://img.zcool.cn/community/0154ed5f808ef111013f31101d3089.jpg?k=ab1e4e7d42531fce8e4e82ff9c8d713b&t=6a3bff00",
    zcool: zcool("ZNDgxNjc5NTY="),
    fallback: [portfolio("baidu-dragon-2020.jpg"), portfolio("baidu-duanwu-2019.jpg")]
  },
  {
    id: "baidu-dragon-employee",
    title: "Baidu Dragon Boat Employee Gift",
    client: "Baidu",
    year: "2018",
    category: "Employee Gift / Typography",
    hero: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ab66f778516461.5ca6d91c23015.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ab66f778516461.5ca6d91c23015.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp/42b41a78516461.5ca6d91c2407a.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp/36322b78516461.5ca6d91c22b18.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp/38a86e78516461.5ca6d91c2359b.jpg",
      "https://cdn.dribbble.com/userupload/26409599/file/original-d8f49237ad21d559c76a79da21378692.png?resize=1200x0"
    ],
    sources: [
      { label: "Behance", url: "https://www.behance.net/gallery/78516461/2018" },
      { label: "Dribbble", url: "https://dribbble.com/shots/10747884-Dragon-Boat-Festival-for-Baidu-Typography" }
    ]
  },
  {
    id: "duxiaoman-mid-autumn",
    title: "Duxiaoman Crossing the Moon",
    client: "Du Xiaoman",
    year: "2018",
    category: "Mid-Autumn Employee Gift",
    hero: "https://img.zcool.cn/community/01b6e35ba8840ea801213dea4f1464.jpg?k=1fd8861ada9a440938f7beae6a404e16&t=6a3bff00",
    zcool: zcool("ZMzAzNjc3Mjg="),
    fallback: [portfolio("duxiaoman-moon-2018.jpg")]
  },
  {
    id: "baidu-lunar-future",
    title: "Baidu Lunar Future System",
    client: "Baidu",
    year: "2018",
    category: "Moon / Space Gift System",
    hero: "https://img.zcool.cn/community/01dca65ba388bfa801213deab808f7.jpg?k=929876d5ec32547300c5455bd7b1b71f&t=6a3bff00",
    zcool: zcool("ZMzAzNDgwODQ="),
    fallback: [portfolio("baidu-ai-2018.jpg"), portfolio("moonparty-2021.jpg")]
  },
  {
    id: "ant-ceremonial-ornament",
    title: "Ant Group Ceremonial Ornament",
    client: "Ant Group",
    year: "2020",
    category: "Business Object",
    hero: "https://img.zcool.cn/community/01f6095eb95632a80121481444254e.jpg?k=1581aad4afcf375bd1a4ca22e664fb4f&t=6a3bff00",
    zcool: zcool("ZNDQ0NTE3ODQ="),
    fallback: [
      portfolio("alipay-whale-2020.jpg"),
      "https://cdn.dribbble.com/userupload/26377094/file/original-f583a04cfd12746de4542aed7a84a364.jpg?resize=1200x0"
    ],
    sources: [{ label: "Dribbble", url: "https://dribbble.com/shots/10725896-Abstract-Ornament" }]
  },
  {
    id: "didi-incense-holder",
    title: "Didi Incense Holder",
    client: "Didi",
    year: "2018",
    category: "Ceremonial Object",
    hero: "https://img.zcool.cn/community/0138565c125afda8012092520fe03c.jpg?k=f5016169c927be89cdf78e0a9eacabaf&t=6a3bff00",
    zcool: zcool("ZMzIxMjE3NzY="),
    fallback: [portfolio("didi-coins-2018.jpg")]
  },
  {
    id: "ziroom-new-year-disco",
    title: "Ziroom New Year Disco",
    client: "Ziroom",
    year: "2019",
    category: "New Year Gift",
    hero: "https://img.zcool.cn/community/0166495e5d5244a80121651870e07e.jpg?k=182f5420b351d824ab19a7899eadd333&t=6a3bff00",
    zcool: zcool("ZNDMwODgzNTY="),
    fallback: [portfolio("disco-newyear.jpg")]
  },
  {
    id: "sogou-translator-box",
    title: "Sogou Translator Gift Box",
    client: "Sogou",
    year: "2019",
    category: "Product Gift Box",
    hero: "https://img.zcool.cn/community/01e5ab5e0b266ba8012165181f0b10.jpg?k=80dd150a0b921d80590638d918029dcc&t=6a3bff00",
    zcool: zcool("ZNDE5NTM0MDg="),
    fallback: []
  },
  {
    id: "baidu-new-year-pack",
    title: "Baidu New Year Gift Pack",
    client: "Baidu",
    year: "2017",
    category: "New Year Gift",
    hero: "https://img.zcool.cn/community/0318fff5a7331a8a80121346606dc98.jpg?k=1cf782163bfbb143b37a1aba52aa8c3f&t=6a3bff00",
    zcool: zcool("ZMjU5OTE0Mjg="),
    fallback: [portfolio("shu-newyear.jpg")]
  }
];

function extensionFromUrl(url) {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".png")) return ".png";
  if (clean.endsWith(".webp")) return ".webp";
  if (clean.endsWith(".jpeg")) return ".jpg";
  return ".jpg";
}

function cleanZcoolUrl(url) {
  return url.replace(/&amp;/g, "&");
}

function uniqueBase(url) {
  return url.split("?")[0].replace(/_(?:\d+x\d+|\d+)$/, "");
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

async function download(url, file) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(file, buffer);
}

function extractZcoolImages(html) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) return [];
  const data = JSON.parse(match[1]);
  const urls = [];

  function walk(value) {
    if (typeof value === "string") {
      const cleaned = cleanZcoolUrl(value);
      if (
        /^https?:\/\//.test(cleaned) &&
        cleaned.includes("img.zcool.cn/community/") &&
        !cleaned.includes("w_80") &&
        !cleaned.includes("w_160") &&
        !cleaned.includes("w_260") &&
        !cleaned.includes("w_520")
      ) {
        urls.push(cleaned);
      }
      return;
    }
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) value.forEach(walk);
    else Object.values(value).forEach(walk);
  }

  walk(data);

  const seen = new Set();
  return urls
    .filter((url) => url.includes("w_1280") || !url.includes("x-oss-process"))
    .filter((url) => {
      const key = uniqueBase(url);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 7);
}

async function collect() {
  await fs.mkdir(outRoot, { recursive: true });
  const manifest = [];

  for (const item of cases) {
    const dir = path.join(outRoot, item.id);
    await fs.mkdir(dir, { recursive: true });

    const urls = [];
    if (item.images) urls.push(...item.images);
    else {
      urls.push(item.hero);
      if (item.zcool) {
        try {
          const html = await fetchText(item.zcool);
          urls.push(...extractZcoolImages(html));
        } catch (error) {
          console.warn(`Could not fetch ${item.id}: ${error.message}`);
        }
      }
      urls.push(...(item.fallback || []));
    }

    const seen = new Set();
    const selected = urls.filter((url) => {
      const key = uniqueBase(url);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 7);

    const localImages = [];
    for (let index = 0; index < selected.length; index += 1) {
      const source = selected[index];
      const name = `${String(index + 1).padStart(2, "0")}${extensionFromUrl(source)}`;
      const file = path.join(dir, name);
      try {
        await download(source, file);
        localImages.push(`/work/${item.id}/${name}`);
        console.log(`${item.id}: downloaded ${name}`);
      } catch (error) {
        console.warn(`${item.id}: failed ${source} (${error.message})`);
      }
    }

    manifest.push({
      id: item.id,
      title: item.title,
      client: item.client,
      year: item.year,
      category: item.category,
      hero: localImages[0],
      images: localImages,
      sourceUrls: [
        ...(item.zcool ? [{ label: "ZCOOL", url: item.zcool }] : []),
        ...(item.sources || [])
      ]
    });
  }

  await fs.writeFile(path.join(root, "src", "case-manifest.json"), JSON.stringify(manifest, null, 2));
}

collect().catch((error) => {
  console.error(error);
  process.exit(1);
});
