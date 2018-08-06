var request = new XMLHttpRequest();

//Main Div
var segwayApp = document.getElementById("segway");

//Segway Image Div & Img Canvases
var imgDiv = document.createElement('div');
imgDiv.setAttribute("class", "segboi_img");
var tireImg = document.createElement('canvas');
tireImg.style.zIndex = "1";
var tireStr = "";
var bodyImg = document.createElement('canvas');
bodyImg.style.zIndex = "2";
var bodyStr = "";
var modsImg = document.createElement('canvas');
modsImg.style.zIndex = "3";
var modsStr = "";
imgDiv.appendChild(tireImg);
imgDiv.appendChild(bodyImg);
imgDiv.appendChild(modsImg);

//Segway Image []
var modsArr = [];
var removeMod = "";
//var finalBoi = {};

//json
var json;

//segway options list
var segway_options = ["Colour", "Tires", "Engine", "Customs", "Total"];

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

//Segway CustomizePage Object for checking if pre-built is created
var pre_built_CheckObj = {
  Body: "",
  Tires: "",
  Engine: "",
  Mods: []
};

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
var colourBtns = [];
var tireBtns = [];
var engineBtns = [];
var customBtns = [];

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

//test custom list

function loadComplete(evt) {
  json = JSON.parse(request.responseText);
  buildHomePage();
  //buildThanksPage();
  //buildConfirmPage();
  //buildCheckoutPage();
  //buildCustomPage();
}

//Tab Container
var tabContainer = document.createElement('div');
var btnContainer = document.createElement('div');
btnContainer.setAttribute('class', 'btnContainer')
//tabContainer.appendChild(btnContainer);

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
    buttons[index].setAttribute('class', 'btn');
    buttons[index].setAttribute('id', 'colour');
    buttons[index].style.display = "block";
    btnContainer.appendChild(buttons[index]);
    colourBtns.push(buttons[index]);
  }
  if (arr.name === "Tires") {
    buttons[index].setAttribute('class', 'btn');
    buttons[index].setAttribute('id', 'tire');
    btnContainer.appendChild(buttons[index]);
    tireBtns.push(buttons[index]);
  }
  if (arr.name === "Engines") {
    buttons[index].setAttribute('class', 'btn');
    buttons[index].setAttribute('id', 'engine');
    btnContainer.appendChild(buttons[index]);
    engineBtns.push(buttons[index])
  } 
  if (arr.name === "Customs") {
    buttons[index].setAttribute('class', 'btn');
    buttons[index].setAttribute('id', 'custom');
    btnContainer.appendChild(buttons[index]);
    customBtns.push(buttons[index]);
  }
  buttons[index].addEventListener('click', optionClicked);
}

//Build Order Button Function
function buildOrderButton(isCustom, segwayType) {
  var buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "bottom-btn");
  buttonDiv.textContent = 'Add To Order';
  if (isCustom) {
    buttonDiv.setAttribute("onclick", `buildCustomPage('${segwayType}')`);
  } else {
    buttonDiv.setAttribute("onclick", `buildConfirmPage('${segwayType}')`);
  }

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
    btn.setAttribute("onclick", `buildCustomPage('${segName}')`);
  }
  else if (button == "Add To Order") {
    btn.setAttribute("class", "top-btn");
    btn.setAttribute("onclick", `buildCheckoutPage()`);
  }
  btnRow.appendChild(btn);

  return btnRow;
}

function checkoutCreateButton(button, segName) {
  var btn = document.createElement("div");
  btn.setAttribute("class", "bottom-btn");
  btn.textContent = button;

  if (button == "Modify") {
    btn.classList.add("right-mar");
    btn.setAttribute("onclick", `buildCustomPage('${segName}')`);
  }
  else if (button == "Add To Order") {
    btn.setAttribute("onclick", `buildThanksPage()`);
  }
  return btn;
}

