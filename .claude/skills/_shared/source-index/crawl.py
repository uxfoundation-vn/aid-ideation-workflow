#!/usr/bin/env python3
"""Crawl lại index nguồn cho .claude/skills/_shared/source-index/.

Chạy lại cứ khoảng 1 tháng (NN/g ra bài mới liên tục):
    python3 .claude/skills/_shared/source-index/crawl.py

Ghi đè lawsofux.json + nngroup-articles.json cùng thư mục.
Cần network (curl). Laws of UX ít khi đổi nhưng crawl lại không tốn gì.
"""
import html
import json
import pathlib
import re
import subprocess
import tempfile

DIR = pathlib.Path(__file__).resolve().parent
UA = "Mozilla/5.0"


def fetch(url: str) -> str:
    tmp = tempfile.NamedTemporaryFile(delete=False)
    subprocess.run(
        ["curl", "-sf", "-A", UA, "--max-time", "30", url, "-o", tmp.name],
        check=True,
    )
    return pathlib.Path(tmp.name).read_text(encoding="utf-8")


def crawl_lawsofux() -> list[dict]:
    doc = fetch("https://lawsofux.com/")
    pairs = re.findall(
        r"href=https://lawsofux\.com/([a-z0-9-]+)/ data-page-link>([^<]+)<", doc
    )
    laws, seen = [], set()
    for slug, title in pairs:
        if slug in seen:
            continue
        seen.add(slug)
        laws.append({"name": html.unescape(title).strip(), "url": f"https://lawsofux.com/{slug}/"})
    return laws


def crawl_nngroup() -> list[dict]:
    xml = fetch("https://www.nngroup.com/sitemap.xml")
    locs = re.findall(r"<loc>(https://www\.nngroup\.com/articles/[a-z0-9-]+/)</loc>", xml)
    arts, seen = [], set()
    for url in locs:
        slug = url.rstrip("/").rsplit("/", 1)[-1]
        if slug not in seen:
            seen.add(slug)
            arts.append({"slug": slug, "url": url})
    return arts


if __name__ == "__main__":
    laws = crawl_lawsofux()
    (DIR / "lawsofux.json").write_text(json.dumps(laws, indent=1), encoding="utf-8")
    print(f"lawsofux.json: {len(laws)} laws")

    arts = crawl_nngroup()
    (DIR / "nngroup-articles.json").write_text(json.dumps(arts, indent=1), encoding="utf-8")
    print(f"nngroup-articles.json: {len(arts)} articles")
