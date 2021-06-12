// fetch("/api/projects").then(res => res.json()).then(console.log);

(async function getRecipes() {
    try {
        const response = await fetch("/api/recipes");
        const result = await response.json();

        const recipeList = document.getElementById("recipes");
        
        result.recipes.map(recipe => {
            const recipeDiv = document.createElement("div");
            

            const card = document.createElement("div");
            card.classList.add("card", "mx-auto", "my-2");
            card.style="width: 18rem;"

            const cardPicture = document.createElement("div");
            card.classList.add("cardPicture");
            card.style="width: 18rem;"

            const cardBody = document.createElement("div");     
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.innerText = recipe.title;

            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.innerText = recipe.description;

            const cardStartDate = document.createElement("p");
            cardStartDate.classList.add("card-startDate");
            cardStartDate.innerText = recipe.startDate;

            const cardSlutDate = document.createElement("p");
            cardSlutDate.classList.add("card-endDate");
            cardSlutDate.innerText = recipe.endDate;

            recipeDiv.appendChild(card);
            recipeDiv.appendChild(cardPicture);
            card.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardStartDate);
            cardBody.appendChild(cardSlutDate);

            recipeList.appendChild(recipeDiv);


            
        });


            } catch (error) {
                console.log(error);
            }
        })();


// fetch("/api/projects").then(res => res.json()).then(console.log);


