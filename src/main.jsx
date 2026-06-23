import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./styles.css";
import caseManifest from "./case-manifest.json";

gsap.registerPlugin(ScrollTrigger);

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const routePath = (path) => `${basePath}${path === "/" ? "/" : path}`;
const stripBasePath = (path) => {
  if (!basePath || !path.startsWith(basePath)) return path;
  return path.slice(basePath.length) || "/";
};
const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const caseCopy = {
  "baidu-planetary-moon": {
    number: "01",
    title: "Planetary Moon",
    label: "Mid-Autumn / IP Gift System",
    line: "A moon-gift system built around planetary exploration, DuBear characters, and collectible blind boxes.",
    detail: "A Mid-Autumn system that reframes the seasonal moon brief through space exploration, character storytelling, collectible structure, and packaging designed to feel like a launch object rather than a conventional gift box."
  },
  "baidu-premium-dragon": {
    number: "02",
    title: "Premium Dragon",
    label: "Dragon Boat / Premium Gift",
    line: "A high-end Dragon Boat gift box shaped by mythology, astronomy, and ceremonial craft.",
    detail: "A premium seasonal package that uses the language of flying dragons, star charts, and formal gift rituals to lift a familiar festival into a higher-touch brand object."
  },
  "baidu-dragon-employee": {
    number: "03",
    title: "Dragon Boat",
    label: "Employee Gift / Typography",
    line: "One case, multiple platforms: packaging, illustration, and festival typography merged into a single system.",
    detail: "This case consolidates the Behance project, Dribbble typography shot, and related Baidu Dragon Boat materials into one coherent employee-gift system instead of repeating it as separate works."
  },
  "duxiaoman-mid-autumn": {
    number: "04",
    title: "Crossing Moon",
    label: "Mid-Autumn / Employee Gift",
    line: "A finance-brand Mid-Autumn gift with one of the strongest public responses in the archive.",
    detail: "A high-performing Mid-Autumn project that connects brand transition, moon symbolism, and employee gifting through an object system designed for both reception and memory."
  },
  "baidu-lunar-future": {
    number: "05",
    title: "Lunar Future",
    label: "Moon / Space / Future",
    line: "A broader lunar language across AI, moon landing, aerospace, and future-facing gift narratives.",
    detail: "A lunar case cluster emphasizing how a recurring Mid-Autumn theme can change mood across AI, space, and employee storytelling while staying production-ready."
  },
  "ant-ceremonial-ornament": {
    number: "06",
    title: "Ornament",
    label: "Business Object / Sculpture",
    line: "A business gift that moves from packaging language into sculptural memory.",
    detail: "This case merges the ZCOOL Ant Group ornament and the related Dribbble abstract ornament study into one ceremonial object story, expanding the portfolio beyond flat graphics and seasonal packaging."
  },
  "didi-incense-holder": {
    number: "07",
    title: "Incense Holder",
    label: "Ceremonial Object",
    line: "A brand object with weight, ritual, and a quieter sense of occasion.",
    detail: "Selected as a counterpoint to festival packaging, this case shows how a corporate gift can carry brand memory through material presence, proportion, and daily ritual."
  },
  "ziroom-new-year-disco": {
    number: "08",
    title: "New Year Disco",
    label: "New Year Gift / Youth Culture",
    line: "A younger, louder seasonal package that gives the New Year brief a club-like pulse.",
    detail: "A New Year gift system built around disco, rhythm, and employee culture, included to balance the premium ritual cases with a more playful brand voice."
  },
  "sogou-translator-box": {
    number: "09",
    title: "Translator Box",
    label: "Product Packaging / Gift Box",
    line: "A product gift box that proves the system can work outside festival campaigns.",
    detail: "A packaging case for Sogou's translator product, selected to broaden the portfolio from holiday gifting into product-led box systems and retail-like presentation."
  },
  "baidu-new-year-pack": {
    number: "10",
    title: "New Year Pack",
    label: "New Year Gift / Brand System",
    line: "An earlier Baidu seasonal system kept as a root case for the gift archive.",
    detail: "This case keeps the long-running New Year thread visible, showing how the portfolio moved from early seasonal packaging into larger, more cinematic gift systems."
  }
};

const cases = caseManifest.map((item) => {
  const copy = caseCopy[item.id] || {};
  return {
    ...item,
    ...copy,
    slug: item.id,
    image: publicAsset(item.hero),
    gallery: item.images.map(publicAsset),
    sources: item.sourceUrls
  };
});

