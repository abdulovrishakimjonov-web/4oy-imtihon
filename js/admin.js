const API = "https://68fae18894ec96066023c657.mockapi.io/api/v2/products";

const grid = document.getElementById("product-grid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const form = document.getElementById("modal-form");

let editId = null;

// 🔥 Products Yuklash
async function loadProducts() {
  const res = await fetch(API);
  const products = await res.json();

  grid.innerHTML = products.map(p => `
    <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 hover:-translate-y-1">
      <div class="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
        <img src="${p.image_url}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
      </div>

      <h2 class="font-semibold text-lg mt-3 truncate">${p.title}</h2>
      <p class="text-gray-600 text-sm mt-1">${Number(p.price_uzs).toLocaleString()} so‘m</p>
      <p class="text-gray-500 text-xs line-clamp-2 mt-2">${p.description || "Tavsif mavjud emas"}</p>

      <div class="flex justify-between items-center mt-4">
        <button onclick="openModal('${p.id}', '${p.title}', '${p.price_uzs}', '${p.image_url}', \`${p.description}\`)" 
          class="px-3 py-1.5 text-sm border-2 hover:bg-cyan-400  text-cyan-400 hover:text-white rounded-lg transition">
        <i class="fa-solid fa-pen text-gray-800" style="color:;"></i> Tahrirlash
        </button>

        <button onclick="deleteProduct('${p.id}')"
          class="px-3 py-1.5 text-sm border-2 hover:bg-slate-800 text-slate-800 font-bold hover:text-white rounded-lg transition">
          🗑 O‘chirish
        </button>
      </div>
    </div>
  `).join("");
}

loadProducts();

// 🔥 Modal ochish
function openModal(id = null, title = "", price = "", image = "", desc = "") {
  editId = id;
  modalTitle.textContent = id ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo‘shish";

  form.title.value = title;
  form.price_uzs.value = price;
  form.image_url.value = image;
  form.description.value = desc;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// 🔥 Modal yopish
function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  form.reset();
}

// 🔥 Saqlash
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    title: form.title.value,
    price_uzs: Number(form.price_uzs.value),
    image_url: form.image_url.value,
    description: form.description.value
  };

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
  }

  closeModal();
  loadProducts();
});

// 🔥 O‘chirish
async function deleteProduct(id) {
  if (confirm("Rostdan o‘chirmoqchimisiz?")) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadProducts();
  }
}

// 🔥 Logout
function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
}
