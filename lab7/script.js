document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".content");
  const categoryList = document.querySelector(".category_list");

  const homeLink = document.querySelector(".home_link");
  const catalogLink = document.querySelector(".catalog_link");

  homeLink.addEventListener("click", showHome);
  catalogLink.addEventListener("click", loadCategories);

  let activePage = "home";
  let activeCategory = null;

  showHome();

  function updateNavigation() {
    homeLink.classList.remove("active");
    catalogLink.classList.remove("active");

    if (activePage === "home") {
      homeLink.classList.add("active");
    } else if (activePage === "catalog") {
      catalogLink.classList.add("active");
    }
  }

  function showHome() {
    activePage = "home";
    activeCategory = null;
    updateNavigation();

    categoryList.innerHTML = "";
    content.innerHTML = `
      <h1>Ласкаво просимо!</h1>
      <p>Натисніть "Каталог", щоб побачити категорії товарів.</p>
    `;
  }
  function loadCategories() {
    activePage = "catalog";
    updateNavigation();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data/categories.json");
    xhr.onload = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        const categories = JSON.parse(xhr.responseText);
        displayCategories(categories);
      }
    };
    xhr.send();
  }
  function displayCategories(categories) {
    content.innerHTML = "";
    categoryList.innerHTML = "";
    const list = document.createElement("ul");
    list.className = "category_list";
    categories.forEach((cat) => {
      const li = document.createElement("li");
      li.className = "category_list__element";
      if (activeCategory === cat.shortname) {
        li.classList.add("active");
      }
      const a = document.createElement("a");
      a.textContent = cat.name;
      a.href = "#";
      a.addEventListener("click", () => {
        activeCategory = cat.shortname;

        document.querySelectorAll(".category_list__element").forEach((el) => {
          el.classList.remove("active");
        });
        li.classList.add("active");
        loadCategoryItems(cat.shortname);
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    const special_li = document.createElement("li");
    special_li.className = "category_list__element";
    const special_a = document.createElement("a");
    special_a.href = "#";
    special_a.textContent = "Specials";
    special_a.addEventListener("click", () => {
      document.querySelectorAll(".category_list__element").forEach((el) => {
        el.classList.remove("active");
      });
      special_li.classList.add("active");
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      loadCategoryItems(randomCategory.shortname);
    });
    special_li.appendChild(special_a);
    list.appendChild(special_li);
    categoryList.appendChild(list);
  }
  function loadCategoryItems(shortname) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `data/${shortname}.json`);
    xhr.onload = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        const items = JSON.parse(xhr.responseText);
        displayItems(items);
      }
    };
    xhr.send();
  }
  function displayItems(items) {
    content.innerHTML = "";
    const itemsList = document.createElement("ul");
    itemsList.className = "item_list";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "item_list__element";
      const card = document.createElement("div");
      card.className = "card";
      const img = document.createElement("img");
      if (item.image && item.image.trim() !== "") {
        img.src = item.image;
      } else {
        img.src = "https://placehold.co/200x200?text=Товар";
      }
      img.alt = item.name;
      const cardBody = document.createElement("div");
      cardBody.className = "card_body";
      const title = document.createElement("p");
      title.className = "card_body__title";
      title.textContent = item.name;
      const description = document.createElement("p");
      description.className = "card_body__description";
      description.textContent = item.description;
      const price = document.createElement("p");
      price.className = "item_list__price";
      price.textContent = `${item.price}₴`;
      li.appendChild(card);
      card.appendChild(img);
      card.appendChild(cardBody);
      cardBody.appendChild(title);
      cardBody.appendChild(description);
      cardBody.appendChild(price);
      itemsList.appendChild(li);
    });
    content.appendChild(itemsList);
  }
});
