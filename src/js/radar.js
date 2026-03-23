/**
 * awesome-ai-radar — Interactive SVG Radar Visualization
 * Self-contained, no dependencies. Renders a ThoughtWorks-style tech radar
 * with 4 quadrants and 4 rings from /awesome-ai-radar/radar.json
 */
(function () {
  const container = document.getElementById("radar-chart");
  if (!container) return;

  const CONFIG = {
    size: 600,
    rings: ["Adopt", "Trial", "Assess", "Hold"],
    quadrants: ["Models", "Tools", "Frameworks", "Paradigms"],
    ringColors: ["rgba(34,197,94,0.15)", "rgba(96,165,250,0.10)", "rgba(245,158,11,0.08)", "rgba(107,114,128,0.05)"],
    blipColors: {
      "game-changer": "#ef4444",
      notable: "#f59e0b",
      incremental: "#22c55e",
      noise: "#6b7280",
    },
    quadrantAngles: [
      { start: -Math.PI / 2, end: 0 },
      { start: 0, end: Math.PI / 2 },
      { start: Math.PI / 2, end: Math.PI },
      { start: -Math.PI, end: -Math.PI / 2 },
    ],
  };

  const cx = CONFIG.size / 2;
  const cy = CONFIG.size / 2;
  const maxR = CONFIG.size / 2 - 40;

  function ringRadius(i) {
    return ((i + 1) / CONFIG.rings.length) * maxR;
  }

  function createSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${CONFIG.size} ${CONFIG.size}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.maxWidth = CONFIG.size + "px";
    svg.style.margin = "0 auto";
    svg.style.display = "block";
    return svg;
  }

  function drawRings(svg) {
    for (let i = CONFIG.rings.length - 1; i >= 0; i--) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", ringRadius(i));
      circle.setAttribute("fill", CONFIG.ringColors[i]);
      circle.setAttribute("stroke", "var(--border, #1f2937)");
      circle.setAttribute("stroke-width", "1");
      svg.appendChild(circle);

      // Ring label
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const labelR = i === 0 ? ringRadius(i) / 2 : (ringRadius(i) + ringRadius(i - 1)) / 2;
      text.setAttribute("x", cx + labelR);
      text.setAttribute("y", cy - 4);
      text.setAttribute("fill", "var(--text-muted, #6b7280)");
      text.setAttribute("font-size", "11");
      text.setAttribute("font-family", "'JetBrains Mono', monospace");
      text.setAttribute("text-anchor", "middle");
      text.textContent = CONFIG.rings[i];
      svg.appendChild(text);
    }
  }

  function drawAxes(svg) {
    // Vertical axis
    const v = document.createElementNS("http://www.w3.org/2000/svg", "line");
    v.setAttribute("x1", cx); v.setAttribute("y1", cy - maxR);
    v.setAttribute("x2", cx); v.setAttribute("y2", cy + maxR);
    v.setAttribute("stroke", "var(--border, #1f2937)"); v.setAttribute("stroke-width", "1");
    svg.appendChild(v);

    // Horizontal axis
    const h = document.createElementNS("http://www.w3.org/2000/svg", "line");
    h.setAttribute("x1", cx - maxR); h.setAttribute("y1", cy);
    h.setAttribute("x2", cx + maxR); h.setAttribute("y2", cy);
    h.setAttribute("stroke", "var(--border, #1f2937)"); h.setAttribute("stroke-width", "1");
    svg.appendChild(h);
  }

  function drawQuadrantLabels(svg) {
    const positions = [
      { x: cx + maxR / 2, y: cy - maxR - 10 },
      { x: cx + maxR + 10, y: cy + 14 },
      { x: cx - maxR / 2, y: cy + maxR + 20 },
      { x: cx - maxR - 10, y: cy + 14 },
    ];
    const anchors = ["middle", "start", "middle", "end"];

    CONFIG.quadrants.forEach((name, i) => {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", positions[i].x);
      text.setAttribute("y", positions[i].y);
      text.setAttribute("fill", "var(--text, #e5e7eb)");
      text.setAttribute("font-size", "13");
      text.setAttribute("font-weight", "700");
      text.setAttribute("font-family", "'JetBrains Mono', monospace");
      text.setAttribute("text-anchor", anchors[i]);
      text.textContent = name;
      svg.appendChild(text);
    });
  }

  function placeBlip(entry, quadrantIdx, ringIdx, offsetIdx) {
    const innerR = ringIdx === 0 ? 0 : ringRadius(ringIdx - 1);
    const outerR = ringRadius(ringIdx);
    const midR = (innerR + outerR) / 2;

    // Spread blips within the quadrant angle
    const qa = CONFIG.quadrantAngles[quadrantIdx];
    const angleSpread = (qa.end - qa.start) * 0.7;
    const angleStart = qa.start + (qa.end - qa.start) * 0.15;
    const seed = hashCode(entry.title || "x") + offsetIdx;
    const angle = angleStart + (((seed % 100) / 100) * angleSpread);
    const rVariance = innerR + ((seed % 73) / 73) * (outerR - innerR);

    return {
      x: cx + rVariance * Math.cos(angle),
      y: cy + rVariance * Math.sin(angle),
    };
  }

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function drawBlips(svg, entries) {
    if (!entries || entries.length === 0) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", cx);
      text.setAttribute("y", cy);
      text.setAttribute("fill", "var(--text-muted, #6b7280)");
      text.setAttribute("font-size", "14");
      text.setAttribute("text-anchor", "middle");
      text.textContent = "Radar initializing — first entries coming soon";
      svg.appendChild(text);
      return;
    }

    const tooltip = document.createElement("div");
    tooltip.style.cssText = "position:fixed;padding:8px 12px;background:var(--bg-secondary,#111827);border:1px solid var(--border,#1f2937);border-radius:6px;font-size:13px;color:var(--text,#e5e7eb);pointer-events:none;opacity:0;transition:opacity 0.15s;z-index:100;max-width:250px;font-family:'Inter',sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.3)";
    document.body.appendChild(tooltip);

    // Add pulse animation for new entries
    const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    style.textContent = [
      "@keyframes radar-pulse {",
      "  0%, 100% { opacity: 1; }",
      "  50% { opacity: 0.5; }",
      "}",
      ".blip-new { animation: radar-pulse 2s ease-in-out infinite; }"
    ].join("\n");
    svg.appendChild(style);

    var nowMs = Date.now();
    var SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

    entries.forEach(function (entry, i) {
      var qIdx = CONFIG.quadrants.indexOf(entry.quadrant);
      var rIdx = CONFIG.rings.indexOf(entry.ring);
      if (qIdx === -1 || rIdx === -1) return;

      var pos = placeBlip(entry, qIdx, rIdx, i);
      var color = CONFIG.blipColors[entry.signal] || "#6b7280";

      // Relevance-based opacity (min 0.25 so fading entries are still visible)
      var score = typeof entry.relevance_score === "number" ? entry.relevance_score : 50;
      var blipOpacity = Math.max(0.25, score / 100);

      // Game-changers get a larger radius
      var baseRadius = entry.signal === "game-changer" ? 9 : 7;
      var hoverRadius = entry.signal === "game-changer" ? 12 : 10;

      // Check if entry is new (< 7 days old)
      var isNew = entry.date && (nowMs - new Date(entry.date).getTime()) < SEVEN_DAYS;

      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.style.cursor = entry.url ? "pointer" : "default";
      g.style.opacity = blipOpacity;
      if (isNew) g.classList.add("blip-new");

      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", pos.x);
      circle.setAttribute("cy", pos.y);
      circle.setAttribute("r", baseRadius);
      circle.setAttribute("fill", color);
      circle.setAttribute("stroke", "var(--bg, #0a0f1a)");
      circle.setAttribute("stroke-width", "2");
      g.appendChild(circle);

      // Build tooltip content safely using DOM methods
      var lifecycleLabel = entry.lifecycle ? " \u00b7 " + entry.lifecycle : "";
      var scoreLabel = typeof entry.relevance_score === "number" ? " \u00b7 score: " + entry.relevance_score : "";

      g.addEventListener("mouseenter", function (e) {
        circle.setAttribute("r", hoverRadius);
        g.style.opacity = "1";
        // Safe DOM construction (no innerHTML with untrusted data)
        tooltip.textContent = "";
        var strong = document.createElement("strong");
        strong.textContent = entry.title;
        tooltip.appendChild(strong);
        tooltip.appendChild(document.createElement("br"));
        var info = document.createElement("span");
        info.style.color = color;
        info.textContent = entry.signal;
        tooltip.appendChild(info);
        tooltip.appendChild(document.createTextNode(" \u00b7 " + entry.ring + lifecycleLabel + scoreLabel));
        tooltip.style.opacity = "1";
        tooltip.style.left = e.clientX + 12 + "px";
        tooltip.style.top = e.clientY - 10 + "px";
      });

      g.addEventListener("mousemove", function (e) {
        tooltip.style.left = e.clientX + 12 + "px";
        tooltip.style.top = e.clientY - 10 + "px";
      });

      g.addEventListener("mouseleave", function () {
        circle.setAttribute("r", baseRadius);
        g.style.opacity = blipOpacity;
        tooltip.style.opacity = "0";
      });

      if (entry.url) {
        g.addEventListener("click", function () { window.location.href = entry.url; });
      }

      svg.appendChild(g);
    });
  }

  // Render
  async function render() {
    const svg = createSVG();
    drawRings(svg);
    drawAxes(svg);
    drawQuadrantLabels(svg);

    try {
      const basePath = document.querySelector('script[src*="radar.js"]')?.src?.replace(/js\/radar\.js.*/, '') || '/awesome-ai-radar/';
      const res = await fetch(basePath + "radar.json");
      const data = await res.json();
      drawBlips(svg, data.entries || []);
    } catch (e) {
      drawBlips(svg, []);
    }

    container.appendChild(svg);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
