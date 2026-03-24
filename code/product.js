export function addProductToCart(product) {
    const container = document.querySelector(".products");

    // 👉 evitar duplicados
    const existing = document.querySelector(`[data-id="${product.id}"]`);

    if (existing) {
        const input = existing.querySelector("input");
        input.value = parseInt(input.value) + 1;
        return;
    }

    const div = document.createElement("div");
    div.classList.add("product");
    div.setAttribute("data-id", product.id);

    div.innerHTML = `
        <img src="${product.image || 'https://via.placeholder.com/100'}">

        <div class="info">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <span class="${product.stock ? 'stock' : 'shipping'}">
                ${product.stock ? '✔ In stock' : 'Sin stock'}
            </span>
        </div>

        <div class="actions">
            <input type="number" value="1" min="1">
            <button class="remove">✕</button>
        </div>
    `;

    container.appendChild(div);
}