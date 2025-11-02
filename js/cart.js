function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function changeCount(id, type) {
  const cart = getCart();

  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (type === "plus") item.count++;
  if (type === "minus") {
    item.count--;
    if (item.count <= 0) {
      return removeItem(id); // 0 bo‘lsa o‘chadi
    }
  }

  saveCart(cart);
}

function removeItem(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
}

function renderCart() {
  const cart = getCart();
  const cartContainer = document.getElementById("cart-container");

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center text-gray-600">Savatcha bo‘sh</p>`;
    document.getElementById("total-price").textContent = 0;
    return;
  }

  let total = 0;

  cartContainer.innerHTML = cart
    .map(item => {
      total += item.price_uzs * item.count;

      return `
        <div class="flex items-center gap-4 bg-white p-4 rounded shadow">
          <img src="${item.image_url}" class="w-20 h-20 object-cover rounded">

          <div class="flex-1">
            <h4 class="font-semibold">${item.description}</h4>
            <p class="text-gray-700">${item.price_uzs.toLocaleString()} so‘m</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="changeCount('${item.id}', 'minus')" class="px-3 py-1 bg-gray-300 rounded">−</button>
            <span class="font-bold w-6 text-center">${item.count}</span>
            <button onclick="changeCount('${item.id}', 'plus')" class="px-3 py-1 bg-gray-300 rounded">+</button>
          </div>

          <button onclick="removeItem('${item.id}')" class="text-red-600 font-bold text-lg">
            ×
          </button>
        </div>
      `;
    })
    .join("");

  document.getElementById("total-price").textContent = total.toLocaleString();
}

renderCart();