//Option Clicked Evt
function optionClicked(evt) {
  var segboi_img_check = 1;
  // console.log(evt.target.innerText + " clicked");
  // evt.target.style.backgroundColor = "#21f";
  var btnNameID = evt.target.attributes[1].value;
  // console.log("Pre Split: " + preSplitName);
  // var splitName = preSplitName.split(" ");
  // console.log("Split Name: " + splitName);
  // var name = splitName[1];
  var name = btnNameID;
  console.log(name);
  // console.log("Name: " + name
  //If Statement for active or not
  if (!isActive(evt)) {
    if (name === "colour") {
      console.log("Colour btn was clicked");
      if (bodyStr.length > 0) {
        bodyStr = "";
      }
      pre_built_CheckObj.Body = evt.target.textContent;
      //crustBtnNames.forEach(checkActive, evt);
      //evt.target.classList.add("active");
      colourBtns.forEach(multipleSingleOptions);
      evt.target.classList.add("active");
      if (document.getElementById("custom").classList.contains("active")) {
        console.log("THIS IS DEEP FRIED!");
        document.getElementById("custom").classList.remove("active");
      }
      //'colour_base.png'
      bodyStr = "url(images/" + evt.target.textContent.toLowerCase() + "_Base.png)";
    } 
    if (name === "tire") {
      console.log("Tire");
      if (tireStr.length > 0) {
        tireStr = "";
      }
      pre_built_CheckObj.Tires = evt.target.textContent;
      if (document.getElementById("custom").classList.contains("active")) {
        console.log("THIS IS DEEP FRIED!");
        document.getElementById("custom").classList.remove("active");
        bodyStr = "";
      }
      //cheeseBtnNames.forEach(checkActive, evt);
      //evt.target.classList.add("active");
      console.log(evt.target.textContent);
      tireBtns.forEach(multipleSingleOptions);
      evt.target.classList.add("active");
      //'tireType_Tires.png'
      tireStr = "url(images/" + evt.target.textContent.toLowerCase() + "_Tires.png)";
    }
    if (name === "engine") {
      console.log("Engine")
      //sauceBtnNames.forEach(checkActive, evt);
      console.log(evt.target.textContent);
      engineBtns.forEach(multipleSingleOptions);
      pre_built_CheckObj.Engine = evt.target.textContent;
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
          if (bodyStr.length > 0) {
            bodyStr = "";
            tireStr = "";
          } if (tireStr.length > 0) {
            tireStr = "";
          }
          pre_built_CheckObj.Body = evt.target.textContent;
          pre_built_CheckObj.Tires = "Normal";
          colourBtns.forEach(multipleSingleOptions);
          evt.target.classList.add("active");
          bodyStr = "url(images/deepfried.png)";
          console.log(document.getElementById("custom"));
          break;
        case "Cup Holder":
          evt.target.classList.add("active");
          modsArr.push("url(images/cupHolder.png)");
          pre_built_CheckObj.Mods.push(evt.target.textContent);
          break;
        case "Tassels":
          evt.target.classList.add("active");
          modsArr.push("url(images/tassels.png)");
          pre_built_CheckObj.Mods.push(evt.target.textContent);
          break;
        case "Extra Batteries":
          evt.target.classList.add("active");
          //Don't need to change picture
          modsArr.push("Extra Batteries");
          pre_built_CheckObj.Mods.push(evt.target.textContent);
          break;
        case "Horn":
          evt.target.classList.add("active");
          modsArr.push("url(images/horn.png)");
          pre_built_CheckObj.Mods.push(evt.target.textContent);
          break;
        case "Basket":
          evt.target.classList.add("active");
          modsArr.push("url(images/basket.png)");
          pre_built_CheckObj.Mods.push(evt.target.textContent);
          break;
        case "Bluetooth Speakers":
          evt.target.classList.add("active");
          modsArr.push("url(images/bluetoothlight.png)");
          pre_built_CheckObj.Mods.push(evt.target.textContent);
          break;
        case "Glitter":
          evt.target.classList.add("active");
          modsArr.push("url(images/glitter.png)");
          pre_built_CheckObj.Mods.push(evt.target.textContent);
          break;
        default:
          break;
      }
    } 
    //Have to focus on text content of the button to see what pic is needed
  } else {
    // evt.target.classList.add("notActive");
    evt.target.classList.remove("active");
    //console.log(evt);
    console.log(evt.target.id);
    switch(evt.target.id) {
      case "colour":
        console.log("colour");
        bodyStr = "";
        pre_built_CheckObj.Body = "";
        break;
      case "tire":
        console.log("tire");
        tireStr = "";
        pre_built_CheckObj.Tires = "";
        break;
      default:
        break;
    }
    if (evt.target.id === "custom" && evt.target.innerHTML === "Deep Fried") {
      bodyStr = "";
      pre_built_CheckObj.Body = "";
    }
    if (evt.target.id === "custom" && evt.target.innerHTML != "Deef Fried") {
      console.log("THIS IS WHAT NEEDS TO BE REMOVED: " + evt.target.innerHTML);
      if (evt.target.innerHTML === "Bluetooth Speakers") {
        removeMod = "bluetoothlight";
      } else if (evt.target.innerHTML === "Cup Holder") {
        removeMod = "cupHolder";
      } else if (evt.target.innerHTML === "Extra Batteries") {
        removeMod = "Extra Batteries";
      } else {
        removeMod = evt.target.innerHTML.toLowerCase();
      }
      console.log("Remove MOD: " + removeMod);
      for (var i = 0; i < modsArr.length; i++) {
        if (modsArr[i] === "url(images/" + removeMod + ".png)" || removeMod === "Extra Batteries") {
          console.log("THIS IS THE BOI");
          console.log(modsArr[i]);
          modsArr.splice(i, 1);
          console.log(pre_built_CheckObj.Mods);
          pre_built_CheckObj.Mods.splice(i, 1);
          console.log(pre_built_CheckObj.Mods);
        } else {
          console.log("WE NEED A DIFFERENT BOI");
        }
      }
    }
  }
  console.log(modsArr);
  console.log(pre_built_CheckObj);
  buildSegway(segboi_img_check);
  checkIfPre_built();
}

