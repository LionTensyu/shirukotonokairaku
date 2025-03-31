const id = new URLSearchParams(window.location.search).get("id");
fetch("data/threads.json")
  .then(res => res.json())
  .then(data => {
    const thread = data.find(t => t.id === id);
    const container = document.getElementById("thread");
    if (thread) {
      const title = document.createElement("h2");
      title.textContent = thread.title;
      const meta = document.createElement("div");
      meta.innerHTML = `<small>カテゴリ: ${thread.category}｜作成: ${thread.created}｜反映: ${thread.reflected}</small>`;
      const list = document.createElement("ul");
      thread.posts.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${post.name}</strong>（${post.time}）<br>${post.body}`;
        list.appendChild(li);
      });
      container.appendChild(title);
      container.appendChild(meta);
      container.appendChild(list);
    }
  });