const zhCaseCopy = {
  "baidu-planetary-moon": {
    title: "星球月礼",
    label: "中秋 / IP 礼赠系统",
    category: "中秋礼赠系统",
    line: "围绕星球探索、DuBear 角色与收藏盲盒展开的中秋礼赠系统。",
    detail: "这个中秋项目把传统月礼转译为一次太空探索：角色叙事、收藏结构、包装开启方式与产品陈列共同组成一个更像发射任务的品牌礼物，而不是常规礼盒。"
  },
  "baidu-premium-dragon": {
    title: "龙礼系统",
    label: "端午 / 高端礼盒",
    category: "端午高端礼盒",
    line: "以神话、星象和仪式感构建的高端端午礼盒。",
    detail: "项目用飞龙、星图和正式赠礼秩序重新组织端午语境，把熟悉的节日礼品提升为更具收藏感和品牌辨识度的高触感物件。"
  },
  "baidu-dragon-employee": {
    title: "端午礼物",
    label: "员工礼 / 字体 / 插画",
    category: "员工礼与字体系统",
    line: "把包装、龙舟插画与节日字体合并为一个完整员工礼系统。",
    detail: "这个案例整合 Behance 项目、Dribbble 字体展示与相关百度端午素材，不再重复拆分平台上传内容，而是作为一个统一的员工节日礼赠系统呈现。"
  },
  "duxiaoman-mid-autumn": {
    title: "穿越月球",
    label: "中秋 / 员工礼",
    category: "中秋员工礼",
    line: "一个有强传播反馈的金融品牌中秋员工礼项目。",
    detail: "项目把品牌阶段、月亮意象和员工礼赠连接起来，通过物件系统让礼物既适合接收，也能被记住。"
  },
  "baidu-lunar-future": {
    title: "登月未来",
    label: "月亮 / 航天 / 未来感",
    category: "月亮与航天礼赠系统",
    line: "跨越 AI、登月、航天和未来叙事的月亮主题系统。",
    detail: "这是一个月亮主题案例组，展示同一中秋母题如何在 AI、太空、员工文化等不同语境中变化，同时仍然保持可生产和可交付。"
  },
  "ant-ceremonial-ornament": {
    title: "纪念摆件",
    label: "商务礼 / 雕塑物件",
    category: "商务纪念物件",
    line: "从包装语言延伸到雕塑记忆的商务礼物。",
    detail: "这个案例把蚂蚁集团纪念摆件与相关抽象装饰研究合并为一个物件叙事，让作品集从平面与节日包装扩展到更具重量的纪念物。"
  },
  "didi-incense-holder": {
    title: "香器礼物",
    label: "仪式物件",
    category: "仪式物件",
    line: "一个带有重量、仪式和安静场景感的品牌物件。",
    detail: "它作为节日包装之外的补充案例，展示企业礼物如何通过材质、比例和日常仪式形成品牌记忆。"
  },
  "ziroom-new-year-disco": {
    title: "新年迪斯科",
    label: "新年礼 / 年轻文化",
    category: "新年礼盒系统",
    line: "用更年轻、更有节奏的方式处理新年礼盒。",
    detail: "这是一个围绕迪斯科、节奏和员工文化建立的新年礼赠系统，用来平衡作品集中偏高级仪式感的案例，补充更轻快的品牌声音。"
  },
  "sogou-translator-box": {
    title: "翻译盒子",
    label: "产品包装 / 礼盒",
    category: "产品礼盒包装",
    line: "一个证明系统方法同样适用于产品礼盒的包装案例。",
    detail: "这是搜狗翻译产品的礼盒包装案例，扩展了作品集从节日礼赠到产品型盒装系统与零售化展示的范围。"
  },
  "baidu-new-year-pack": {
    title: "新年礼盒",
    label: "新年礼 / 品牌系统",
    category: "新年品牌礼盒",
    line: "一个作为礼赠档案起点保留的百度早期新年项目。",
    detail: "这个案例保留了长期新年礼赠线索，展示作品如何从早期节日包装逐渐走向更完整、更具叙事感的品牌礼赠系统。"
  }
};

const localizeCase = (item, language) => {
  if (language !== "zh") return item;
  return { ...item, ...(zhCaseCopy[item.slug] || {}) };
};