//Getting Segway from Json
function getJsonSegway(type) {
  var finalBoi = {
    Colour: "",
    Tires: "",
    Engine: "",
    Customs: [
    ]
  }
  finalBoi.Colour = json.preBuilt[type].Colour;
  finalBoi.Tires = json.preBuilt[type].Tires;
  finalBoi.Engine = json.preBuilt[type].Engine;
  for (var item in json.preBuilt[type].Customs)
    finalBoi.Customs.push(json.preBuilt[type].Customs[item]);
    
  console.log(finalBoi);
  return finalBoi;
}

//Making Segway Picture
function buildSegway(x) {
  if (x === 0) {
    console.log("We are going to build the base segway");
    console.log(x);
    bodyImg.style.background = "url(images/default_segboi.png)";
  } else {
    console.log("Building custom segboi");
    //Logic for building image(s)
    // imgDiv.style.background = "none";
    tireImg.style.background = "none";
    bodyImg.style.background = "none";
    modsImg.style.background = "none";
    console.log("Tire Str Length: " + tireStr.length);
    if (tireStr.length > 0) {
      tireImg.style.background = tireStr;
      // bodyImg.style.display = "none";
      // modsImg.style.display = "none";
      console.log("Tire String: "  + tireStr);
    }
    if (bodyStr.length > 0) {
      bodyImg.style.background = bodyStr;
      console.log(bodyStr); 
    }
    console.log("ModsArr Length: " + modsArr.length);
    for (var i = 0; i < modsArr.length; i++) {
      console.log("Mods arr: " + modsArr[i]);
      if (i === 0) {
        modsStr = modsArr[i];
      } else if (modsArr[i] === "Extra Batteries") {
        console.log("BATTERIES");
      } else {
        modsStr += ", " + modsArr[i];
      }
      console.log("Mods Str: " + modsStr);
    }
    modsImg.style.background = modsStr;
    if (modsArr.length === 0) {
      modsImg.style.background = "none";
    }
    // console.log("Segboi length: " + segboi.length);
    // for (var i = 0; i < segboi.length; i++) {
    //   console.log("I: " + i);
    //   console.log("Segboi arr: " + segboi[i]);
    //   if (i === 0) {
    //     console.log("In first url part");
    //     segboiStr = segboi[i];
    //     console.log("First url: " + segboi[i]);
    //   } else {
    //     console.log("Inside else");
    //     segboiStr += ", " + segboi[i];
    //     console.log(segboi[i]);
    //   }
    // }
    // console.log("Segboi String: " + segboiStr);
    // imgDiv.style.background = segboiStr;
  }
}

