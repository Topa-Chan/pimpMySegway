var request = new XMLHttpRequest();
//Main Div
var segwayApp = document.getElementById("segway");

//Option Buttons
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
var homePage = document.createElement("div");
homePage.setAttribute("id", "home_page");
var confirmPage = document.createElement("div");
confirmPage.setAttribute("id", "confirm_page");
var customPage = document.createElement("div");
customPage.setAttribute("id", "custom_page");
var checkoutPage = document.createElement("div");
checkoutPage.setAttribute("id", "checkout_page");
var thankYouPage = document.createElement("div");
thankYouPage.setAttribute("id", "thank_you_page");

//Loading in JSON date
function loadData() {
  request.open('GET', 'scripts/segway.json');
  request.onload = loadComplete;
  request.send();
}

function loadComplete(evt) {
  var json = JSON.parse(request.responseText);
  buildHomePage(json);
}



//Building buttons
colours.forEach(buildOption);
tireTypes.forEach(buildOption);
engineTypes.forEach(buildOption);
customAdds.forEach(buildOption);

//Build Options Function
function buildOption(item, index, arr, isCustom){
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
  buttons[index].addEventListener('click', optionClicked);
}

//Build Order Button Function
function buildOrderButton(isCustom, segwayName) {
  var buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "bottom-btn");
  buttonDiv.textContent = 'Add To Order';
  if (isCustom) {
    buttonDiv.addEventListener('click', buildCustomPage(tabs, segwayName));
  } else {
    buttonDiv.addEventListener('click', buildConfirmPage(segwayName));
  }

  return buttonDiv;
}

//Build Modify Button Function
function buildModifyButton() {
  
}

//Option Clicked Evt
function optionClicked(evt) {
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
}

//Tab Clicked Evt
function tabClicked(evt) {

}

//Button Clicked Evt
function buttonClicked(evt) {

}

//Building Segway Specials
function createSegwaySpecial(imgSource, name, description, isCustom) {
  var divContainer = document.createElement("div");
  divContainer.setAttribute("class", "flex-row");

  var img = document.createElement("img");
  img.setAttribute("class", "segwayPic");
  img.setAttribute("src", imgSource);

  var divInfo = document.createElement("div");
  divInfo.setAttribute("class", "flex-col");

  var divName = document.createElement("div");
  divName.setAttribute("class", "segName");
  divName.textContent = name;

  var divDesc = document.createElement("div");
  divDesc.setAttribute("class", "segDesc");  
  divDesc.textContent = description;

  var orderButton = buildOrderButton(isCustom, name);
  
  divInfo.appendChild(divName);
  divInfo.appendChild(divDesc);
  divInfo.appendChild(orderButton);

  divContainer.appendChild(img);
  divContainer.appendChild(divInfo);
  
  return divContainer;
}


//Building Pages
function buildHomePage(json) {
  segwayApp.innerHTML = '';
  var isCustom = false;
  for (var index in json.specials) {
    console.log(json.specials[index])
    if (json.specials[index].Name === "Custom") {
      isCustom = true;
    }
    segwayApp.appendChild(createSegwaySpecial(json.specials[index].ImageSource, json.specials[index].Name, json.specials[index].Description, isCustom))
  }
}

function buildCustomPage(tab, segwayType) {
  segwayApp.innerHTML = '';
  for (var i = 0; i < tab.length; i++) {
    console.log("Tab: " + tab[i]);
  }
  //customPage.appendChild()
  segwayApp.appendChild(customPage);
}

function buildConfirmPage(segwayType) {
  segwayApp.innerHTML = '';
}

function buildCheckoutPage() {
  segwayApp.innerHTML = '';
}

function buildThanksPage() {
  segwayApp.innerHTML = '';
}


loadData();