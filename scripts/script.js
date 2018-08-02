var request = new XMLHttpRequest();
//Main Div
var segwayApp = document.getElementById("segway");

//json
var json;

//Pages List
var pagesList = ['Segway Specials'];

//Option Buttons
var colours = ['Gold', 'Red', 'Green', 'Blue', 'Black'];
colours.name = "Colours";
var tireTypes = ['Bike', 'Tractor', 'Normal'];
tireTypes.name = "Tires";
var engineTypes = ['Electric', 'Petrol', 'Dual'];
engineTypes.name = "Engines";
var customAdds = ['Deep Fried', 'Cup Holders', 'Tassels', 'Extra Batteries', 'Horn', 'Basket', 'Bluetooth Speakers', 'Glitter'];
customAdds.name = "Customs";

//Page Button Options
var thankYouBtnList = ["Back to Menu", "Checkout"];
var confirmBtnList = ["Modify", "Add To Order"];
var checkOutBtnList = ["Modify", "Add To Order"];

//Tab Elements 
var colourTab = document.createElement("div");
colourTab.setAttribute('class', 'colourTab tab');
var tireTab = document.createElement("div");
tireTab.setAttribute('class', 'tireTab tab');
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
  json = JSON.parse(request.responseText);
  //buildHomePage(json);
  //buildThanksPage(thankYouBtnList);
  //buildConfirmPage(confirmBtnList);
  buildCheckoutPage(checkOutBtnList);
}

//Building buttons
colours.forEach(buildOption);
tireTypes.forEach(buildOption);
engineTypes.forEach(buildOption);
customAdds.forEach(buildOption);

//Build Options Function
function buildOption(item, index, arr, isCustom){
  // console.log("Array Name: " + arr.name);
  // console.log("button " + item + " at index " + index + ' created.');
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
    buttonDiv.setAttribute("onclick", `buildCustomPage('${tabs}','${segwayName}')`);
  } else {
    buttonDiv.setAttribute("onclick", `buildConfirmPage('${segwayName}')`);
  }
  // if (isCustom) {
  //   buttonDiv.addEventListener('click', function(){
  //     console.log("I click");
  //     buildCustomPage(tabs, segwayName)
  //   });
  // } else {
  //   buttonDiv.addEventListener('click', function(){
  //     console.log("I click");
  //     buildConfirmPage(segwayName, confirmBtnList);
  //   });
  // }

  return buttonDiv;
}
//Page Button Functions
function thankYouCreateButtons(button) {
  var btn = document.createElement("div");
  btn.setAttribute("class", "right-mar");
  btn.setAttribute("class", "btn btn-theme-1");
  btn.textContent = button
  //btn.addEventListener('click', buildHomePage(json));

  return btn;
}

function confirmCreateButtons(button, segName) {

  var btnRow = document.createElement("div");
  btnRow.setAttribute("class", "flex-row");
  var btn = document.createElement("div");
  btn.setAttribute("class", "btn btn-theme-1");
  btn.textContent = button;

  if (button == "Modify") {
    btn.setAttribute("class", "bottom-btn");
    btn.setAttribute("onclick", `buildCustomPage('${tabs}','${segName}')`);
  }
  else if (button == "Add To Order") {
    btn.setAttribute("class", "top-btn");
    btn.setAttribute("onclick", `buildCheckoutPage()`);
  }
  btnRow.appendChild(btn);

  return btnRow;
}

//Build Modify Button Function
function buildModifyButton() {
  
}