const uiCopy = {
  en: {
    language: "en",
    nav: ["Works", "Method", "Contact"],
    brand: "Jero Zhou",
    heroName: ["Jero", "Zhou"],
    langTitle: "Switch to Chinese",
    langShort: "CN",
    wechatTitle: "WeChat QR code",
    wechatCta: "Contact me on WeChat",
    emailTitle: "Email Jero",
    city: "Beijing",
    heroKicker: "Visual Direction / Packaging / Production",
    heroLine: "Brands, made tangible.",
    heroBody: "Thirteen years shaping premium gift boxes, collectible objects, IP extensions, and production-ready brand systems.",
    scroll: "scroll",
    introKicker: "A catalogue of seasonal systems",
    introTitle: "The brief repeats every festival. The answer should never feel repeated.",
    introBody: "The portfolio is edited as a case library, not a platform dump: repeated uploads are merged, stronger sources are retained, and each case keeps its provenance.",
    worksBody: "Ten deduplicated cases, selected from ZCOOL, Behance, Dribbble, and the original portfolio, then rebuilt as local project pages.",
    worksTitle: "Works",
    overview: "Project overview",
    client: "Client",
    year: "Year",
    type: "Type",
    role: "Role",
    roleValue: "Direction / Packaging / Production",
    sources: "Sources",
    caseNote: "The following images are arranged as a continuous project page, keeping the original case rhythm intact instead of compressing the work into a masonry grid.",
    back: "Back to index",
    next: "Next case",
    openProject: "Open project",
    narrativeKicker: "From drawing to shelf",
    narrativeLines: ["Most designers", "deliver files.", "Jero delivers", "730,000", "approved objects."],
    methodKicker: "Method",
    methodTitle: "From concept to shipment",
    methodBody: "The work does not end at a render. It moves through material, sample, factory, inspection, and handoff.",
    methods: [
      ["01", "Strategic Framing", "Define the audience, occasion, budget, and emotional role before a single object is selected."],
      ["02", "Visual Direction", "Build a restrained visual language across structure, palette, typography, illustration, and narrative."],
      ["03", "Object Sourcing", "Match the idea with the right carrier, supplier, material, finish, and production tolerance."],
      ["04", "Prototype Control", "Use samples to test proportion, touch, opening rhythm, print accuracy, and packing logic."],
      ["05", "Factory Supervision", "Monitor color, craft, assembly, defects, and the quiet details that drawings cannot guarantee."],
      ["06", "Delivery System", "Shape the final handoff: packaging, campaign assets, photography, and launch-ready communication."]
    ],
    seriesKicker: "Series index",
    seriesTitle: "Related systems",
    archiveKicker: "Archive",
    archiveBody: "Earlier and supporting works remain visible without diluting the featured case narrative.",
    queued: "Queued",
    contactKicker: "Contact",
    contactEmail: "qwhe@foxmail.com",
    contactLinks: ["WECHAT", "BEHANCE", "DRIBBBLE", "ZCOOL"],
    contactLegal: ["PORTFOLIO V2", "BEIJING"],
    copyright: "© 2026"
  },
  zh: {
    language: "zh",
    nav: ["作品", "方法", "联系"],
    brand: "周游",
    heroName: ["周游"],
    langTitle: "切换到英文",
    langShort: "EN",
    wechatTitle: "微信二维码",
    wechatCta: "在微信上与我联系",
    emailTitle: "发送邮件",
    city: "北京",
    heroKicker: "视觉方向 / 包装系统 / 生产落地",
    heroLine: "把品牌，做成可以拿在手里的东西。",
    heroBody: "十三年品牌礼盒、纪念物件、IP 衍生与量产交付经验，从概念到工厂现场都能推进。",
    scroll: "滚动",
    introKicker: "节庆礼赠系统案例库",
    introTitle: "节日 brief 会重复，但答案不应该重复。",
    introBody: "这个作品集不是平台作品堆叠，而是把重复发布的案例合并、保留更强素材，并为每个项目留下来源。",
    worksBody: "从站酷、Behance、Dribbble 与原作品集整理出 10 个去重案例，并重建为本地项目页。",
    worksTitle: "作品",
    overview: "项目概览",
    client: "客户",
    year: "年份",
    type: "类型",
    role: "角色",
    roleValue: "视觉方向 / 包装设计 / 生产落地",
    sources: "来源",
    caseNote: "以下图片按完整项目页的节奏连续展示，尽量保留原案例阅读顺序，而不是压缩成瀑布流。",
    back: "返回首页",
    next: "下一个案例",
    openProject: "打开项目",
    narrativeKicker: "从图纸到货架",
    narrativeLines: ["多数设计师", "交付文件。", "周游交付", "730,000", "件合格实物。"],
    methodKicker: "方法",
    methodTitle: "从概念到交付",
    methodBody: "作品不会停在效果图。它要继续经过材料、打样、工厂、验收和最终交付。",
    methods: [
      ["01", "策略定义", "先明确受众、场景、预算和情绪角色，再决定具体物件。"],
      ["02", "视觉方向", "建立克制但有辨识度的结构、色彩、字体、插画和叙事语言。"],
      ["03", "选品打样", "把创意匹配到合适载体、供应商、材料、工艺和生产容差。"],
      ["04", "样品控制", "通过样品验证比例、手感、开启节奏、印刷准确度和装箱逻辑。"],
      ["05", "工厂监修", "跟进颜色、工艺、组装、瑕疵和图纸之外的细节。"],
      ["06", "交付传播", "整理最终交付：包装、传播素材、摄影和上线沟通。"]
    ],
    seriesKicker: "系列索引",
    seriesTitle: "相关系统",
    archiveKicker: "档案",
    archiveBody: "早期和辅助作品保留为线索，但不削弱精选案例的叙事。",
    queued: "候选",
    contactKicker: "联系",
    contactEmail: "qwhe@foxmail.com",
    contactLinks: ["微信", "BEHANCE", "DRIBBBLE", "站酷"],
    contactLegal: ["作品集 V2", "北京"],
    copyright: "© 2026"
  }
};

const caseAtmospheres = {
  "baidu-planetary-moon": ["#d8c5a3", "#26364a"],
  "baidu-premium-dragon": ["#d5b887", "#7a211f"],
  "baidu-dragon-employee": ["#efe2c4", "#263f5f"],
  "duxiaoman-mid-autumn": ["#f0d1a9", "#2f718f"],
  "baidu-lunar-future": ["#c7d7dd", "#142c3d"],
  "ant-ceremonial-ornament": ["#e7ddd0", "#151515"],
  "didi-incense-holder": ["#e4d5c4", "#76583d"],
  "ziroom-new-year-disco": ["#e5c477", "#77212b"],
  "sogou-translator-box": ["#d9d0c4", "#26364a"],
  "baidu-new-year-pack": ["#e3b294", "#8a241f"]
};

