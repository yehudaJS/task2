// ניב כל ההערות זה אני מנסה לעבור על הקוד שלי
// מייצר מערכים גלובליים
let countries = [];
let regionArr = [];

//קריאת AJAX רגילה 
//מופעל ב html 
async function ajaxRequest() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        countries = await response.json();
        console.log(response);
        console.log(countries);
        //שולח להדפסה 
        let gatAll = 1
        displayCountries(countries, gatAll);
    } catch (error) {
        alert(error.message);
    }
}

//הדפסה
function displayCountries(countries , actionType) {
    
    const displayTable = document.getElementById("displayTable");

     //איתחול משתנים
    let html = "";
    let populationSum = 0;
    regionArr = [];


    /*ניב שים לב אני יודע לא טרוויאלי מה שהלך פה 
    אבל שים לב שאם אני רוצה להשתמש באותה פונקציה 
    אני לא יכול לשלוח מהחיפוש ,
     ואני הייתי חייב לדעת מאיפה הוא נשלח להדפסה 
     ולהתנהג בהתאם */
     
    if (actionType === 1) {
        for (const c of countries) {
        
            html += `
                <tr>
                    <td>${c.name.common}</td>
                    <td>${c.population}</td>
                    <td>${c.region}</td>
                </tr>`;
    
            populationSum += c.population;
            //שליחה ליצירת מערך 
            createRegionArr(c.region);
        }
    } else {
        for (const c of countries) {
           
            html += `
                <tr>
                    <td>${c.name}</td>
                    <td>${c.population}</td>
                    <td>${c.region}</td>
                </tr>`;
    
            populationSum += c.population;
            //שליחה ליצירת מערך 
            createRegionArr(c.region);
        }
    }
 

    html += "</tr>";
    displayTable.innerHTML = html;
    //שליחה של הנתונים לפונקציות
    showHeaderInfo(countries.length, populationSum);
    displayRegionTable(regionArr);
}

function search() {
    const searchCountry = document.getElementById("searchCountry").value.toLowerCase();
    const matchingCountries = [];

    for (const c of countries) {
        const countryName = c.name.common.toLowerCase();
        console.log(c.name.common);
        const populationNum = c.population;
        const regionName = c.region.toLowerCase();

        if (countryName.includes(searchCountry)) {
            matchingCountries.push({ name: countryName, population: populationNum, region: regionName });
        }
    }

   // console.log(`ovad`);
    console.log(matchingCountries);
    let searchType = 0
    displayCountries(matchingCountries , searchType);
}

function createRegionArr(regionName) {
    //שליחה לפונקציה שתחפש במערך רק את הערך האם הוא קיים
    const existingRegion = regionArr.find(item => item.value === regionName);

    if (existingRegion) {
    // אם קיים אז תוסיף ל key
        existingRegion.key++;
    } else {
        //אם לא קיים תוסיף למערך
        regionArr.push({ key: 1, value: regionName });
    }
}

    //הדפסה בטבלה
function displayRegionTable(regionArrFinal) {
    const showDetailesRegion = document.getElementById("showDetailesRegion");

    let html = "";
    for (const r of regionArrFinal) {
        html += `
        <tr>
            <td>${r.value}</td>
            <td>${r.key}</td>
        </tr>`;
    }
    showDetailesRegion.innerHTML = html;
}

//הדפסה של הנתונים
function showHeaderInfo(numOfCountries, populationSum) {
    const display = document.getElementById("displayHeaderInfo");

    html = `
    <p>The number of Countries in the Arr : ${numOfCountries}</p>
    <p>The number of Citizens in the Arr : ${populationSum}</p>
    <p> The population average  in the Arr :${populationSum / numOfCountries}
    `;
    display.innerHTML = html;
}
