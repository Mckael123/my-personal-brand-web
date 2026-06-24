const GITHUB_USERNAME = "Mckael123";
const GITHUB_PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

const profileContainer = document.querySelector("#github-profile");
const repoGrid = document.querySelector("#repo-grid");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

const numberFormatter = new Intl.NumberFormat("id-ID");
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProfile(profile) {
  const displayName = profile.name || profile.login || GITHUB_USERNAME;
  const bio = profile.bio || "Profil GitHub publik untuk menampilkan repository, aktivitas coding, dan karya teknis terbaru.";

  profileContainer.innerHTML = `
    <img class="github-avatar" src="${profile.avatar_url}" alt="Avatar GitHub ${escapeHtml(displayName)}" loading="lazy">
    <div>
      <h3>${escapeHtml(displayName)}</h3>
      <p>${escapeHtml(bio)}</p>
      <p><a href="${profile.html_url}" target="_blank" rel="noreferrer">@${escapeHtml(profile.login)}</a></p>
    </div>
    <div class="github-stats" aria-label="Statistik GitHub">
      <span>${numberFormatter.format(profile.public_repos)} repos</span>
      <span>${numberFormatter.format(profile.followers)} followers</span>
      <span>${numberFormatter.format(profile.following)} following</span>
    </div>
  `;
}

function renderRepos(repos) {
  if (!repos.length) {
    repoGrid.innerHTML = `
      <div class="error-card">
        Belum ada repository publik yang bisa ditampilkan. Kunjungi langsung
        <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noreferrer">GitHub @${GITHUB_USERNAME}</a>.
      </div>
    `;
    return;
  }

  repoGrid.innerHTML = repos
    .map((repo) => {
      const description = repo.description || "Repository publik dari GitHub Rafid-Nagara.";
      const updatedAt = repo.updated_at ? dateFormatter.format(new Date(repo.updated_at)) : "Belum tersedia";
      const language = repo.language ? `<span class="repo-language">${escapeHtml(repo.language)}</span>` : "";

      return `
        <article class="repo-card">
          <div>
            <h3><a href="${repo.html_url}" target="_blank" rel="noreferrer">${escapeHtml(repo.name)}</a></h3>
            <p>${escapeHtml(description)}</p>
          </div>
          <div>
            <div class="repo-meta">
              ${language}
              <span>★ ${numberFormatter.format(repo.stargazers_count)}</span>
              <span>⑂ ${numberFormatter.format(repo.forks_count)}</span>
            </div>
            <div class="repo-meta"><span>Update ${updatedAt}</span></div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderGitHubError() {
  profileContainer.innerHTML = `
    <div class="error-card">
      Data GitHub sedang tidak bisa dimuat. Ini bisa terjadi karena koneksi atau batas rate limit API.
      Silakan kunjungi <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noreferrer">GitHub @${GITHUB_USERNAME}</a>.
    </div>
  `;

  repoGrid.innerHTML = `
    <div class="error-card">
      Repository belum berhasil dimuat. Link GitHub tetap tersedia agar portfolio kode bisa diakses langsung.
    </div>
  `;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

async function loadGitHubData() {
  try {
    const [profile, repos] = await Promise.all([
      fetchJson(GITHUB_PROFILE_URL),
      fetchJson(GITHUB_REPOS_URL),
    ]);

    renderProfile(profile);
    renderRepos(repos.filter((repo) => !repo.fork));
  } catch (error) {
    console.warn(error);
    renderGitHubError();
  }
}

loadGitHubData();
