"use strict";

let categories = [
  "Adventures",
  "Arts & Crafts",
  "Museums",
  "Wine Tastings",
  "Other",
];

let activities = [
  {
    category: "Adventures",
    id: "A101",
    name: "Valley Hot Air Balloons",
    description:
      "Enjoy a lovely hot air balloon ride over the valley at sunrise.  Call 800-555-1212 to reserve a date/time after you complete your e-ticket purchase.",
    location: "121 S. Main Street",
    price: 265.0,
  },
  {
    category: "Adventures",
    id: "A102",
    name: "River Runners: Float Trip",
    description:
      "A mellow float trip with lovely scenery, great fishing, just a few riffles, and it finishes back at our base. It is a perfect trip for those wishing to take their time, or those on a limited schedule.",
    location: "145 FM 103",
    price: 65.0,
  },
  {
    category: "Adventures",
    id: "A103",
    name: "River Runners: Ride the Rapids",
    description:
      "Experience 3-4 hours of Class II and III whitewater rafting with breathtaking scenery. It is a fun, thrilling, and memorable adventure that everyone from ages 8 and up can enjoy – no experience necessary!",
    location: "145 FM 103",
    price: 145.0,
  },
  {
    category: "Arts & Crafts",
    id: "AC101",
    name: "Painting with a Twist : Oils",
    description:
      "Enjoy 2 hours of creating an oil painting by following along with an experienced artist.  Drinks and snacks are included.",
    location: "1991 Paint Drive",
    price: 40.0,
  },
  {
    category: "Arts & Crafts",
    id: "AC102",
    name: "Painting with a Twist : Watercolor",
    description:
      "Enjoy 2 hours of creating a watercolor painting by following along with an experienced artist.  Drinks and snacks are included.",
    location: "1991 Paint Drive",
    price: 40.0,
  },
  {
    category: "Museums",
    id: "M101",
    name: "Bravings Airship Museum",
    description:
      "Enjoy climbing on and in our collection of small airplanes.  You will find bi-planes, experimental planes and small jets.",
    location: "101 Airfield Drive",
    price: 10.0,
  },
  {
    category: "Museums",
    id: "M102",
    name: "Forks and Spoons Museum",
    description:
      "Enjoy touring our qwerky Forks and Spoons Museum.  It houses the worlds largest collection of, you guessed it, forks and spoons!",
    location: "1056 Lost Knives Court",
    price: 3.0,
  },
  {
    category: "Museums",
    id: "M103",
    name: "Steenges Computing Museum",
    description:
      "Enjoy our the Stengees Computing Museum that illustrates how computing has changed over the last 60 years.",
    location: "103 Technology Way",
    price: 0.0,
  },
  {
    category: "Wine Tastings",
    id: "WT-101",
    name: "Hastings Winery Tours and Tastings",
    description:
      "Hastings Winery is a small, family owned winery in the heart of San Jose, CA. We pride ourselves on producing single vineyard, small-batch, handcrafted premium wines sourced from the finest grapes in our valley.",
    location: "10987 FM 1187",
    price: 12.0,
  },
  {
    category: "Wine Tastings",
    id: "WT-102",
    name: "Lone Oak Winery",
    description:
      "We are a family and friend centered winery that thrives to make each of our guests feel right at home. With a growing wine list of the finest local wines, we offer tours and an incredible experience. We are open for to-go, curbside, and delivery.",
    location: "121 Burleson Court",
    price: 0.0,
  },
  {
    category: "Other",
    id: "OTH101",
    name: "Fire Department: Ride Along",
    description:
      "Spend the day hanging out at one of our local fire stations, visiting with the staff and learning about their jobs.  If they receive a call, you can ride along with them!",
    location: "10 Redline Drive",
    price: 25.0,
  },
  {
    category: "Other",
    id: "OTH102",
    name: "Homes For Our Neighbors",
    description:
      "Yes, you are a visitor!  But what better way to learn about a community than volunteer with the locals to build affordable housing.  Whether it be for an hour or a week, we would love to have you with us!",
    location: "Call (555) 555-5555",
    price: 0.0,
  },
];

