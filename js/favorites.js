// LocalStorage dan favoritlarni olish
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// localStorage saqlash
function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

// Favorite belgisini yuqoridagi yurakchada yangilash
function updateFavoritesCounter() {
  const counter = document.getElementById("favorite-counter");
  const favorites = getFavorites();
  if (counter) counter.textContent = favorites.length;
}

// Favorites sahifaga cardlarni chiqarish
function renderFavorites() {
  const container = document.getElementById("favorite-products");
  const favorites = getFavorites();

  if (favorites.length === 0) {
    container.innerHTML = `<p class="text-gray-500">Избранных товаров нет.</p>`;
    return;
  }

  container.innerHTML = ""; // tozalash

  favorites.forEach((product) => {
    const card = document.createElement("div");
    card.className = "border p-3 rounded-lg shadow-sm bg-white relative";

    card.innerHTML = `
      <img src="${product.image_url}" class="w-full h-48 object-cover rounded">
      <h3 class="mt-2 font-medium text-sm text-gray-800">${product.description}</h3>
      <p class="text-green-600 font-semibold text-sm mt-1">${product.price_uzs.toLocaleString()} so'm</p>

      <button data-action="remove-favorite" class="absolute top-2 right-2 text-red-500 text-lg">
        <i class="fa-solid fa-heart"></i>
      </button>
    `;

    // Favdan o‘chirish tugmasi
    card.querySelector('[data-action="remove-favorite"]').addEventListener("click", () => {
      const updated = favorites.filter((item) => item.id !== product.id);
      saveFavorites(updated);
      renderFavorites();
      updateFavoritesCounter();
    });

    container.appendChild(card);
  });
}

// Sahifa yuklanganda ishga tushadi
window.addEventListener("DOMContentLoaded", () => {
  renderFavorites();
  updateFavoritesCounter();
});


window.addEventListener("DOMContentLoaded", updateFavoritesCounter);
