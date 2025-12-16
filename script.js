document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const searchInput = document.getElementById("searchInput");

  if (btn) {
    btn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }


  let allRecipes = [];
  let debounceTimer;

  // Fetch JSON Data
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      renderCards(allRecipes);
    });

  // Render Cards Function
  function renderCards(recipes) {
    const container = document.getElementById("cards-Container");
    container.innerHTML = "";

    recipes.forEach((recipe) => {
      container.innerHTML += `
        <div class="relative h-[280px] overflow-hidden bg-pink-200 rounded-2xl shadow-lg group">

          <div class="p-3 relative z-10">
            <h2 class="text-xl font-bold text-gray-700">
              ${(recipe.mealType || []).join(", ")}
            </h2>

            <p class="text-green-800 text-sm">
              <strong>Prep Time:</strong> ${recipe.prepTimeMinutes} mins
            </p>
          </div>
        
          <img
            src="${recipe.image}"
            class="w-full h-60 object-cover transition-transform duration-500
                   group-hover:scale-110"
          />

          <div
            class="absolute inset-0 bg-black/60 flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <h2 class="text-white text-2xl font-bold">
              ${recipe.name}
            </h2>
        
          </div>

        </div>
      `;
    });
  }

  //Debounced Search
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const value = searchInput.value.toLowerCase();

      const filteredRecipes = allRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(value) ||
        (recipe.mealType || [])
          .join(" ")
          .toLowerCase()        
      );

      renderCards(filteredRecipes);
    },300);
  });

});