//Check to see if user chose a pre-built segway
function checkIfPre_built() {
  console.log("Checking if segboi is pre-built");
  console.log("Checking Mods Length: " + pre_built_CheckObj.Mods.length);
  //Check if Default
  if (pre_built_CheckObj.Body === "Black" && pre_built_CheckObj.Tires === "Normal" && pre_built_CheckObj.Engine === "Electric" && pre_built_CheckObj.Mods.includes("Bluetooth Speakers") && pre_built_CheckObj.Mods.length === 1) {
    console.log("A PRE-BUILT: DEFAULT HAS BEEN BUILT");
    //Check if Memester
  } else if (pre_built_CheckObj.Body === "Deep Fried" && pre_built_CheckObj.Tires === "Normal" && pre_built_CheckObj.Engine === "Petrol" && pre_built_CheckObj.Mods.includes("Bluetooth Speakers") && pre_built_CheckObj.Mods.length === 1) {
    console.log("A PRE-BUILT: MEMESTER HAS BEEN BUILT");
    //Check if Little Kid
  } else if (pre_built_CheckObj.Body === "Blue" && pre_built_CheckObj.Tires === "Bike" && pre_built_CheckObj.Engine === "Electric" && pre_built_CheckObj.Mods.includes("Tassels") && pre_built_CheckObj.Mods.includes("Horn") && pre_built_CheckObj.Mods.includes("Basket") && pre_built_CheckObj.Mods.length === 3) {
    console.log("A PRE-BUILT: LITTLE KID HAS BEEN BUILT");
    //Check if Rich Kid
  } else if (pre_built_CheckObj.Body === "Gold" && pre_built_CheckObj.Tires === "Normal" && pre_built_CheckObj.Engine === "Dual" && pre_built_CheckObj.Mods.includes("Glitter") && pre_built_CheckObj.Mods.includes("Extra Batteries") && pre_built_CheckObj.Mods.includes("Cup Holder") && pre_built_CheckObj.Mods.length === 3) {
    console.log("A PRE-BUILT: RICH KID HAS BEEN BUILT");
    //Check if Deep South
  } else if (pre_built_CheckObj.Body === "Green" && pre_built_CheckObj.Tires === "Tractor" && pre_built_CheckObj.Engine === "Petrol" && pre_built_CheckObj.Mods.includes("Cup Holder") && pre_built_CheckObj.Mods.includes("Horn") && pre_built_CheckObj.Mods.length === 2) {
    console.log("A PRE-BUILT: DEEP SOUTH HAS BEEN BUILT");
    //Otherwise it's a custom build
  } else {
    console.log("THIS IS A CUSTOM BUILD");
  }
}

//Tab Clicked Evt
function tabClicked(evt) {
  console.log("Text Content of Div: " + evt.target.textContent);
  var idName = evt.target.textContent;
  switch (idName) {
    case "Colours": 
      console.log("This is the colour Tab");
      colourBtns.forEach(displayBtns);
      tireBtns.forEach(hideBtns);
      engineBtns.forEach(hideBtns);
      customBtns.forEach(hideBtns);
      break;
    case "Tires":
      console.log("This is the tires Tab");
      colourBtns.forEach(hideBtns);
      tireBtns.forEach(displayBtns);
      engineBtns.forEach(hideBtns);
      customBtns.forEach(hideBtns);
      break;
    case "Engines":
      console.log("This is the engines Tab");
      colourBtns.forEach(hideBtns);
      tireBtns.forEach(hideBtns);
      engineBtns.forEach(displayBtns);
      customBtns.forEach(hideBtns);
      break;
    case "Mods":
      console.log("This is the mods/custom Tab");
      colourBtns.forEach(hideBtns);
      tireBtns.forEach(hideBtns);
      engineBtns.forEach(hideBtns);
      customBtns.forEach(displayBtns);
      break;
    default:
      break;  
  }
}

//Set Display of Buttons
function displayBtns(item, index, arr) {
  console.log("In display btns function");
  arr[index].style.display = "block";
}

function hideBtns(item, index, arr) {
  console.log("In hide btns function");
  arr[index].style.display = "none";
}

//Check Btn for Active class
function isActive(evt) {
  console.log("This is inside the isActive()!");
  console.log("This is the btn that was clicked! " + evt.target.textContent);
  if (evt.target.attributes[0].value.includes("active")) {
    console.log("There is active");
    return true;
  } else if (evt.target.attributes[0].value.includes("notActive")) {
    console.log("Not active");
    return false;
  } 
}

