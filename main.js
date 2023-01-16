//                  //
//  FORM VALIDATION //
// ---------------- //
const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");


const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorSpan = inputControl.querySelector("#error");

  errorSpan.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorSpan = inputControl.querySelector("#error");

  errorSpan.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (emailInput) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailInput).toLowerCase());
};

const isValidPhone = (phoneInput) => {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return re.test(String(phoneInput).toLowerCase());
};

const validateInputs = () => {
  let formIsValid = true;
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const phoneValue = phoneInput.value.trim();

  if (nameValue === "") {
    setError(nameInput, "Please enter your name");
    formIsValid = false;
  } else {
    setSuccess(nameInput);
  }

  if (emailValue === "") {
    setError(emailInput, "Please enter your email address");
    formIsValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, "Please enter a valid email address");
    formIsValid = false;
  } else {
    setSuccess(emailInput);
  }

  if (phoneValue === "") {
    setError(phoneInput, "Please enter your phone number");
    formIsValid = false;
  } else if (!isValidPhone(phoneValue)) {
    setError(phoneInput, "Please enter a valid phone number");
    formIsValid = false;
  } else {
    setSuccess(phoneInput);
  }

  return formIsValid;
};

const planError = (text) => {
  document.querySelector("#plan-error").textContent = text;
};

// _______________________________//
//                                //
//  BUTTON & STEP FUNCTIONALLITY  //
// _______________________________//

const stepOneForm = document.querySelector("#form");
const stepTwo = document.querySelector("#step_2");
const stepThree = document.querySelector("#step_3");
const stepFour = document.querySelector("#step_4");
const stepFive = document.querySelector("#thank_you");

const nextButton = document.querySelector("#next-button");
const backButton = document.querySelector("#prev-button");
const changeButton = document.querySelector("#change-plan");
const sidebarNumbers = document.querySelectorAll(".indicator_num");

const steps = [stepOneForm, stepTwo, stepThree, stepFour, stepFive];

nextButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (index === 0) {
    if (validateInputs()) {
      changeStep("next");
    }
  } else if (index === 1) {
    if (Object.keys(selectedPlan).length === 0) {
      return planError("Please select a plan");
    }
    updateTotal(selectedPlan, addOn);
    changeStep("next");
  } else if (index === 2) {
    updateTotal(selectedPlan, addOn);     
    changeStep("next");
  } else if (index === 3) {
    renderPlan(selectedPlan, addOn);          
    changeStep("next");
  } else return;
});

backButton.addEventListener("click", () => {
  changeStep("prev");
});

function updateSidebar(index) {
  sidebarNumbers.forEach((num) => num.classList.remove("active"));
  if(sidebarNumbers[index]) {
    sidebarNumbers[index].classList.add("active");
  }

  if (index === 0) {
    backButton.style.display = "none";
  } else {
    backButton.style.display = "block";
  }

  if(index === 3) {
    nextButton.textContent = "Confirm";
  } else {
    nextButton.textContent = "Next";
  }
  if(index === 4) {
    nextButton.style.display = "none";
    backButton.style.display = "none";
    document.querySelector("#thank_you").style.display = "block";
  }else{
    document.querySelector("#thank_you").style.display = "none";
  }

}

changeButton.addEventListener("click", () => {
  changeStep("change");
});

let index = 0;

function changeStep(btn) {
  const active = document.querySelector(".step.active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  if (btn === "next") {
    index++;
  } else if (btn === "prev") {
    index--;  
  } else if (btn === "change") {
    index = 0;
    steps[index].classList.add("active");
    updateSidebar(index);
  }
  steps[index].classList.add("active");
  updateSidebar(index);
  console.log(index);
}

//--------------------//
// Plan and Add-on Func//
//--------------------//

const cards = document.querySelector(".card");
const toggle = document.querySelector(".toggle");
const yearly = document.querySelectorAll(".yearly");
const addOnCards = document.querySelectorAll(".card_online");
const cardPlan = document.querySelectorAll(".card_plan");

const monthlyPrices = [9, 12, 15];
const yearlyPrices = [90, 120, 150];
const monthlyAddOn = [1, 2, 2];
const yearlyAddOn = [10, 20, 20];

const plan = (elements, prices, duration) => {
  elements.forEach((element, i) => {
    element.querySelector(".card_sub_price").textContent = `$${prices[i]}/${duration}`;
  });
};

