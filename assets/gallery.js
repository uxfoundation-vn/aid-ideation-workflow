/**
 * Shared renderer for Mobbin UI-pattern / flow reference pages.
 * A research page only needs to define a DATA object and call MobbinGallery.render(DATA).
 *
 * DATA = {
 *   title: string,
 *   subtitle: string,
 *   report?: {                 // component-research: block tổng hợp 4 câu hỏi designer,
 *     tldr: string,            //   render TRÊN các section ảnh (schema chi tiết xem
 *                              //   .claude/skills/component-research/SKILL.md)
 *     purpose?: { items: [{ text, src? }] },
 *     differences?: { note?, rows: [{ name, use, src? }] },
 *     states?: { note?, rows: [{ name, desc, src? }] },
 *     naming?: { headline?, bars: [{ name, count }], camps?: [{ name, ds }], advice? },
 *     bestPractices?: [{ group, items: [{ text, src? }] }],
 *     note?: string
 *   },
 *   sections: [
 *     {
 *       name: string,               // section heading, e.g. "Afterpay — Logging In (6 bước)"
 *       layout?: "grid" | "flow",   // "flow" = ordered horizontal strip (use with item.step), default "grid"
 *       items: [
 *         {
 *           app: string,
 *           platform: "ios" | "web" | "cg" | "pinterest",
 *           image: string,          // image_url (Mobbin) / screenshot (component.gallery) / pin image
 *           url: string,            // mobbin_url / docs gốc design system / pin URL
 *           step?: number,          // position in a flow — shown instead of the platform badge
 *           alt?: string
 *         }
 *       ]
 *     }
 *   ],
 *   sources?: [{ label, url, note? }]  // footer "Nguồn & phương pháp"
 * }
 */
