import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const searchRecipes = async () => {
    if (!query) return;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data = await response.json();
    setRecipes(data.meals || []);
  };

  return (
    <div className="app">
      <h1>🍽 Recipe Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchRecipes}>Search</button>
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div
            className="card"
            key={recipe.idMeal}
            onClick={() => setSelectedRecipe(recipe)}
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
            <p>{recipe.strCategory}</p>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setSelectedRecipe(null)}>Close</button>
            <h2>{selectedRecipe.strMeal}</h2>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              width="300"
            />
            <p>
              <strong>Category:</strong> {selectedRecipe.strCategory}
            </p>
            <p>
              <strong>Area:</strong> {selectedRecipe.strArea}
            </p>
            <p>{selectedRecipe.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;