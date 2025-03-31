fetch("data/threads.json")
  .then(res => res.json())
  .then(data => {
    const categories = {};
    data.forEach(thread => {
      if (!categories[thread.category]) {
        categories[thread.category] = [];
      }
      categories[thread.category].push(thread);
    });

    const container = document.getElementById("categories");
    for (const [category, threads] of Object.entries(categories)) {
      const box = document.createElement("div");
      box.className = "category-box";
      const title = document.createElement("h2");
      title.textContent = category;
      box.appendChild(title);
      const ul = document.createElement("ul");
      threads.forEach(thread => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="thread.html?id=${thread.id}">${thread.title}</a><br>
        <small>🕓 作成: ${thread.created}｜反映: ${thread.reflected}</small>`;
        ul.appendChild(li);
      });
      box.appendChild(ul);
      container.appendChild(box);
    }
  });