// Inputs
const categoriesElem = document.getElementById("categoriesSelect");
const activitiesElem = document.getElementById("activitiesSelect");
const ticketInput = document.getElementById("ticketsInput");
const emailInput = document.getElementById("emailInput");
const emailInputFree = document.getElementById("emailInputFree");
const ccInput = document.getElementById("ccInput");
const cvvInput = document.getElementById("cvvInput");
const nameInput = document.getElementById("nameInput");

// Other DOM Elems
const form = document.getElementById("activityForm");
const infoSection = document.getElementById("infoSection");
const purchaseSection = document.getElementById("purchaseSection");
const reserveSection = document.getElementById("reserveSection");
const messageSection = document.getElementById("messageSection");

// Outputs
const descriptionLabel = document.getElementById("description");
const locationLabel = document.getElementById("location");
const priceLabel = document.getElementById("price");
const amountLabel = document.getElementById("msgAmountLabel");
const ticketsLabel = document.getElementById("msgTicketsLabel");
const adventureLabel = document.getElementById("msgAdventureLabel");

// Helper Functions
function removeAllOptions(parent) {
  while (parent.lastChild && parent.length > 1) {
    parent.removeChild(parent.lastChild);
  }
}
function appendFilteredOptions(options, category) {
  const filteredOptions = activities.filter(
    (activity) => activity.category == category
  );
  for (const activity of filteredOptions) {
    const newOption = new Option(activity.name, activity.id);
    options.appendChild(newOption);
  }
}
function clearLabels(...labels) {
  for (const label of labels) {
    label.innerHTML = `No ${label.id} here 😠  First select an activity...`;
  }
}
function muted(option, ...labels) {
  for (const label of labels) {
    label.classList[option]("text-muted");
  }
}

function setElementsAvailibilty(location, bool) {
  document.querySelectorAll(location).forEach((element) => {
    element.required = bool;
  });
}

function toastUser(){
  
}

// Page Logic
window.onload = () => {
  // Selected Activity Tracker
  let selectedActivity = undefined;

  // Intialize labels
  clearLabels(descriptionLabel, locationLabel, priceLabel);

  // Populate category options
  for (const category of categories) {
    const newOption = new Option(category, category);
    categoriesElem.appendChild(newOption);
  }

  // Populate activity options based on selected category
  categoriesElem.onchange = () => {
    if (categoriesElem.value != "") {
      activitiesElem.disabled = false;
      removeAllOptions(activitiesElem);
      appendFilteredOptions(activitiesElem, categoriesElem.value);
    } else {
      activitiesElem.disabled = true;
    }
    clearLabels(descriptionLabel, locationLabel, priceLabel);
    muted("add", descriptionLabel, locationLabel, priceLabel);
  };

  // Populate activity info section
  activitiesElem.onchange = () => {
    selectedActivity = activities.find(
      (activity) => activity.id == activitiesElem.value
    );
    if (selectedActivity != null) {
      descriptionLabel.innerHTML = selectedActivity.description;
      locationLabel.innerHTML = selectedActivity.location;
      priceLabel.innerHTML =
        selectedActivity.price == 0 ? "Free" : "$" + selectedActivity.price;
      muted("remove", descriptionLabel, locationLabel, priceLabel);

      if (selectedActivity.price == 0) {
        purchaseSection.classList.add("d-none");
        reserveSection.classList.remove("d-none");
        setElementsAvailibilty("#reserveSection input", true);
        setElementsAvailibilty("#purchaseSection input", false);
      } else {
        reserveSection.classList.add("d-none");
        purchaseSection.classList.remove("d-none");
        setElementsAvailibilty("#reserveSection input", false);
        setElementsAvailibilty("#purchaseSection input", true);
      }
    } else {
      clearLabels(descriptionLabel, locationLabel, priceLabel);
      muted("add", descriptionLabel, locationLabel, priceLabel);
    }
  };

  //Submit Logic
  form.onsubmit = (e) => {
    if (selectedActivity.price > 0) {
      toastUser(`Your credit card has been charged ${selectedActivity.price} for ${ticketInput.value} tickets to ${selectedActivity.name} (a confirmation email has been sent to ${emailInput.value} )`);
    }else{
      toastUser(`Thank you ${nameInput.value} for ${selectedActivity.name} (a confirmation email has been sent to ${emailInputFree.value} )`);
    }
    e.preventDefault();
  };
};
