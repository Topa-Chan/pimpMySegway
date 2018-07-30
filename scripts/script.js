//Main Div
var segwayApp = document.getElementById("segway");

//Buttons
var colours = ['Gold', 'Red', 'Green', 'Blue', 'Black'];
colours.name = "Colours";
var tireTypes = ['Bike', 'Tractor', 'Normal'];
tireTypes.name = "Tires";
var engineTypes = ['Electric', 'Petrol', 'Dual'];
engineTypes.name = "Engines";
var customAdds = ['Deep Fried', 'Cup Holders', 'Tassels', 'Extra Batteries', 'Horn', 'Basket', 'Bluetooth Speakers', 'Glitter']
customAdds.name = "Customs";

//Tab Elements 
var colourTab = document.createElement("div");
colourTab.setAttribute('class', 'colourTab tab')
var tireTab = document.createElement("div");
tireTab.setAttribute('class', 'tireTab tab')
var engineTab = document.createElement("div");
engineTab.setAttribute('class', 'engineTab tab');
var customTab = document.createElement("div");
customTab.setAttribute('class', 'customTab tab');
var tabs = [colourTab, tireTab, engineTab, customTab];
var buttons = [];

//Page
var homePage;
var confirmPage;
var customPage;
var checkoutPage;
var thankYouPage;

//Building buttons


//Build Buttons Function
function buildButton(item, index, arr){
  console.log("Array Name: " + arr.name);
  console.log("button " + item + " at index " + index + ' created.');
  buttons[index] = document.createElement('div');
  buttons[index].textContent = item;
  // buttons[index].setAttribute('class', 'btn');
  if (arr.name === "Colours") {
    buttons[index].setAttribute('class', 'btn colour');
    colourTab.appendChild(buttons[index]);
  }
  if (arr.name === "Tires") {
    buttons[index].setAttribute('class', 'btn tire');
    tireTab.appendChild(buttons[index]);
  }
  if (arr.name === "Engines") {
    buttons[index].setAttribute('class', 'btn engine');
    engineTab.appendChild(buttons[index]);
  } 
  if (arr.name === "Customs") {
    buttons[index].setAttribute('class', 'btn custom');
    customTab.appendChild(buttons[index]);
  }
  if (arr.name === "Add") {
    buttons[index].setAttribute('class', 'btn add');
    customTab.appendChild(buttons[index]);
  }
  // container.appendChild(buttons[index]);
  buttons[index].addEventListener('click', btnClicked);
}

//Button Clicked Evt
function btnClicked(evt) {
  console.log(evt.target.innerText + " clicked");
  // evt.target.style.backgroundColor = "#21f";
  var preSplitName = evt.target.attributes[0].value;
  console.log("Pre Split: " + preSplitName);
  var splitName = preSplitName.split(" ");
  console.log("Split Name: " + splitName);
  var name = splitName[1];
  console.log("Name: " + name)
  if (name === "colour") {
    console.log("Colour");
    //crustBtnNames.forEach(checkActive, evt);
    //evt.target.classList.add("active");
  } 
  if (name === "tire") {
    console.log("Tire");
    //cheeseBtnNames.forEach(checkActive, evt);
    //evt.target.classList.add("active");
  }
  if (name === "engine") {
    console.log("Engine")
    //sauceBtnNames.forEach(checkActive, evt);
    //evt.target.classList.add("active");
  }
  if (name === "custom") {
    console.log("Custom")
    //toppingsActive(evt);
  }
  if (name === "add") {
    console.log("Add")
  }
}

//Building Pages
buildCustomPage(customPage, tabs);

function buildPage(page, tab) {
  for (var i = 0; i < tab.length; i++) {
    console.log("Tab: " + tab[i]);
  }
  page = document.createElement("div");
  page.appendChild()
  segwayApp.appendChild(page);

  if (page === "homePage") {
    buildHomePage();
  }
  if (page === "confirmPage") {
    buildConfirmPage();
  }
  if (page === "customPage") {
    buildCustomPage();
  }
  if (page === "checkoutPage") {
    buildCheckoutPage();
  }
  if (page === "thankYouPage") {
    buildThanksPage();
  }
}

function buildHomePage() {
  
}

function buildCustomPage() {

}

function buildConfirmPage() {

}

function buildCheckoutPage() {

}

function buildThanksPage() {

}
