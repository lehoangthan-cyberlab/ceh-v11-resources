document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").filter(Boolean);
  const container = document.getElementById("breadcrumb");

  if (path.length === 0 || path.at(-1) === "index.html") {
    container.innerHTML = `<span>Home</span>`;
    return;
  }

  const parts = [];
  let url = "";

  parts.push(`<a href="/index.html">Home</a>`);

  for (let i = 0; i < path.length; i++) {
    const segment = path[i];

    if (segment === "pages" || segment === "index.html") continue;

    const isLast = i === path.length - 1;
    const name = segment.replace(".html", "");
    const label = toLabel(name);

    url += "/" + segment;

    if (isLast || name === "") {
      parts.push(`<span>${label}</span>`);
    } else {
      parts.push(`<a href="${url.replace(/\.html$/, '/index.html')}">${label}</a>`);
    }
  }

  container.innerHTML = parts.join(" / ");
});

function toLabel(str) {
  const clean = str.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  const moduleMatch = clean.match(/^(Module \d+)(.*)/i);
  const topicMatch = clean.match(/^(Topic \d+)(.*)/i);

  if (moduleMatch) {
    return `${moduleMatch[1]}:${moduleMatch[2]}`.trim();
  }

  if (topicMatch) {
    return `${topicMatch[1]}:${topicMatch[2]}`.trim();
  }

  return clean;
}