const series = [
  {
    title: "Dragon Boat Systems",
    label: "2018-2020 / Baidu / ByteStyle",
    line: "Premium boxes, employee gifts, festival typography, and branded derivatives merged as one evolving ritual language.",
    cases: ["baidu-premium-dragon", "baidu-dragon-employee"]
  },
  {
    title: "Mid-Autumn Systems",
    label: "2018-2022 / Baidu / Du Xiaoman / Tencent",
    line: "Moon, AI, finance, aerospace, and IP storytelling across multiple seasonal gift editions.",
    cases: ["baidu-planetary-moon", "duxiaoman-mid-autumn", "baidu-lunar-future"]
  },
  {
    title: "New Year Systems",
    label: "2017-2023 / Baidu / Ziroom / Yiche / Tencent",
    line: "A recurring red brief resolved through different brand personalities and cultural tempos.",
    cases: ["ziroom-new-year-disco", "baidu-new-year-pack"]
  },
  {
    title: "Ceremonial Objects",
    label: "2018-2020 / Ant Group / Didi / Tencent",
    line: "Objects with weight: ornaments, incense holders, coins, trophies, and commemorative business gifts.",
    cases: ["ant-ceremonial-ornament", "didi-incense-holder"]
  }
];

const zhSeries = [
  {
    title: "端午系统",
    label: "2018-2020 / 百度 / ByteStyle",
    line: "高端礼盒、员工礼、节日字体和品牌衍生物，共同形成持续演进的节日仪式语言。"
  },
  {
    title: "中秋系统",
    label: "2018-2022 / 百度 / 度小满 / 腾讯",
    line: "围绕月亮、AI、金融、航天和 IP 叙事展开的多版本中秋礼赠系统。"
  },
  {
    title: "新年系统",
    label: "2017-2023 / 百度 / 自如 / 易车 / 腾讯",
    line: "同一个红色节日 brief，在不同品牌性格和文化节奏中被重新解答。"
  },
  {
    title: "仪式物件",
    label: "2018-2020 / 蚂蚁集团 / 滴滴 / 腾讯",
    line: "有重量的物件：摆件、香器、纪念币、奖杯和商务纪念礼。"
  }
];

const archive = [
  ["Baidu New Year Gift Pack", "2017", "ZCOOL", "https://www.zcool.com.cn/work/ZMjU5OTE0Mjg=.html"],
  ["Baidu Direct Sales Dragon Boat Gift", "2019", "ZCOOL", "https://www.zcool.com.cn/work/ZMzY0NjAzNTI=.html"],
  ["ByteStyle Dragon Boat Derivatives", "2020", "ZCOOL / Dribbble", "https://www.zcool.com.cn/work/ZNDQ0NTIwMTI=.html"],
  ["Tencent Q2 Product Set", "2020", "ZCOOL", "https://www.zcool.com.cn/work/ZNDMxNjk2MDg=.html"],
  ["Didi Incense Holder", "2018", "ZCOOL", "https://www.zcool.com.cn/work/ZMzIxMjE3NzY=.html"],
  ["Honor of Kings Peripheral Objects", "2017", "ZCOOL", "https://www.zcool.com.cn/work/ZMjQzODExODQ=.html"],
  ["VR Glasses Box", "2018", "ZCOOL", "https://www.zcool.com.cn/work/ZMjYzOTA0MjQ=.html"],
  ["Sohu Calendar", "2015", "ZCOOL", "https://www.zcool.com.cn/work/ZMjQyOTI0NTY=.html"],
  ["Weibo H5 Experiments", "2016", "ZCOOL", "https://www.zcool.com.cn/work/ZMjQyOTM3NzI=.html"]
];

const zhArchive = [
  ["百度新年礼盒", "2017", "站酷"],
  ["百度直销端午礼", "2019", "站酷"],
  ["ByteStyle 端午衍生物", "2020", "站酷 / Dribbble"],
  ["腾讯 Q2 产品套装", "2020", "站酷"],
  ["滴滴香器", "2018", "站酷"],
  ["王者荣耀周边物件", "2017", "站酷"],
  ["VR 眼镜盒", "2018", "站酷"],
  ["搜狐日历", "2015", "站酷"],
  ["微博 H5 实验", "2016", "站酷"]
];

function useRoute() {
  const [path, setPath] = useState(stripBasePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(stripBasePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, "", routePath(nextPath));
    setPath(nextPath);
    window.scrollTo({ top: 0 });
  };

  return { path, navigate };
}