//Option Clicked Evt
function optionClicked(evt) {
  // console.log(evt.target.innerText + " clicked");
  // evt.target.style.backgroundColor = "#21f";
  var preSplitName = evt.target.attributes[0].value;
  // console.log("Pre Split: " + preSplitName);
  var splitName = preSplitName.split(" ");
  // console.log("Split Name: " + splitName);
  var name = splitName[1];
  // console.log("Name: " + name)
  if (name === "colour") {
    // console.log("Colour");
    //crustBtnNames.forEach(checkActive, evt);
    //evt.target.classList.add("active");
  } 
  if (name === "tire") {
    // console.log("Tire");
    //cheeseBtnNames.forEach(checkActive, evt);
    //evt.target.classList.add("active");
  }
  if (name === "engine") {
    // console.log("Engine")
    //sauceBtnNames.forEach(checkActive, evt);
    //evt.target.classList.add("active");
  }
  if (name === "custom") {
    // console.log("Custom")
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
function createSegwaySpecial(imgSource, name, description, segId, isCustom) {
  var divContainer = document.createElement("div");
  //divContainer.setAttribute("id", segId);
  divContainer.setAttribute("class", "flex-row");

  var img = document.createElement("img");
  img.setAttribute("class", "segwayPic");
  img.setAttribute("src", imgSource);

  var divInfo = document.createElement("div");
  divInfo.setAttribute("class", "flex-col");

  var divName = document.createElement("div");
  divName.setAttribute("id", segId);
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

//Building navbar
function createNavBar(navItemsList) {
  var navContainer = document.createElement("div");
  navContainer.setAttribute("class", "nav");

  var homeLink = document.createElement("div");
  homeLink.setAttribute("class", "nav-item");
  homeLink.addEventListener('click', function(){
    buildHomePage(json);
  });
  homeLink.textContent = "Segway Specials";

  navContainer.appendChild(homeLink);
  segwayApp.appendChild(navContainer);
}

//Building Pages
function buildHomePage(json) {
  segwayApp.innerHTML = '';
  createNavBar(pagesList);
  var html = '';
  for (var index in json.specials) {
    var isCustom = json.specials[index].Name == "Custom";
    var div = createSegwaySpecial(json.specials[index].ImageSource, json.specials[index].Name, json.specials[index].Description, json.specials[index].Id, isCustom);
    // segwayApp.appendChild(div);
    html += div.outerHTML;
  }
  segwayApp.innerHTML = html;
}

function buildCustomPage(tab, segwayType) {
  segwayApp.innerHTML = '';
  for (var i = 0; i < tab.length; i++) {
    // console.log("Tab: " + tab[i]);
  }
  //customPage.appendChild()
  segwayApp.appendChild(customPage);
}

function buildConfirmPage(segwayType) {
  segwayApp.innerHTML = '';
  var divContainer = document.createElement("div");
  divContainer.setAttribute("class", "flex-row container");

  //var canvas = document.createElement("canvas");
  //canvas.setAttribute("id", "pizza");
  //canvas.setAttribute("class", "");

  var btnArea = document.createElement("div");
  btnArea.setAttribute("name", "btn-area");
  btnArea.setAttribute("class", "flex-col");

  for (var index in confirmBtnList) {
    var temp_btn = confirmCreateButtons(confirmBtnList[index]);
    btnArea.appendChild(temp_btn);
  }

  //divContainer.appendChild(canvas);
  divContainer.appendChild(btnArea);

  //console.log("I work");
  segwayApp.appendChild(divContainer);
}

function buildCheckoutPage(customs_list) {
  segwayApp.innerHTML = '';

  var containerOutline = document.createElement("div");
  containerOutline.setAttribute("class", "flex-row container outline");

  var innerContainer = document.createElement("div");
  innerContainer.setAttribute("class", "flex-col");

  var colourContainer = document.createElement("div");
  colourContainer.setAttribute("id", "colourArea");
  colourContainer.setAttribute("class", "flex-row box-area");
  
  var colourLabel = document.createElement("div");
  colourLabel.setAttribute("class", "inner-box");
  colourLabel.textContent = "Colour:";

  var colourValue = document.createElement("div");
  colourValue.setAttribute("class", "inner-box");
  colourValue.textContent = "Placeholder";

  colourContainer.appendChild(colourLabel);
  colourContainer.appendChild(colourValue);

  var tiresContainer = document.createElement("div");
  tiresContainer.setAttribute("id", "tiresArea");
  tiresContainer.setAttribute("class", "flex-row box-area");
  
  var tiresLabel = document.createElement("div");
  tiresLabel.setAttribute("class", "inner-box");
  tiresLabel.textContent = "Tires:";

  var tiresValue = document.createElement("div");
  tiresValue.setAttribute("class", "inner-box");
  tiresValue.textContent = "Placeholder";

  tiresContainer.appendChild(tiresLabel);
  tiresContainer.appendChild(tiresValue);

  var engineContainer = document.createElement("div");
  engineContainer.setAttribute("id", "engineArea");
  engineContainer.setAttribute("class", "flex-row box-area");
  
  var engineLabel = document.createElement("div");
  engineLabel.setAttribute("class", "inner-box");
  engineLabel.textContent = "Engine:";

  var engineValue = document.createElement("div");
  engineValue.setAttribute("class", "inner-box");
  engineValue.textContent = "Placeholder";

  engineContainer.appendChild(engineLabel);
  engineContainer.appendChild(engineValue);

  var customContainer = document.createElement("div");
  customContainer.setAttribute("id", "customArea");
  customContainer.setAttribute("class", "flex-row box-area");

  var customLabel = document.createElement("div");
  customLabel.setAttribute("class", "inner-box");
  customLabel.textContent = "Customs:";

  var customValue = document.createElement("div");
  customValue.setAttribute("id", "customsList");
  customValue.setAttribute("class", "inner-box list");

  for (var index in customs_list) {
    var tempItem = document.createElement("div");
    tempItem.setAttribute("class", "list-item");
    tempItem.textContent = customs_list[index];
    customValue.appendChild(tempItem);
  }

  var totalContainer = document.createElement("div");
  totalContainer.setAttribute("id", "totalArea");
  totalContainer.setAttribute("class", "flex-row box-area");
  
  var totalLabel = document.createElement("div");
  totalLabel.setAttribute("class", "inner-box");
  totalLabel.textContent = "Total:";

  var totalValue = document.createElement("div");
  totalValue.setAttribute("class", "inner-box");
  totalValue.textContent = "Placeholder";

  totalContainer.appendChild(totalLabel);
  totalContainer.appendChild(totalValue);

  



  var btnContainer = document.createElement("div");
  btnContainer.setAttribute("id", "btnArea");
  btnContainer.setAttribute("class", "flex-row box-area");
  
  // Add build button function

  btnContainer.appendChild(btn1);
  btnContainer.appendChild(btn2);

  
  segwayApp.appendChild(containerOutline);
}

function buildThanksPage(btn_array) {
  segwayApp.innerHTML = '';
  var container = document.createElement("div");
  container.setAttribute("class", "flex-col thanks");

  var msg = document.createElement("div");
  msg.setAttribute("id", "thanks-msg");
  msg.textContent = "Thank you for your order!";

  var btnDiv = document.createElement("div");
  btnDiv.setAttribute("class", "flex-row");

  for (var index in btn_array) {
    var tempBtn = thankYouCreateButtons(btn_array[index]);
    btnDiv.appendChild(tempBtn);
  }
  container.appendChild(msg);
  container.appendChild(btnDiv);
  segwayApp.appendChild(container);
}


loadData();