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

const uiCopy = {
  en: {
    nav: ["Works", "Method", "Contact"],
    langTitle: "Switch to Chinese",
    langShort: "CN",
    wechatTitle: "WeChat QR code",
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
    openProject: "Open project"
  },
  zh: {
    nav: ["作品", "方法", "联系"],
    langTitle: "切换到英文",
    langShort: "EN",
    wechatTitle: "微信二维码",
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
    openProject: "打开项目"
  }
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

const methods = [
  ["01", "Strategic Framing", "Define the audience, occasion, budget, and emotional role before a single object is selected."],
  ["02", "Visual Direction", "Build a restrained visual language across structure, palette, typography, illustration, and narrative."],
  ["03", "Object Sourcing", "Match the idea with the right carrier, supplier, material, finish, and production tolerance."],
  ["04", "Prototype Control", "Use samples to test proportion, touch, opening rhythm, print accuracy, and packing logic."],
  ["05", "Factory Supervision", "Monitor color, craft, assembly, defects, and the quiet details that drawings cannot guarantee."],
  ["06", "Delivery System", "Shape the final handoff: packaging, campaign assets, photography, and launch-ready communication."]
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

    const onMouseMove = (event) => {
      const relX = event.clientX / window.innerWidth - 0.5;
      const relY = event.clientY / window.innerHeight - 0.5;
      depthItems.forEach((item) => {
        item.x(relX * item.depth);
        item.y(relY * item.depth);
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
    };
  }, [path]);

  return (
    <main ref={rootRef} className="min-h-screen bg-white text-black">
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
        Jero Zhou
      </a>
      <nav className="hidden items-center gap-10 rounded-full bg-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.08em] text-white backdrop-blur-md md:flex">
        <a className="nav-link" href="#works" onClick={(event) => go(event, "#works")}>{t.nav[0]}</a>
        <a className="nav-link" href="#method" onClick={(event) => go(event, "#method")}>{t.nav[1]}</a>
        <a className="nav-link" href="#contact" onClick={(event) => go(event, "#contact")}>{t.nav[2]}</a>
      </nav>
      <div className="header-tools">
        <button className="tool-button" type="button" aria-label={t.langTitle} title={t.langTitle} onClick={() => setLanguage(language === "en" ? "zh" : "en")}>
          <GlobeIcon />
          <span>{t.langShort}</span>
        </button>
        <div className="wechat-tool">
          <button className="tool-button" type="button" aria-label={t.wechatTitle} title={t.wechatTitle}>
            <QrIcon />
          </button>
          <div className="wechat-popover" role="img" aria-label={t.wechatTitle}>
            <img src={publicAsset("/contact/wechat-qr.png")} alt={t.wechatTitle} />
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

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 3.8 5.4 3.8 9S14.5 18.6 12 21M12 3C9.5 5.4 8.2 8.4 8.2 12S9.5 18.6 12 21" />
    </svg>
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
      <Narrative />
      <SeriesIndex navigate={navigate} />
      <Archive />
      <Method />
      <About />
    </>
  );
}

function Hero({ t }) {
  const heroCase = cases[0];

  return (
    <section id="top" className="hero relative flex h-svh min-h-[620px] overflow-hidden bg-black text-white">
      <img data-depth="18" data-parallax="12" className="js-hero-bg js-parallax absolute inset-0 h-full w-full scale-110 object-cover opacity-80" src={heroCase.image} alt={heroCase.title} />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
      <div className="relative z-10 flex w-full flex-col justify-end px-5 pb-12 md:px-10 md:pb-14">
        <p className="js-hero-meta mb-6 translate-y-8 font-mono text-xs uppercase tracking-[0.26em] text-white/70 opacity-0">
          {t.heroKicker}
        </p>
        <h1 className="hero-title max-w-[7.7ch] font-display text-[19vw] font-black uppercase leading-[0.78] md:text-[12.6vw]">
          <span className="js-hero-line block translate-y-16 opacity-0">Jero</span>
          <span className="js-hero-line block translate-y-16 opacity-0">Zhou</span>
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

  const openWork = (event, chapter) => {
    event.preventDefault();
    navigate(`/works/${chapter.slug}`);
  };

  return (
    <section id="works" className="works rounded-t-[2rem] bg-white px-5 py-24 md:px-10 md:py-32">
      <div className="js-reveal grid gap-8 md:grid-cols-[1fr_360px] md:items-end">
        <h2 className="section-title font-display text-[20vw] font-black uppercase leading-[0.8] md:text-[14vw]">Works</h2>
          <p className="max-w-[34ch] text-base leading-relaxed text-black/58">
          {t.worksBody}
        </p>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-4" onMouseLeave={() => setActiveWork(null)}>
        {cases.map((chapter, index) => {
          const isDimmed = activeWork !== null && activeWork !== index;
          const isActive = activeWork === index;

          return (
            <a
              key={chapter.slug}
              href={routePath(`/works/${chapter.slug}`)}
              onClick={(event) => openWork(event, chapter)}
              onMouseEnter={() => setActiveWork(index)}
              data-cursor="view"
              className={`work-panel group relative min-h-[58vh] overflow-hidden rounded-xl bg-black transition-all duration-500 ease-out md:min-h-[62vh] ${
                index === 0 || index === 3 || index === 6 ? "md:col-span-2" : ""
              } ${isDimmed ? "opacity-72 md:scale-[0.985]" : ""} ${isActive ? "md:scale-[1.012]" : ""}`}
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

function Narrative() {
  const narrativeCase = cases.find((item) => item.slug === "didi-incense-holder") || cases[0];

  return (
    <section className="narrative relative flex min-h-[160vh] items-center overflow-hidden bg-black px-5 py-28 text-white md:px-10">
      <img data-parallax="-9" className="js-parallax absolute inset-0 h-full w-full scale-110 object-cover opacity-35" src={narrativeCase.image} alt={narrativeCase.title} />
      <div className="absolute inset-0 bg-black/66" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.24em] text-white/45">From drawing to shelf</p>
        <div className="narrative-type space-y-4 font-display text-[13vw] font-black uppercase leading-[0.86] md:text-[8.3vw]">
          <p className="js-narrative-line">Most designers</p>
          <p className="js-narrative-line">deliver files.</p>
          <p className="js-narrative-line text-white/62">Jero delivers</p>
          <p className="js-narrative-line">730,000</p>
          <p className="js-narrative-line">approved objects.</p>
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="method" className="bg-white px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <div className="self-start md:sticky md:top-28">
          <p className="js-reveal font-mono text-xs uppercase tracking-[0.24em] text-black/42">Method</p>
          <h2 className="section-title js-reveal mt-5 max-w-[8ch] font-display text-[16vw] font-black uppercase leading-[0.84] md:text-[7.6vw]">
            From concept to shipment
          </h2>
          <p className="js-reveal mt-8 max-w-[36ch] text-lg leading-relaxed text-black/58">
            The work does not end at a render. It moves through material, sample, factory, inspection, and handoff.
          </p>
        </div>
        <div className="method-list space-y-3">
          {methods.map(([num, title, copy]) => (
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
  const nextWork = useMemo(() => {
    const index = cases.findIndex((item) => item.slug === work.slug);
    return cases[(index + 1) % cases.length];
  }, [work.slug]);

  return (
    <>
      <section className="detail-hero relative min-h-svh overflow-hidden bg-black px-5 pb-14 pt-28 text-white md:px-10 md:pt-32">
        <img data-depth="18" data-parallax="11" className="js-hero-bg js-parallax absolute inset-0 h-full w-full scale-110 object-cover opacity-60" src={work.image} alt={work.title} />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 grid min-h-[70svh] content-end gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <button className="js-hero-meta mb-10 translate-y-8 font-mono text-xs uppercase tracking-[0.22em] text-white/64 opacity-0" onClick={() => navigate("/")}>
              {t.back}
            </button>
            <p className="js-hero-meta mb-5 translate-y-8 font-mono text-xs uppercase tracking-[0.24em] text-white/58 opacity-0">{work.label}</p>
            <h1 className="hero-title max-w-[8ch] font-display text-[18vw] font-black uppercase leading-[0.78] md:text-[11vw]">
              {work.title.split(" ").map((word) => (
                <span key={word} className="js-hero-line block translate-y-16 opacity-0">{word}</span>
              ))}
            </h1>
          </div>
          <div className="js-hero-meta translate-y-8 space-y-8 opacity-0">
            <p className="max-w-[30ch] text-2xl font-medium leading-[1.02] tracking-[-0.045em] md:text-4xl">{work.line}</p>
            <dl className="grid grid-cols-2 gap-5 border-y border-white/18 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/62">
              <div><dt className="text-white/38">{t.client}</dt><dd className="mt-2">{work.client}</dd></div>
              <div><dt className="text-white/38">{t.year}</dt><dd className="mt-2">{work.year}</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-24 md:px-10 md:py-32">
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
                <dd>{work.category}</dd>
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
              {work.title}
            </p>
            <p className="js-reveal max-w-[44ch] text-3xl font-medium leading-[1.04] tracking-[-0.045em] md:text-6xl">{work.detail}</p>
            <p className="js-reveal max-w-[52ch] text-base leading-relaxed text-black/56 md:text-lg">
              {t.caseNote}
            </p>
          </div>
        </div>
      </section>
      <section className="case-gallery bg-[#f3f1ed] px-0 py-0">
        <div className="mx-auto max-w-[1500px]">
          {work.gallery.map((image, index) => (
            <figure key={image} className="js-reveal case-plate">
              <img className="case-study-image" src={image} alt={`${work.title} project image ${index + 1}`} />
            </figure>
          ))}
        </div>
      </section>
      <section className="bg-black px-5 py-24 text-white md:px-10 md:py-28">
        <button data-cursor="view" className="group block w-full text-left" onClick={() => navigate(`/works/${nextWork.slug}`)}>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/44">{t.next}</p>
          <div className="mt-5 flex flex-col justify-between gap-8 border-t border-white/14 pt-8 md:flex-row md:items-end">
            <h2 className="font-display text-[16vw] font-black uppercase leading-[0.78] tracking-[-0.08em] md:text-[8vw]">{nextWork.title}</h2>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/58 transition-transform group-hover:translate-x-3">{t.openProject}</span>
          </div>
        </button>
      </section>
    </>
  );
}

function SeriesIndex({ navigate }) {
  return (
    <section className="bg-white px-5 py-24 md:px-10 md:py-32">
      <div className="js-reveal grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/42">Series index</p>
        <h2 className="section-title max-w-[10ch] font-display text-[16vw] font-black uppercase leading-[0.84] md:text-[8vw]">
          Related systems
        </h2>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {series.map((item) => {
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

function Archive() {
  return (
    <section className="bg-black px-5 py-24 text-white md:px-10 md:py-28">
      <div className="js-reveal grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/42">Archive</p>
        <p className="max-w-[40ch] text-3xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
          Earlier and supporting works remain visible without diluting the featured case narrative.
        </p>
      </div>
      <div className="mt-16 border-t border-white/14">
        {archive.map(([title, year, source, url]) => (
          <div key={url} className="archive-row group grid gap-4 border-b border-white/14 py-5 text-white md:grid-cols-[1fr_120px_180px_120px]">
            <span className="text-xl font-medium tracking-[-0.035em] md:text-3xl">{title}</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/46">{year}</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/46">{source}</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/38">Queued</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const brands = "Tencent / Baidu / Ant Group / ByteDance / Didi / Sina / Du Xiaoman / Sogou / Yiche / Ziroom / Beibingyang / Sony Pictures / Xiaomi / Huawei / IKEA / Mazda / Acura / FILA";

  return (
    <footer id="contact" className="rounded-t-[2rem] bg-black px-5 py-20 text-white md:px-10 md:py-28">
      <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <p className="js-reveal font-mono text-xs uppercase tracking-[0.24em] text-white/48">About / Contact</p>
          <h2 className="section-title js-reveal mt-5 max-w-[10ch] font-display text-[17vw] font-black uppercase leading-[0.8] md:text-[8vw]">
            Objects people keep
          </h2>
        </div>
        <div className="space-y-9">
          <p className="js-reveal max-w-[43ch] text-xl font-medium leading-tight tracking-[-0.035em] text-white/84 md:text-3xl">
            A visual designer with a production mindset: curious, detail-driven, and comfortable moving ideas from sketch to sample table to assembly line.
          </p>
          <div className="js-reveal grid grid-cols-2 gap-5 border-y border-white/15 py-6 md:grid-cols-4">
            <Metric value="13" label="Years" />
            <Metric value="730k+" label="Units produced" />
            <Metric value="17.05m+" label="Project value" />
            <Metric value="17+" label="Brand partners" />
          </div>
          <p className="js-reveal text-sm leading-relaxed text-white/56">{brands}</p>
          <div className="js-reveal flex flex-col gap-3 font-mono text-sm uppercase tracking-[0.16em] text-white/78 md:flex-row md:items-center md:gap-8">
            <a className="contact-link" href="mailto:qwhe@foxmail.com">qwhe@foxmail.com</a>
            <span>Beijing / Chaoyang</span>
            <a className="contact-link" href="https://qwhe.github.io/portfolio/">Original portfolio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <p className="font-display text-4xl font-black leading-none tracking-[-0.05em] md:text-5xl">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-white/48">{label}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