function App() {
  const rootRef = useRef(null);
  const { path, navigate } = useRoute();
  const [language, setLanguage] = useState("en");
  const t = uiCopy[language];
  const workSlug = path.match(/^\/works\/([^/]+)\/?$/)?.[1];
  const activeWork = cases.find((item) => item.slug === workSlug);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      smoothWheel: true,
      wheelMultiplier: 0.82
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      gsap
        .timeline()
        .to(".js-nav", { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }, 0)
        .to(".js-hero-bg", { scale: 1.03, duration: 2.2, ease: "power3.out" }, 0)
        .to(".js-hero-line", { opacity: 1, y: 0, duration: 1, stagger: 0.11, ease: "power3.out" }, 0.15)
        .to(".js-hero-meta", { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.55);

      gsap.utils.toArray(".js-parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax || 10),
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      gsap.utils.toArray(".js-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" }
          }
        );
      });

      gsap.fromTo(
        ".js-narrative-line",
        { opacity: 0.16, y: 110, rotateX: 16 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".narrative",
            start: "top 68%",
            end: "bottom 48%",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        ".js-method",
        { opacity: 0, x: 34 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".method-list", start: "top 76%" }
        }
      );
    }, rootRef);

    const depthItems = [...document.querySelectorAll("[data-depth]")].map((el) => ({
      el,
      x: gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" }),
      depth: Number(el.dataset.depth || 10)
    }));
    const tiltTitles = [...document.querySelectorAll(".js-tilt-title")].map((el) => ({
      el,
      rotateX: gsap.quickTo(el, "rotateX", { duration: 0.7, ease: "power3.out" }),
      rotateY: gsap.quickTo(el, "rotateY", { duration: 0.7, ease: "power3.out" }),
      x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" })
    }));

    const onMouseMove = (event) => {
      const relX = event.clientX / window.innerWidth - 0.5;
      const relY = event.clientY / window.innerHeight - 0.5;
      depthItems.forEach((item) => {
        item.x(relX * item.depth);
        item.y(relY * item.depth);
      });
      tiltTitles.forEach((item) => {
        item.rotateY(relX * 3.2);
        item.rotateX(relY * -2.4);
        item.x(relX * 10);
        item.y(relY * 5);
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
    };
  }, [path]);

  return (
    <main ref={rootRef} className={`min-h-screen bg-white text-black lang-${t.language}`}>
      <Cursor />
      <div className="noise" />
      <Header language={language} setLanguage={setLanguage} navigate={navigate} t={t} />
      {activeWork ? <WorkDetail work={activeWork} navigate={navigate} t={t} /> : <Home navigate={navigate} t={t} />}
    </main>
  );
}

function Cursor() {
  useEffect(() => {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMouseMove = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event) => {
      if (event.target.closest("[data-cursor='view']")) document.body.classList.add("cursor-view");
    };

    const onOut = (event) => {
      if (event.target.closest("[data-cursor='view']")) document.body.classList.remove("cursor-view");
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  );
}

function Header({ language, setLanguage, navigate, t }) {
  const go = (event, path) => {
    event.preventDefault();
    if (path.startsWith("#")) {
      if (window.location.pathname !== "/") {
        navigate("/");
        requestAnimationFrame(() => document.querySelector(path)?.scrollIntoView());
      } else {
        document.querySelector(path)?.scrollIntoView();
      }
      return;
    }
    navigate(path);
  };

  return (
    <header className="js-nav fixed left-0 top-0 z-50 flex w-full translate-y-[-16px] items-center justify-between px-5 py-5 opacity-0 md:px-10">
      <a href={routePath("/")} onClick={(event) => go(event, "/")} className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-white md:text-base">
        {t.brand}
      </a>
      <nav className="hidden items-center gap-10 rounded-full bg-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.08em] text-white backdrop-blur-md md:flex">
        <a className="nav-link" href="#works" onClick={(event) => go(event, "#works")}>{t.nav[0]}</a>
        <a className="nav-link" href="#method" onClick={(event) => go(event, "#method")}>{t.nav[1]}</a>
        <a className="nav-link" href="#contact" onClick={(event) => go(event, "#contact")}>{t.nav[2]}</a>
      </nav>
      <div className="header-tools">
        <button className="tool-button lang-button" type="button" aria-label={t.langTitle} title={t.langTitle} onClick={() => setLanguage(language === "en" ? "zh" : "en")}>
          <span>{t.langShort}</span>
        </button>
        <div className="wechat-tool">
          <button className="tool-button" type="button" aria-label={t.wechatTitle} title={t.wechatTitle}>
            <QrIcon />
          </button>
          <div className="wechat-popover" role="img" aria-label={t.wechatTitle}>
            <img src={publicAsset("/contact/wechat-qr.png")} alt={t.wechatTitle} />
            <p>{t.wechatCta}</p>
          </div>
        </div>
        <a className="tool-button" href="mailto:qwhe@foxmail.com" aria-label={t.emailTitle} title={t.emailTitle}>
          <MailIcon />
        </a>
        <span className="header-city">{t.city}</span>
      </div>
    </header>
  );
}

function QrIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
      <path d="M15 15h2v2h-2zM19 14h1v2h-1zM14 19h2v1h-2zM18 18h2v2h-2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function Home({ navigate, t }) {
  return (
    <>
      <Hero t={t} />
      <Intro t={t} />
      <Works navigate={navigate} t={t} />
      <Narrative t={t} />
      <SeriesIndex navigate={navigate} t={t} />
      <Archive t={t} />
      <Method t={t} />
      <About t={t} />
    </>
  );
}

