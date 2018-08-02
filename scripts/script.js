var request = new XMLHttpRequest();

//Main Div
var segwayApp = document.getElementById("segway");

//Segway Image Div
var imgDiv = document.createElement('div');
imgDiv.setAttribute("class", "segboi_img");

//Segway Image []
var segboi = [];
var finalBoi = {};

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
var customAdds = ['Deep Fried', 'Cup Holder', 'Tassels', 'Extra Batteries', 'Horn', 'Basket', 'Bluetooth Speakers', 'Glitter'];
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
  //buildHomePage();
  buildThanksPage(thankYouBtnList);
  //buildConfirmPage(confirmBtnList);
  //buildCheckoutPage(checkOutBtnList);
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
  btn.setAttribute("onclick", `buildHomePage()`);
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
  var segboi_img_check = 1;
  // console.log(evt.target.innerText + " clicked");
  // evt.target.style.backgroundColor = "#21f";
  var preSplitName = evt.target.attributes[0].value;
  // console.log("Pre Split: " + preSplitName);
  var splitName = preSplitName.split(" ");
  // console.log("Split Name: " + splitName);
  var name = splitName[1];
  console.log(name);
  // console.log("Name: " + name)
  if (name === "colour") {
    console.log("Colour");
    //crustBtnNames.forEach(checkActive, evt);
    //evt.target.classList.add("active");
    console.log(evt.target.textContent);
    evt.target.classList.add("active");
    //'colour_base.png'
    segboi.push("url(images/" + evt.target.textContent.toLowerCase() + "_Base.png)");
  } 
  if (name === "tire") {
    console.log("Tire");
    //cheeseBtnNames.forEach(checkActive, evt);
    //evt.target.classList.add("active");
    console.log(evt.target.textContent);
    evt.target.classList.add("active");
    //'tireType_Tires.png'
    segboi.push("url(images/" + evt.target.textContent.toLowerCase() + "_Tires.png)");
  }
  if (name === "engine") {
    console.log("Engine")
    //sauceBtnNames.forEach(checkActive, evt);
    console.log(evt.target.textContent);
    evt.target.classList.add("active");
    //Don't need to change photo
  }
  if (name === "custom") {
    console.log("Custom")
    //toppingsActive(evt);
    console.log(evt.target.textContent);
    evt.target.classList.add("active");
    switch(evt.target.textContent) {
      case "Deep Fried":
        //DEEP FRIED
        evt.target.classList.add("active");
        segboi.push("url(images/deepfried.png)");
        break;
      case "Cup Holder":
        evt.target.classList.add("active");
        segboi.push("url(images/cupHolder.png)");
        break;
      case "Tassels":
        evt.target.classList.add("active");
        segboi.push("url(images/tassels.png)");
        break;
      case "Extra Batteries":
        evt.target.classList.add("active");
        //Don't need to change picture
        break;
      case "Horn":
        evt.target.classList.add("active");
        segboi.push("url(images/horn.png)");
        break;
      case "Basket":
        evt.target.classList.add("active");
        segboi.push("url(images/basket.png)");
        break;
      case "Bluetooth Speakers":
        evt.target.classList.add("active");
        segboi.push("url(images/bluetoothlight.png)");
        break;
      case "Glitter":
        evt.target.classList.add("active");
        segboi.push("url(images/glitter.png)");
      default:
        break;
    }
    //Have to focus on text content of the button to see what pic is needed
  }
  buildSegway(segboi_img_check);
}

//Making Segway Picture
function buildSegway(x) {
  if (x === 0) {
    console.log("We are going to build the base segway");
    imgDiv.style.background = "url(images/default_segboi.png)";
  } else {
    //Logic for building image(s)
    imgDiv.style.background = "none";
    for (var i = 0; i < segboi.length; i++) {
      imgDiv.style.background = segboi[i];
    }
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
    buildHomePage();
  });
  homeLink.textContent = "Segway Specials";

  navContainer.appendChild(homeLink);
  segwayApp.appendChild(navContainer);
}

//Building Pages
function buildHomePage() {
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
  buildSegway(0);
  var preSplitName = evt.target.attributes[0].value;
  var splitName = preSplitName.split(" ");
  var name = splitName[0];
  console.log(name);
  var tabContainer = document.createElement('div');
  for (var i = 0; i < tabs.length; i++) {
    console.log("Tab: " + tabs[i]);
    switch(name) {
      case "colourTab":
        tab.textContent = "Colours";
        break;
      case "tireTab":
        tab.textContent = "Tires";
        break;
      case "engineTab":
        tab.textContent = "Engines";
        break;  
      case "customTab":
        tab.textContent = "Custom Mods";
        break;
      default:
        break;
    }
    tabContainer.appendChild(tab);
  }
  customPage.appendChild(imgDiv);
  customPage.appendChild(tabContainer);
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

function buildCheckoutPage() {
  segwayApp.innerHTML = '';
  var containerOutline = document.createElement("div");
  containerOutline.setAttribute("class", "flex-row outline");
  
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