
const API = "https://68fae18894ec96066023c657.mockapi.io/api/v2/products"; // Bu yerga MockAPI link qo'yasiz


const grid = document.getElementById("productGrid");
const addModal = document.getElementById("addModal");
document.getElementById("openAddModal").onclick = () => addModal.classList.remove("hidden");
document.getElementById("closeAddModal").onclick = () => addModal.classList.add("hidden");


async function fetchData() {
const res = await fetch(API);
const data = await res.json();
renderProducts(data);
}


function renderProducts(products) {
grid.innerHTML = "";
products.forEach(item => {
const card = document.createElement("div");
card.className = "bg-white p-4 rounded shadow hover:-translate-y-1 hover:shadow-lg transition";
card.innerHTML = `
<img src="${item.image_url}" class="h-40 w-full object-cover rounded" />
<h3 class="mt-3 font-semibold">${item.description}</h3>
<p class="text-gray-600">${item.price_uzs} so'm</p>
<div class="flex gap-2 mt-3">
<button class="px-3 py-1 bg-green-600 text-white rounded">Edit</button>
<button onclick="deleteProduct(${item.id})" class="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
</div>
`;
grid.appendChild(card);
});
}


async function deleteProduct(id) {
await fetch(`${API}/${id}`, { method: "DELETE" });
fetchData();
}


document.getElementById("saveProduct").onclick = async () => {
const newProduct = {
name: document.getElementById("addName").value,
price: document.getElementById("addPrice").value,
image: document.getElementById("addImage").value
};
await fetch(API, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(newProduct)
});
addModal.classList.add("hidden");
fetchData();
};
getProducts();