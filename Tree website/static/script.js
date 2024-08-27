document.addEventListener('DOMContentLoaded', function () {
    const trees = [
        "Oak", "Maple", "Pine", "Birch", "Redwood", "Cherry", "Willow", "Aspen", "Elm", "Magnolia" // Replaced Cedar with Magnolia
    ];

    const treeList = document.getElementById('tree-list');
    const treeInfo = document.getElementById('tree-info');

    trees.forEach(tree => {
        const button = document.createElement('button');
        button.textContent = tree;
        button.addEventListener('click', () => fetchTreeInfo(tree));
        treeList.appendChild(button);
    });

    function fetchTreeInfo(tree) {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(tree)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.type === 'standard') {
                    treeInfo.innerHTML = `
                        <h2>${data.title}</h2>
                        <img src="${data.thumbnail ? data.thumbnail.source : 'https://via.placeholder.com/400x200?text=No+Image+Available'}" alt="${data.title}">
                        <p>${data.extract}</p>
                    `;
                } else {
                    treeInfo.innerHTML = `<p>No information available for ${tree}.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching tree information:', error);
                treeInfo.innerHTML = `<p>Error fetching information for ${tree}.</p>`;
            });
    }
});