(function () {
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
  }

  const PLATFORM_LABELS = { ios: "iOS", web: "Web", cg: "Design System", pinterest: "Pinterest" };

  function badgeHtml(item) {
    if (item.step != null) {
      return `<span class="badge step">Bước ${item.step}</span>`;
    }
    const platform = (item.platform || "").toLowerCase();
    const label = PLATFORM_LABELS[platform] || platform;
    return `<span class="badge ${platform}">${escapeHtml(label)}</span>`;
  }

  function viewLinkLabel(platform) {
    if (platform === "cg") return "Xem docs gốc →";
    if (platform === "pinterest") return "Xem trên Pinterest →";
    return "Xem trên Mobbin →";
  }

  let galleryItems = [];

  function cardHtml(item, index) {
    return `
      <div class="card">
        <div class="card-img-wrap" data-index="${index}" role="button" tabindex="0" title="Bấm để xem toàn màn hình">
          <img src="${item.image}" alt="${escapeHtml(item.alt || item.app)}" loading="lazy">
        </div>
        <div class="card-info">
          <div class="card-top-row">
            <span class="app-name">${escapeHtml(item.app)}</span>
            ${badgeHtml(item)}
          </div>
          <a class="view-link" href="${item.url}" target="_blank" rel="noopener">${viewLinkLabel(item.platform)}</a>
        </div>
      </div>
    `;
  }

  function sectionHtml(section, counter) {
    const gridClass = section.layout === "flow" ? "grid flow-strip" : "grid";
    const cardsHtml = section.items.map((item) => cardHtml(item, counter.i++)).join("");
    return `
      <div class="section">
        <h2 class="section-title">${escapeHtml(section.name)}</h2>
        <div class="${gridClass}">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  /* ---------- component report (DATA.report + DATA.sources) ---------- */

  const srcChip = (src) => (src ? ` <span class="src">${escapeHtml(src)}</span>` : "");
  const noteHtml = (note) => (note ? `<div class="report-note">${escapeHtml(note)}</div>` : "");

  function qBlock(q, title, body) {
    return `<h2><span class="q">${q}</span> ${escapeHtml(title)}</h2>${body}`;
  }

  function bullets(items, intro) {
    return (intro ? `<p>${escapeHtml(intro)}</p>` : "") +
      `<ul>${items.map((i) => `<li>${escapeHtml(i.text)}${srcChip(i.src)}</li>`).join("")}</ul>`;
  }

  function reportHtml(report) {
    if (!report) return "";
    let h = `<div class="report">`;
    if (report.tldr) h += `<p class="report-tldr">${report.tldr}</p>`; // tldr do skill tự viết, cho phép <b>/<code>
    if (report.purpose) h += qBlock("1", "Dùng để làm gì?", bullets(report.purpose.items, report.purpose.intro));
    if (report.differences) {
      const rows = report.differences.rows
        .map((r) => `<tr><td><b>${escapeHtml(r.name)}</b></td><td>${escapeHtml(r.use)}${srcChip(r.src)}</td></tr>`)
        .join("");
      h += qBlock("2", "Khác gì so với component liên quan?",
        `<table><tr><th>Component</th><th>Dùng khi…</th></tr>${rows}</table>` + noteHtml(report.differences.note));
    }
    if (report.states) {
      const rows = report.states.rows
        .map((r) => `<tr><td><b>${escapeHtml(r.name)}</b></td><td>${escapeHtml(r.desc)}${srcChip(r.src)}</td></tr>`)
        .join("");
      h += qBlock("3", "Có các state gì?",
        `<table><tr><th>State</th><th>Mô tả</th></tr>${rows}</table>` + noteHtml(report.states.note));
    }
    if (report.naming) {
      const max = Math.max(...report.naming.bars.map((b) => b.count), 1);
      const bars = report.naming.bars
        .map((b) => `<div class="dist-bar"><span class="dist-name">${escapeHtml(b.name)}</span><div class="dist-track"><div class="dist-fill" style="width:${Math.round((b.count / max) * 100)}%"></div></div><span class="dist-n">${b.count}</span></div>`)
        .join("");
      const camps = report.naming.camps
        ? `<div class="camp">${report.naming.camps.map((c) => `<div class="camp-card"><b>${escapeHtml(c.name)}</b><div class="ds">${escapeHtml(c.ds)}</div></div>`).join("")}</div>`
        : "";
      const advice = report.naming.advice ? `<p><b>Gợi ý:</b> ${escapeHtml(report.naming.advice)}</p>` : "";
      h += qBlock("4", "Đặt tên như nào?",
        (report.naming.headline ? `<p>${escapeHtml(report.naming.headline)}</p>` : "") + bars + camps + advice);
    }
    if (report.bestPractices) {
      h += qBlock("+", "Best practice khi dùng",
        report.bestPractices.map((g) =>
          `<div class="group-label">${escapeHtml(g.group)}</div>` + bullets(g.items)
        ).join(""));
    }
    h += noteHtml(report.note);
    return h + `</div>`;
  }

  function sourcesHtml(sources) {
    if (!sources || !sources.length) return "";
    return `<div class="sources"><b>Nguồn & phương pháp</b><ul>${sources
      .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a>${s.note ? ` — ${escapeHtml(s.note)}` : ""}</li>`)
      .join("")}</ul></div>`;
  }

  function render(data) {
    document.title = data.title || "Mobbin UI Pattern Refs";
    const titleEl = document.getElementById("page-title");
    const subtitleEl = document.getElementById("page-subtitle");
    if (titleEl) titleEl.textContent = data.title || "";
    if (subtitleEl) subtitleEl.textContent = data.subtitle || "";
    const app = document.getElementById("app");
    const hasReport = !!data.report;
    if ((!data.sections || data.sections.length === 0) && !hasReport) {
      app.innerHTML = '<p class="empty">Chưa có data. Đổ dữ liệu vào object DATA ở trên.</p>';
      return;
    }
    galleryItems = [];
    if (data.sections) {
      data.sections.forEach((s) => s.items.forEach((item) => galleryItems.push(item)));
    }
    const counter = { i: 0 };
    const sectionsHtml = (data.sections || []).map((s) => sectionHtml(s, counter)).join("");
    app.innerHTML = reportHtml(data.report) + sectionsHtml + sourcesHtml(data.sources);
  }

  let lightboxEl = null;
  let currentIndex = 0;

  function ensureLightbox() {
    if (lightboxEl) return lightboxEl;
    lightboxEl = document.createElement("div");
    lightboxEl.className = "lightbox";
    const icon = (paths, size) =>
      `<svg class="icon" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    lightboxEl.innerHTML = `
      <button class="lightbox-close" aria-label="Đóng">${icon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 20)}</button>
      <button class="lightbox-prev" aria-label="Ảnh trước">${icon('<path d="m15 18-6-6 6-6"/>', 24)}</button>
      <img class="lightbox-img" alt="">
      <button class="lightbox-next" aria-label="Ảnh sau">${icon('<path d="m9 18 6-6-6-6"/>', 24)}</button>
      <div class="lightbox-caption">
        <span class="lightbox-app"></span>
        <a class="lightbox-link" target="_blank" rel="noopener">Xem bản gốc →</a>
      </div>
    `;
    document.body.appendChild(lightboxEl);
    lightboxEl.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightboxEl.querySelector(".lightbox-prev").addEventListener("click", (e) => {
      e.stopPropagation();
      showDelta(-1);
    });
    lightboxEl.querySelector(".lightbox-next").addEventListener("click", (e) => {
      e.stopPropagation();
      showDelta(1);
    });
    lightboxEl.addEventListener("click", (e) => {
      if (e.target === lightboxEl) closeLightbox();
    });
    return lightboxEl;
  }

  function updateLightbox() {
    const item = galleryItems[currentIndex];
    if (!item) return;
    const el = ensureLightbox();
    const img = el.querySelector(".lightbox-img");
    img.src = item.image;
    img.alt = item.alt || item.app || "";
    el.querySelector(".lightbox-app").textContent = item.app || "";
    el.querySelector(".lightbox-link").href = item.url || "#";
  }

  function openLightbox(index) {
    if (!galleryItems.length) return;
    currentIndex = index;
    updateLightbox();
    ensureLightbox().classList.add("show");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove("show");
    document.body.classList.remove("lightbox-open");
  }

  function showDelta(delta) {
    if (!galleryItems.length) return;
    currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
    updateLightbox();
  }

  document.addEventListener("click", (e) => {
    const wrap = e.target.closest(".card-img-wrap");
    if (wrap) openLightbox(Number(wrap.dataset.index));
  });
  document.addEventListener("keydown", (e) => {
    if (lightboxEl && lightboxEl.classList.contains("show")) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") showDelta(1);
      else if (e.key === "ArrowLeft") showDelta(-1);
      return;
    }
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("card-img-wrap")) {
      e.preventDefault();
      openLightbox(Number(e.target.dataset.index));
    }
  });

  window.MobbinGallery = { render };
})();
