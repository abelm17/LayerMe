import { db } from "./firebaseInit.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsDiv = document.getElementById("search-results");

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  resultsDiv.innerHTML = "Searching...";

  if (!searchTerm) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  try {
    const cologneRef = collection(db, "colognes");
    const snapshot = await getDocs(cologneRef);

    const matches = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const name = data.name?.toLowerCase() || "";
      const brand = data.brand?.toLowerCase() || "";

      if (name.includes(searchTerm) || brand.includes(searchTerm)) {
        matches.push({ id: doc.id, ...data });
      }
    });

    if (matches.length === 0) {
      resultsDiv.innerHTML = "No results found.";
      return;
    }

    resultsDiv.innerHTML = "";
    matches.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Brand:</strong> ${item.brand}</p>
        <p><strong>Top Notes:</strong> ${item.top_notes?.join(", ")}</p>
        <p><strong>Middle Notes:</strong> ${item.middle_notes?.join(", ")}</p>
        <p><strong>Base Notes:</strong> ${item.base_notes?.join(", ")}</p>
        <hr />
      `;
      resultsDiv.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching colognes:", error);
    resultsDiv.innerHTML = "<p>Failed to fetch results. Try again later.</p>";
  }
});