plan(cardPlan, monthlyPrices, "mo");
plan(addOnCards, monthlyAddOn, "mo");

let selectedPlan = {};

toggle.addEventListener("click", (e) => {
  planError("");
  const toggle = e.currentTarget;

  cardPlan.forEach((card) => card.classList.remove("selected"));

  toggle.classList.toggle("active");

  if (toggle.classList.contains("active")) {
    yearly.forEach((item) => item.classList.add("show"));
    plan(cardPlan, yearlyPrices, "yr");
    plan(addOnCards, yearlyAddOn, "yr");
    yearly.forEach((item) => (item.style.display = "block"));
  } else {
    yearly.forEach((item) => item.classList.remove("show"));
    plan(cardPlan, yearlyPrices, "mo");
    plan(addOnCards, yearlyAddOn, "mo");
    yearly.forEach((item) => (item.style.display = "none"));
  }
});

cardPlan.forEach((card) => {
  card.addEventListener("click", (e) => {
    planError("");
    let target = e.currentTarget;

    cardPlan.forEach((card) => {
      card.classList.remove("selected");
    });

    target.classList.add("selected");

    let planName = target.querySelector(".card_name").textContent;
    let planPrice = target.querySelector(".card_sub_price").textContent;
    let planDur = target.querySelector(".card_dur").textContent;

    selectedPlan = { planName, planPrice, planDur };
  });
});

let addOn = [];

const updateAddOn = (target, checkbox) => {
  let name = target.querySelector(".card_name").textContent;
  let price = target.querySelector(".card_sub_price").textContent;
  let duration = target.querySelector(".card_dur").textContent;

  target.classList.toggle("selected");

  if (target.classList.contains("selected")) {
    checkbox.checked = true;
    addOn.push({ name, price, duration });
  } else {
    checkbox.checked = false;
    addOn = addOn.filter((item) => item.name !== name);
  }
  return addOn;
};

addOnCards.forEach((card) => {
  let checkbox = card.querySelector(".checkbox");
  card.addEventListener("click", (e) => {
    updateAddOn(e.currentTarget, checkbox);
  });

  checkbox.addEventListener("click", (e) => {
    updateAddOn(card, checkbox);
  });
});

//_______________//
//    TOTAL      //
//---------------//

const updateTotal = (selectedPlan, addOn) => {
  console.log(selectedPlan, addOn);
  let total = 0;

  const planDurType = selectedPlan.planDur === 'mo' ? 'Monthly' : 'Yearly';

  const selectedPlanPrice = parseFloat(selectedPlan.planPrice.slice(1));
  total += selectedPlanPrice;

  addOn.forEach((addOn) => {
    const addOnPrice = parseFloat(addOn.price.slice(1));
    total += addOnPrice;
  });

  const totalAmount = document.querySelector("#total");
  totalAmount.innerHTML = `<span>Total(per ${planDurType.substring(0,planDurType.length-2).toLocaleLowerCase()}):</span>
  <span>$${total}/${selectedPlan.planDur}</span>`; 


  renderPlan(selectedPlan, addOn);
};

const renderPlan = (selectedPlan, addOn) => {
  console.log(selectedPlan, addOn);

  const selectedPlanElement = document.querySelector("#selected_plan");
  selectedPlanElement.innerHTML = "";

  let duration = '';

  if(toggle.classList.contains('active')) {
    duration = "Yearly";
  }else{
    duration = "Monthly";
  }
  
  const selectedAddonsElement = document.querySelector("#selected-addon");
  selectedAddonsElement.innerHTML = "";

  const planName = document.createElement("p");
  planName.textContent = `${selectedPlan.planName} (${duration})`;
  selectedPlanElement.appendChild(planName);

  const planPrice = document.createElement("p");
  planPrice.textContent = `${selectedPlan.planPrice}/${selectedPlan.planDur}`;
  selectedPlanElement.appendChild(planPrice);


  addOn.forEach((add) => {
    const listItem = document.createElement("span");

    const addonItem = document.createElement('p')
    addonItem.textContent = add.name;

    const addonPrice = document.createElement("p");
    addonPrice.textContent = `+${add.price}/${add.duration}`;

    listItem.appendChild(addonItem);
    listItem.appendChild(addonPrice);

    selectedAddonsElement.appendChild(listItem);

  });
};