//Check for single options
function multipleSingleOptions(item, index, arr) {
  if (arr[index].attributes[0].value.includes("active")) {
    arr[index].classList.remove("active");
  } 
}

//Button Clicked Evt
function buttonClicked(evt) {

}

//Building Segway Specials
function createSegwaySpecial(imgSource, name, description, segId, isCustom, segwayType) {
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

  var orderButton = buildOrderButton(isCustom, segwayType);
  
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
    var div = createSegwaySpecial(json.specials[index].ImageSource, json.specials[index].Name, json.specials[index].Description, json.specials[index].Id, isCustom, index);
    // segwayApp.appendChild(div);
    html += div.outerHTML;
  }
  segwayApp.innerHTML = html;
}

function buildCustomPage(segwayType) {
  var finalSegway = getJsonSegway(segwayType);
  console.log("We are building a custom page.");
  segwayApp.innerHTML = '';
  buildSegway(0);
  var custom_pageContainer = document.createElement('div');
  custom_pageContainer.setAttribute('class', 'custom_pageContainer');
  // console.log(name);
  tabContainer.setAttribute('class', 'tabContainer');
  for (var i = 0; i < tabs.length; i++) {
    var preSplitName = tabs[i].attributes[0].value;
    var splitName = preSplitName.split(" ");
    var name = splitName[0];
    tabs[i].addEventListener('click', tabClicked);
    //var tabTitle = document.createElement('div');
    console.log(name);
    switch(name) {
      case "colourTab":
        console.log("In switch");
        tabs[i].textContent = "Colours";
        break;
      case "tireTab":
        tabs[i].textContent = "Tires";
        break;
      case "engineTab":
        tabs[i].textContent = "Engines";
        break;  
      case "customTab":
        //tabTitle.textContent = "Custom Mods";
        tabs[i].textContent = "Mods";
        break;
      default:
        break;
    }
    //console.log(tab[i]);
    tabContainer.appendChild(tabs[i]);
  }
  custom_pageContainer.appendChild(tabContainer);
  custom_pageContainer.appendChild(btnContainer);
  customPage.appendChild(imgDiv);
  customPage.appendChild(custom_pageContainer);
  segwayApp.appendChild(customPage);
}

function buildConfirmPage(segwayType) {
  var finalSegway = getJsonSegway(segwayType);
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

function buildCheckoutPage(segwayObject) {
  segwayApp.innerHTML = '';

  var containerOutline = document.createElement("div");
  containerOutline.setAttribute("class", "flex-row container outline");

  var innerContainer = document.createElement("div");
  innerContainer.setAttribute("class", "flex-col");

  for (var index in segway_options) {
    console.log(json.finalBoi[segway_options[index]]);
  }

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

  // for (var index in customs_list) {
  //   var tempItem = document.createElement("div");
  //   tempItem.setAttribute("class", "list-item");
  //   tempItem.textContent = customs_list[index];
  //   customValue.appendChild(tempItem);
  // }

  customContainer.appendChild(customLabel);
  customContainer.appendChild(customValue);


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
  btnContainer.setAttribute("class", "flex-row box-area more-space");
  
  for (var index in checkOutBtnList) {
    //btnContainer.appendChild(checkoutCreateButton(checkOutBtnList[index], segName));
  }

  innerContainer.appendChild(colourContainer);
  innerContainer.appendChild(tiresContainer);
  innerContainer.appendChild(engineContainer);
  innerContainer.appendChild(customContainer);
  innerContainer.appendChild(totalContainer);
  innerContainer.appendChild(btnContainer);

  containerOutline.appendChild(innerContainer);

  segwayApp.appendChild(containerOutline);
}

function buildThanksPage() {
  segwayApp.innerHTML = '';
  var container = document.createElement("div");
  container.setAttribute("class", "flex-col thanks");

  var msg = document.createElement("div");
  msg.setAttribute("id", "thanks-msg");
  msg.textContent = "Thank you for your order!";

  var btnDiv = document.createElement("div");
  btnDiv.setAttribute("class", "flex-row");

  for (var index in thankYouBtnList) {
    var tempBtn = thankYouCreateButtons(thankYouBtnList[index]);
    btnDiv.appendChild(tempBtn);
  }
  container.appendChild(msg);
  container.appendChild(btnDiv);
  segwayApp.appendChild(container);
}


loadData();