function Hero({ t }) {
  const heroCases = [cases[0], cases[1], cases[3], cases[5], cases[7]].filter(Boolean);
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((index) => (index + 1) % heroCases.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [heroCases.length]);

  return (
    <section id="top" className="hero relative flex h-svh min-h-[620px] overflow-hidden bg-black text-white">
      {heroCases.map((item, index) => (
        <img
          key={item.slug}
          data-depth={index === activeHero ? "18" : "6"}
          data-parallax="12"
          className={`hero-cycle-image js-hero-bg js-parallax absolute inset-0 h-full w-full object-cover ${index === activeHero ? "is-active" : ""}`}
          src={item.image}
          alt={item.title}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
      <div className="relative z-10 flex w-full flex-col justify-end px-5 pb-12 md:px-10 md:pb-14">
        <p className="js-hero-meta mb-6 translate-y-8 font-mono text-xs uppercase tracking-[0.26em] text-white/70 opacity-0">
          {t.heroKicker}
        </p>
        <h1 className="hero-title js-tilt-title max-w-[7.7ch] font-display text-[19vw] font-black uppercase leading-[0.78] md:text-[12.6vw]">
          {t.heroName.map((word) => (
            <span key={word} className="js-hero-line block translate-y-16 opacity-0">{word}</span>
          ))}
        </h1>
        <div className="mt-8 grid gap-7 md:grid-cols-[1fr_360px] md:items-end">
          <p className="js-hero-meta max-w-[16ch] translate-y-8 text-3xl font-medium leading-[0.95] tracking-[-0.05em] opacity-0 md:text-6xl">
            {t.heroLine}
          </p>
          <div className="js-hero-meta flex translate-y-8 items-end justify-between gap-10 opacity-0">
            <p className="max-w-[26ch] text-sm leading-relaxed text-white/76">
              {t.heroBody}
            </p>
            <span className="scroll-cue font-mono text-[10px] uppercase tracking-[0.2em] text-white/62">{t.scroll}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro({ t }) {
  return (
    <section className="bg-black px-5 py-28 text-white md:px-10 md:py-36">
      <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <p className="js-reveal font-mono text-xs uppercase tracking-[0.24em] text-white/48">{t.introKicker}</p>
        <div className="space-y-8">
          <p className="js-reveal max-w-[32ch] text-3xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
            {t.introTitle}
          </p>
          <p className="js-reveal max-w-[48ch] text-base leading-relaxed text-white/62 md:text-lg">
            {t.introBody}
          </p>
        </div>
      </div>
    </section>
  );
}

function Works({ navigate, t }) {
  const [activeWork, setActiveWork] = useState(null);
  const localizedCases = cases.map((item) => localizeCase(item, t.language));

  const openWork = (event, chapter) => {
    event.preventDefault();
    navigate(`/works/${chapter.slug}`);
  };

  return (
    <section id="works" className="works rounded-t-[2rem] bg-white px-5 py-24 md:px-10 md:py-32">
      <div className="js-reveal grid gap-8 md:grid-cols-[1fr_360px] md:items-end">
        <h2 className="section-title js-tilt-title font-display text-[20vw] font-black uppercase leading-[0.8] md:text-[14vw]">{t.worksTitle}</h2>
          <p className="max-w-[34ch] text-base leading-relaxed text-black/58">
          {t.worksBody}
        </p>
      </div>
      <div className="works-grid mt-16" onMouseLeave={() => setActiveWork(null)}>
        {localizedCases.map((chapter, index) => {
          const isDimmed = activeWork !== null && activeWork !== index;
          const isActive = activeWork === index;

          return (
            <a
              key={chapter.slug}
              href={routePath(`/works/${chapter.slug}`)}
              onClick={(event) => openWork(event, chapter)}
              onMouseEnter={() => setActiveWork(index)}
              data-cursor="view"
              className={`work-panel work-panel-${index + 1} group relative overflow-hidden rounded-xl bg-black transition-all duration-500 ease-out ${
                isDimmed ? "is-dimmed" : ""
              } ${isActive ? "is-active" : ""}`}
            >
              <img data-depth={isActive ? "26" : "12"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" src={chapter.image} alt={chapter.title} />
              <div className="absolute inset-0 bg-black/28 transition-colors duration-500 group-hover:bg-black/50" />
              <div className="absolute left-4 top-4 z-10 font-mono text-xl font-semibold text-white transition-transform duration-500 group-hover:scale-125">
                {chapter.number}
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/68">{chapter.label}</p>
                <h3 className="mt-3 max-w-[10.5ch] font-display text-4xl font-black uppercase leading-[0.86] tracking-[-0.06em] md:text-5xl lg:text-6xl">{chapter.title}</h3>
                <div className="mt-5 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="max-w-[27ch] text-base font-medium leading-tight text-white/88 md:text-lg">{chapter.line}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/66">
                    {chapter.client} / {chapter.year}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Narrative({ t }) {
  const narrativeCase = cases.find((item) => item.slug === "didi-incense-holder") || cases[0];

  return (
    <section className="narrative relative flex min-h-[160vh] items-center overflow-hidden bg-black px-5 py-28 text-white md:px-10">
      <img data-parallax="-9" className="js-parallax absolute inset-0 h-full w-full scale-110 object-cover opacity-35" src={narrativeCase.image} alt={narrativeCase.title} />
      <div className="absolute inset-0 bg-black/66" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.24em] text-white/45">{t.narrativeKicker}</p>
        <div className="narrative-type js-tilt-title space-y-4 font-display text-[13vw] font-black uppercase leading-[0.86] md:text-[8.3vw]">
          {t.narrativeLines.map((line, index) => (
            <p key={line} className={`js-narrative-line ${index === 2 ? "text-white/62" : ""}`}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method({ t }) {
  return (
    <section id="method" className="bg-white px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <div className="self-start md:sticky md:top-28">
          <p className="js-reveal font-mono text-xs uppercase tracking-[0.24em] text-black/42">{t.methodKicker}</p>
          <h2 className="section-title js-tilt-title js-reveal mt-5 max-w-[8ch] font-display text-[16vw] font-black uppercase leading-[0.84] md:text-[7.6vw]">
            {t.methodTitle}
          </h2>
          <p className="js-reveal mt-8 max-w-[36ch] text-lg leading-relaxed text-black/58">
            {t.methodBody}
          </p>
        </div>
        <div className="method-list space-y-3">
          {t.methods.map(([num, title, copy]) => (
            <article key={title} className="js-method method-row border-t border-black/12 py-8">
              <div className="grid gap-6 md:grid-cols-[96px_1fr]">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-black/38">{num}</span>
                <div>
                  <h3 className="font-display text-4xl font-semibold leading-none tracking-[-0.055em] md:text-6xl">{title}</h3>
                  <p className="mt-4 max-w-[43ch] text-base leading-relaxed text-black/58 md:text-lg">{copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkDetail({ work, navigate, t }) {
  const galleryRef = useRef(null);
  const localWork = localizeCase(work, t.language);
  const nextWork = useMemo(() => {
    const index = cases.findIndex((item) => item.slug === work.slug);
    return localizeCase(cases[(index + 1) % cases.length], t.language);
  }, [work.slug, t.language]);
  const atmosphere = caseAtmospheres[work.slug] || ["#f3f1ed", "#d8d1c7"];
  const galleryStyle = {
    "--case-bg-a": atmosphere[0],
    "--case-bg-b": atmosphere[1]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".case-study-image").forEach((el, index) => {
        gsap.fromTo(
          el,
          { y: index % 2 === 0 ? 64 : -64, scale: 1.06 },
          {
            y: index % 2 === 0 ? -64 : 64,
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest(".case-plate"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7
            }
          }
        );
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [work.slug]);

  return (
    <>
      <section className="detail-hero relative min-h-svh overflow-hidden bg-black px-5 pb-14 pt-28 text-white md:px-10 md:pt-32">
        <img data-depth="18" data-parallax="11" className="js-hero-bg js-parallax absolute inset-0 h-full w-full scale-110 object-cover opacity-60" src={work.image} alt={localWork.title} />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 grid min-h-[70svh] content-end gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <button className="js-hero-meta mb-10 translate-y-8 font-mono text-xs uppercase tracking-[0.22em] text-white/64 opacity-0" onClick={() => navigate("/")}>
              {t.back}
            </button>
            <p className="js-hero-meta mb-5 translate-y-8 font-mono text-xs uppercase tracking-[0.24em] text-white/58 opacity-0">{localWork.label}</p>
            <h1 className="hero-title js-tilt-title max-w-[8ch] font-display text-[18vw] font-black uppercase leading-[0.78] md:text-[11vw]">
              {localWork.title.split(" ").map((word) => (
                <span key={word} className="js-hero-line block translate-y-16 opacity-0">{word}</span>
              ))}
            </h1>
          </div>
          <div className="js-hero-meta translate-y-8 space-y-8 opacity-0">
            <p className="max-w-[30ch] text-2xl font-medium leading-[1.02] tracking-[-0.045em] md:text-4xl">{localWork.line}</p>
            <dl className="grid grid-cols-2 gap-5 border-y border-white/18 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/62">
              <div><dt className="text-white/38">{t.client}</dt><dd className="mt-2">{work.client}</dd></div>
              <div><dt className="text-white/38">{t.year}</dt><dd className="mt-2">{work.year}</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="detail-overview bg-black px-5 py-24 text-white md:px-10 md:py-32">
        <div className="grid gap-14 border-b border-black/12 pb-16 md:grid-cols-[0.72fr_1.28fr] md:pb-24">
          <div className="js-reveal space-y-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/42">{t.overview}</p>
            <dl className="grid gap-5 border-y border-black/12 py-6 font-mono text-[11px] uppercase tracking-[0.16em] text-black/52">
              <div className="grid grid-cols-[96px_1fr] gap-5">
                <dt className="text-black/34">{t.client}</dt>
                <dd>{work.client}</dd>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-5">
                <dt className="text-black/34">{t.year}</dt>
                <dd>{work.year}</dd>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-5">
                <dt className="text-black/34">{t.type}</dt>
                <dd>{localWork.category}</dd>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-5">
                <dt className="text-black/34">{t.role}</dt>
                <dd>{t.roleValue}</dd>
              </div>
            </dl>
            {work.sources?.length > 0 && (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/42">{t.sources}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {work.sources.map((source) => (
                    <a key={source.url} className="source-chip" href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-8">
            <p className="js-reveal max-w-[19ch] font-display text-5xl font-black uppercase leading-[0.86] tracking-[-0.065em] md:text-8xl">
              {localWork.title}
            </p>
            <p className="js-reveal max-w-[44ch] text-3xl font-medium leading-[1.04] tracking-[-0.045em] md:text-6xl">{localWork.detail}</p>
            <p className="js-reveal max-w-[52ch] text-base leading-relaxed text-black/56 md:text-lg">
              {t.caseNote}
            </p>
          </div>
        </div>
      </section>
      <section ref={galleryRef} className="case-gallery px-0 py-0" style={galleryStyle}>
        <div className="mx-auto max-w-[1760px]">
          {work.gallery.map((image, index) => (
            <figure key={image} data-index={index} className="js-reveal case-plate">
              <img className="case-study-image" src={image} alt={`${localWork.title} project image ${index + 1}`} />
            </figure>
          ))}
        </div>
      </section>
      <section className="bg-black px-5 py-24 text-white md:px-10 md:py-28">
        <button data-cursor="view" className="group block w-full text-left" onClick={() => navigate(`/works/${nextWork.slug}`)}>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/44">{t.next}</p>
          <div className="mt-5 flex flex-col justify-between gap-8 border-t border-white/14 pt-8 md:flex-row md:items-end">
            <h2 className="js-tilt-title font-display text-[16vw] font-black uppercase leading-[0.78] tracking-[-0.08em] md:text-[8vw]">{nextWork.title}</h2>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/58 transition-transform group-hover:translate-x-3">{t.openProject}</span>
          </div>
        </button>
      </section>
    </>
  );
}

function SeriesIndex({ navigate, t }) {
  const displaySeries = t.language === "zh"
    ? series.map((item, index) => ({ ...item, ...zhSeries[index] }))
    : series;

  return (
    <section className="bg-white px-5 py-24 md:px-10 md:py-32">
      <div className="js-reveal grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/42">{t.seriesKicker}</p>
        <h2 className="section-title js-tilt-title max-w-[10ch] font-display text-[16vw] font-black uppercase leading-[0.84] md:text-[8vw]">
          {t.seriesTitle}
        </h2>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {displaySeries.map((item) => {
          const firstCase = cases.find((work) => work.slug === item.cases[0]);
          const seriesImage = firstCase?.image || cases[0].image;
          return (
            <button
              key={item.title}
              data-cursor="view"
              className="series-panel group relative min-h-[54vh] overflow-hidden rounded-xl bg-black text-left text-white"
              onClick={() => firstCase && navigate(`/works/${firstCase.slug}`)}
            >
              <img className="absolute inset-0 h-full w-full object-cover opacity-72 transition-transform duration-700 group-hover:scale-105" src={seriesImage} alt={item.title} />
              <div className="absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/58" />
              <div className="relative z-10 flex h-full min-h-[54vh] flex-col justify-between p-5 md:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/62">{item.label}</p>
                <div>
                  <h3 className="max-w-[11ch] font-display text-5xl font-black uppercase leading-[0.86] tracking-[-0.07em] md:text-7xl">{item.title}</h3>
                  <p className="mt-5 max-w-[35ch] text-base leading-relaxed text-white/72">{item.line}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Archive({ t }) {
  const rows = t.language === "zh"
    ? archive.map((item, index) => [...zhArchive[index], item[3]])
    : archive;

  return (
    <section className="bg-black px-5 py-24 text-white md:px-10 md:py-28">
      <div className="js-reveal grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/42">{t.archiveKicker}</p>
        <p className="max-w-[40ch] text-3xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
          {t.archiveBody}
        </p>
      </div>
      <div className="mt-16 border-t border-white/14">
        {rows.map(([title, year, source, url]) => (
          <div key={url} className="archive-row group grid gap-4 border-b border-white/14 py-5 text-white md:grid-cols-[1fr_120px_180px_120px]">
            <span className="text-xl font-medium tracking-[-0.035em] md:text-3xl">{title}</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/46">{year}</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/46">{source}</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/38">{t.queued}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <footer id="contact" className="contact-footer bg-[#161616] px-5 text-white md:px-10">
      <div className="contact-center js-reveal">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-white/36">{t.contactKicker}</p>
        <a className="contact-email js-tilt-title" href="mailto:qwhe@foxmail.com">
          {t.contactEmail}
        </a>
        <div className="contact-socials">
          <span className="wechat-contact">
            <span>{t.contactLinks[0]}</span>
            <span className="contact-qr">
              <img src={publicAsset("/contact/wechat-qr.png")} alt={t.wechatTitle} />
            </span>
          </span>
          <a href="https://www.behance.net/zhouyou" target="_blank" rel="noreferrer">{t.contactLinks[1]}</a>
          <a href="https://dribbble.com/qwhe" target="_blank" rel="noreferrer">{t.contactLinks[2]}</a>
          <a href="https://www.zcool.com.cn/u/346744" target="_blank" rel="noreferrer">{t.contactLinks[3]}</a>
        </div>
        <div className="contact-bottom">
          <span>{t.contactLegal[0]}</span>
          <span>{t.contactLegal[1]}</span>
          <span>{t.copyright}</span>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
