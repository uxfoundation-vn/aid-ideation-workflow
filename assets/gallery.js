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

  /* ---------- flow review (DATA.review) ----------
     Schema: { tldr, goal{intro?,rows[{flow,entry,exit,note}]},
               camps{items[{name,apps,desc,tradeoff}]},
               states{rows[{state,desc,refs}]},
               good{items[{text,refs?,linkLabel?,linkUrl?}]},
               avoid{items[...]}, ideas{items: string | {text}}, note? }
     refs: [{section: "Places — Map", step: 2} | {section, steps: [1,2]}]
     — section khớp theo prefix của section name (cắt đuôi "(N bước)"),
       mỗi chip render thumbnail + bấm mở lightbox đúng ảnh. */

  let refLookup = {};

  function buildRefLookup(data) {
    refLookup = {};
    let i = 0;
    (data.sections || []).forEach((s) => {
      const prefix = s.name.replace(/\s*\(\d+\s*bước\)\s*$/, "").trim();
      s.items.forEach((item) => {
        if (item.step != null) refLookup[prefix + "|" + item.step] = i;
        i++;
      });
    });
  }

  function refChips(refs) {
    if (!refs || !refs.length) return "";
    const chips = refs.map((r) => {
      const prefix = String(r.section || "").trim();
      const steps = r.steps || (r.step != null ? [r.step] : []);
      if (!prefix || !steps.length) return "";
      const stepLabel = steps.length > 1 ? `b${steps[0]}–${steps[steps.length - 1]}` : `b${steps[0]}`;
      const label = `${prefix} · ${stepLabel}`;
      const idx = refLookup[prefix + "|" + steps[0]];
      const item = idx != null ? galleryItems[idx] : null;
      if (!item) return `<span class="ref missing">${escapeHtml(label)}</span>`;
      return `<button type="button" class="ref" data-index="${idx}" title="${escapeHtml(item.alt || item.app || "")}"><img src="${item.image}" alt="" loading="lazy"><span>${escapeHtml(label)}</span></button>`;
    });
    return chips.join("") ? `<span class="refs">${chips.join("")}</span>` : "";
  }

  function reviewItemHtml(i) {
    const link = i.linkLabel && i.linkUrl
      ? ` <a class="ext-link" href="${i.linkUrl}" target="_blank" rel="noopener">${escapeHtml(i.linkLabel)}</a>`
      : "";
    return `<li>${i.text}${link}${refChips(i.refs)}</li>`;
  }

  function reviewHtml(review) {
    if (!review) return "";
    let h = `<div class="report">`;
    if (review.tldr) h += `<p class="report-tldr">${review.tldr}</p>`;
    if (review.goal) {
      const rows = review.goal.rows
        .map((r) => `<tr><td><b>${escapeHtml(r.flow)}</b></td><td>${escapeHtml(r.entry)}</td><td>${escapeHtml(r.exit)}</td><td>${escapeHtml(r.note)}</td></tr>`)
        .join("");
      h += qBlock("1", "Goal & hành trình",
        (review.goal.intro ? `<p>${escapeHtml(review.goal.intro)}</p>` : "") +
        `<table><tr><th>Flow</th><th>Entry</th><th>Exit</th><th>Đặc điểm</th></tr>${rows}</table>`);
    }
    if (review.camps) {
      h += qBlock("2", "Trường phái", `<div class="camp">` + review.camps.items.map((c) =>
        `<div class="camp-card"><b>${escapeHtml(c.name)}</b><div class="ds">${escapeHtml(c.apps)}</div><p>${escapeHtml(c.desc)}</p><p class="tradeoff"><b>Tradeoff:</b> ${escapeHtml(c.tradeoff)}</p></div>`
      ).join("") + `</div>`);
    }
    if (review.states) {
      const rows = review.states.rows
        .map((r) => `<tr><td><b>${escapeHtml(r.state)}</b></td><td>${escapeHtml(r.desc)}</td><td>${refChips(r.refs)}</td></tr>`)
        .join("");
      h += qBlock("3", "Trạng thái đáng chú ý (thấy trong ảnh)",
        `<table><tr><th>State</th><th>Mô tả</th><th>Thấy ở</th></tr>${rows}</table>`);
    }
    if (review.good) h += qBlock("4", "Đáng học", `<ol>${review.good.items.map(reviewItemHtml).join("")}</ol>`);
    if (review.avoid) h += qBlock("5", "Nên tránh / hạn chế", `<ol>${review.avoid.items.map(reviewItemHtml).join("")}</ol>`);
    if (review.ideas) h += qBlock("6", "Đề xuất ngoài data — suy đoán, không có dẫn chứng trong ảnh",
      `<ul>${review.ideas.items.map((i) => `<li>${escapeHtml(typeof i === "string" ? i : i.text)}</li>`).join("")}</ul>`);
    h += noteHtml(review.note);
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
    buildRefLookup(data);
    const counter = { i: 0 };
    const sectionsHtml = (data.sections || []).map((s) => sectionHtml(s, counter)).join("");
    app.innerHTML = reportHtml(data.report) + reviewHtml(data.review) + sectionsHtml + sourcesHtml(data.sources);
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
    const ref = e.target.closest(".ref[data-index]");
    if (ref) {
      openLightbox(Number(ref.dataset.index));
      return;
    }
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
