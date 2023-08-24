// initialise the references

const result=document.getElementById("result");
const searchBtn=document.getElementById("search_btn");

const url="https://www.themealdb.com/api/json/v1/1/search.php?s=";




const getData = async ()=>{
    try{
        const userInp=document.getElementById("user_dish").value;
        await axios.get(`${url}${userInp}`).then((d)=>{
                let meal=d.data.meals
                let m=meal[0];
                console.log(m);
                console.log(m.strMealThumb);
                console.log(m.strMeal);
                console.log(m.strArea);
                console.log(m.strInstructions);
                let count=1
                const ingre=new Map();
                for (const i in m) 
                {
                    if (i.startsWith("strIngredient") && m[i]) {
                            const ingredient = m[i];
                            const quantity = m[`strMeasure${count}`];
                            ingre.set(ingredient,quantity);
                            count++;
                        }
                }
                for (const [ingredient,quantity] of ingre) {
                        console.log(ingredient,quantity);
                    }

                result.innerHTML=`
                    <img src="${m.strMealThumb}">
                    <div id="content_name">
                        <h2 >${m.strMeal}</h2>
                        <h4 >${m.strArea}</h4>
                    </div> 
                    <div id="ingr_list"></div>
                    <button id="hide2">View Recipe</button>
                    <div id="process">
                        <button id="hide">X</button>
                        <pre id="recipe_process">${m.strInstructions}</pre>
                    </div>`;
                    const ingre_list=document.getElementById("ingr_list");
                    let parent=document.createElement("ul");
                    let hide_Button=document.getElementById("hide");
                    let recipe=document.getElementById("process");
                    let showrecipe=document.getElementById("hide2");
                    ingre.forEach((val,key)=>{
                        let child=document.createElement("li");
                        child.innerText=`${val} ${key}`;
                        parent.appendChild(child);
                        ingre_list.appendChild(parent);
                    });
                    hide_Button.addEventListener("click",()=>{
                            recipe.style.display="none";
                    })
                    showrecipe.addEventListener("click",()=>{
                        recipe.style.display="block"
                    })
                    
                  
           }) 
    }
    catch(e)
    {
        result.innerHTML=`<h3 id="no-input">Dish not found</h3>`;
    }
}

searchBtn.addEventListener("click", () => {
    const userInp=document.getElementById("user_dish").value;
    userInp.length === 0
        ? alert("Please enter a dish before searching.")
        : getData();
});



                











