
fetch('story_data.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1);
    const container = document.getElementById('storyTable');
    const categorySelect = document.getElementById('categorySelect');
    const seriesMap = {};
    const tagSet = new Set();

    rows.forEach(line => {
      if (!line.trim()) return;
const [title, path1, path2, series, tags] = line.split(',');
if (!title || !path1 || !path2 || !series || !tags) return;

const fullPath = `${path1}/${path2}.html`;

if (!seriesMap[series]) seriesMap[series] = [];
seriesMap[series].push({ title, path: fullPath, tags });
tagSet.add(tags);

    });
    
    
    tagSet.forEach(tag => {
      const option = document.createElement('option');
      option.value = tag;
      option.textContent = tag;
      categorySelect.appendChild(option);
    });

    function renderTable(filter = 'all') {
      container.innerHTML = '';

  // 👇 このブロックを追加！
  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');

  Object.keys(seriesMap).forEach((series, i) => {
    const filtered = seriesMap[series].filter(entry => {
      return filter === 'all' || entry.tags === filter;
    });

    if (filtered.length > 0) {
      const header = document.createElement('div');
      header.classList.add('table-header');
      header.innerHTML = `<div class="cell title">${series}</div>`;
      tableContainer.appendChild(header);

      filtered.forEach(entry => {
        const div = document.createElement('div');
        div.classList.add('table-row');
        div.innerHTML = `<div class="cell title"><a href="${entry.path}">${entry.title}</a></div>`;
        tableContainer.appendChild(div);
      });
    }
  });

  // 👇 最後に container に追加
  container.appendChild(tableContainer);
}

    categorySelect.addEventListener('change', () => {
      renderTable(categorySelect.value);
    });

    renderTable();
  });
