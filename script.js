/* =====================================================
   EDIT YOUR RESTAURANT DETAILS HERE
   ===================================================== */
var CONFIG = {
  phone: "+977 98",
  email: "hello@view360restaurant.com",
  hours: "Open every day, 8:00 am to 10:00 pm",
  address: "View 360 Restaurant, Kirtipur, Kathmandu, Nepal"
};

/* =====================================================
   MENU DATA
   sub(title, isVeg, [names], [prices], note)  -> food block with a veg / non-veg marker
   drink(title, [[name, price, description], ...], note) -> drinks block (no marker)
   A price can be a number (shown as Rs 160) or text (shown as written).
   ===================================================== */
function sub(title, veg, names, prices, note){
  return { t: title, v: veg, note: note, items: names.map(function(n,i){ return [n, prices[i]]; }) };
}
function drink(title, items, note, cols){ return { t: title, note: note, cols: cols, items: items }; }
var PEG_BOTTLE = ["Peg", "Bottle"];

var MOMO_COLS = ["Steam", "Fried / Kothey", "C / Jhol"];

var GROUPS = [
  {
    id: "food", title: "Food",
    cats: [
      { id: "naan", chip: "Naan and Roti", title: "Naan and Roti",
        blurb: "Fresh from the tandoor.",
        subs: [
          { t: "Veg", v: true, items: [["Roti",40],["Plain Naan",70],["Butter Naan",80],["Veg. Naan",100],["Garlic Naan",140],["Cheese Naan",140],["Tandoori Paratha",75],["Tandoori Veg. Paratha",90],["Chhole Bhature",250]] },
          { t: "With Meat", v: false, items: [["Keema Naan",140]] }
        ]},
      { id: "tandoori", chip: "Chicken Tandoori", title: "Chicken Tandoori", np: "तन्दूरी",
        blurb: "Marinated overnight and cooked in the tandoor.",
        subs: [
          { t: "Non-Veg", v: false, items: [["Tandoori Chicken (Full)",750],["Tandoori Chicken (Half)",400],["Tandoori Chicken (1 pc)",230],["Chicken Tikka Kebab",390],["Chicken Tangri Kebab",400],["Chicken Seekh Kebab",400],["Fish Tandoori",650]] }
        ]},
      { id: "pizza", chip: "Pizza", title: "Pizza", np: "पिज्जा",
        blurb: "Wood-fired favourites, all made to order.",
        note: "Extra cheese Rs 60.",
        subs: [
          { t: "Veg", v: true, items: [["Veg. Pizza",395],["Cheese Pizza",395],["Capsicum & Onion Pizza",395],["Mushroom Pizza",395]] },
          { t: "Non-Veg", v: false, items: [["Sausage Pizza",430],["Chicken Pizza",430],["Mixed Pizza",450],["Hot / Spicy Pizza",450]] }
        ]},
      { id: "sandwich", chip: "Cutlet and Sandwich", title: "Cutlet and Sandwich",
        blurb: "Toasted and cut, ready to share.",
        note: "All sandwiches are served with chips and salad.",
        subs: [
          { t: "Veg", v: true, items: [["Veg. Sandwich",180],["Vegetable Cutlet",220],["Cheese Sandwich",250]] },
          { t: "Non-Veg", v: false, items: [["Egg Sandwich",200],["Chicken Sandwich",210],["Club Sandwich",300],["Chicken Cutlet",350],["Fish Cutlet",350],["Fish & Chips",400]] }
        ]},
      { id: "springroll", chip: "Spring Roll", title: "Spring Roll",
        blurb: "Crisp and golden, served with dip.",
        subs: [
          { t: "Veg", v: true, items: [["Veg. Spring Roll",320]] },
          { t: "Non-Veg", v: false, items: [["Egg Spring Roll",340],["Chicken Spring Roll",350],["Mixed Spring Roll",375]] }
        ]},
      { id: "momo", chip: "Mo:Mo", title: "Mo:Mo", np: "मोमो",
        blurb: "Hand-folded and served with tomato achar.",
        note: "C / Jhol: C-Momo is tossed with chilli, Jhol comes in a warm soup.",
        subs: [
          { t: "Veg", v: true, cols: MOMO_COLS, items: [["Veg. Mo:Mo",[190,210,225]],["Paneer Mo:Mo",[240,260,270]]] },
          { t: "Chicken", v: false, cols: MOMO_COLS, items: [["Chicken Mo:Mo",[225,245,260]]] },
          { t: "Buff", v: false, cols: MOMO_COLS, items: [["Buff Mo:Mo",[225,245,260]]] },
          { t: "Soup / Wanton (steamed)", v: false, items: [["Soup / Wanton Mo:Mo",250]] }
        ]},
      { id: "chowmein", chip: "Chowmein", title: "Chowmein", np: "चाउमिन",
        blurb: "Stir-fried noodles, wok hot.",
        subs: [
          { t: "Veg", v: true, items: [["Vegetable Chowmein",190],["Veg. Hakka Noodles",300]] },
          { t: "Non-Veg", v: false, items: [["Egg Chowmein",200],["Chicken Chowmein",240],["Buff Chowmein",240],["Mixed Chowmein",275],["Chicken Hakka Noodles",280]] }
        ]},
      { id: "friedrice", chip: "Fried Rice", title: "Fried Rice",
        blurb: "Wok-tossed rice, plain or loaded.",
        subs: [
          { t: "Veg", v: true, items: [["Plain Rice",160],["Vegetable Fried Rice",180],["Veg. Anzuo Rice",240]] },
          { t: "Non-Veg", v: false, items: [["Egg Fried Rice",220],["Chicken Fried Rice",240],["Mixed Fried Rice",275],["Fuzhing Rice",350]] }
        ]},
      { id: "soup", chip: "Soup", title: "Soup",
        blurb: "Warm bowls to start the meal.",
        subs: [
          { t: "Veg", v: true, items: [["Vegetable Soup",180],["Cream of Tomato Soup",200]] },
          { t: "Non-Veg", v: false, items: [["Chicken Mushroom Soup",200],["Cream of Chicken Soup",200],["Hot & Sour Soup",225]] }
        ]},
      { id: "thukpa", chip: "Thukpa", title: "Thukpa", np: "थुक्पा",
        blurb: "Himalayan noodle soup, served hot.",
        subs: [
          { t: "Veg", v: true, items: [["Veg. Thukpa",180]] },
          { t: "Non-Veg", v: false, items: [["Egg Thukpa",200],["Chicken Thukpa",210],["Mixed Thukpa",250],["Mutton Thukpa",280]] }
        ]},
      { id: "burger", chip: "Burger", title: "Burger", np: "बर्गर",
        blurb: "Toasted buns, served with chips and salad.",
        subs: [
          { t: "Veg", v: true, items: [["Veg. Burger",180],["Veg. Cheese Burger",200]] },
          { t: "Non-Veg", v: false, items: [["Ham Burger",220],["Ham Burger with Cheese",260],["Chicken Burger",250],["Special Jumbo Burger",300]] }
        ]}
    ]
  },
  {
    id: "drinks", title: "Drinks",
    intro: "Hot beverages and cold beverages come first. The bar follows.",
    cats: [
      { id: "hot", chip: "Hot Beverages", title: "Hot Beverages", np: "तातो पेय",
        blurb: "Coffee, tea and other hot drinks.",
        subs: [
          drink("Coffee", [["Espresso",120],["Doppio (Double Espresso)",150],["Macchiato",170],["Café Americano (Single Shot)",150],["Café Americano (Double Shot)",160],["Cappuccino",180],["Flavour Cappuccino (Vanilla, Caramel, Honey)",200],["Café Latte",180],["Honey Latte",200],["Caramel Latte",200],["Café Mocha",230],["Mocha Madness",240]]),
          drink("Tea", [["Milk Tea",80],["Black Tea",60],["Lemon Tea",70],["Hot Lemon Ginger",100],["Masala Tea",100],["Green Tea",100],["Herbs Tea",120]]),
          drink("Other Hot Drinks", [["Hot Chocolate",200],["Hot Lemon with Honey",160]])
        ]},
      { id: "cold", chip: "Cold Beverages", title: "Cold Beverages", np: "चिसो पेय",
        blurb: "Juices, shakes, iced coffee and soft drinks.",
        subs: [
          drink("Iced Coffee", [["Iced Americano",180],["Iced Americano (Vanilla / Strawberry)",200],["Iced Latte",200],["Iced Latte (Vanilla / Strawberry)",210],["Affogato",220],["Blended Mocha",270],["Oreo Frappe",280]]),
          drink("Shakes and Lassi", [["Oreo Milkshake",240],["Vanilla Milkshake",220],["Chocolate Milkshake",220],["Butterscotch Milkshake (Strawberry)",220],["Banana Lassi",200]]),
          drink("Juice and Lemonade", [["Classic Fresh Juice (Mix)",285],["Real Juice",65],["Lemonade",200],["Mint Lemonade",230],["Mint Mojito",250]]),
          drink("Iced Tea", [["Iced Peach Tea",200],["Iced Lemon Tea",200],["Iced Apple Tea",200]]),
          drink("Soft Drinks", [["Coke / Fanta / Sprite",90],["Coke / Fanta / Sprite (Jumbo)",350]])
        ]},
      { id: "bar", chip: "Bar", title: "Cold Drinks and Alcohol", np: "मदिरा",
        blurb: "Nepali and international spirits, beer and traditional drinks.",
        note: "Alcohol is served to guests 18 and over.",
        subs: [
          drink("Vodka", [["Ruslan Vodka",[250,3800]],["Ruslan Gold Reserve",[400,6200]],["8848 Vodka",[350,5200]],["8848 Rye Vodka",[450,6800]],["Seto Bagh Vodka",[400,5800]],["Smirnoff Vodka (made in Nepal)",[300,4600]]], "A peg is 30 ml. A bottle is 750 ml.", PEG_BOTTLE),
          drink("Beer", [["Gorkha Beer",500],["Everest Beer",500],["Nepal Ice",550],["Arna Beer",550],["Tuborg",550],["Carlsberg",600],["San Miguel",600],["Kingfisher",550],["Barahsinghe",650]], "Price per bottle. Ask which are chilled today."),
          drink("Whiskey and Rum", [["Old Durbar Black Chimney",[320,5800]],["Old Durbar Two Continents",[280,5000]],["Old Durbar Classic",[240,4000]],["Signature Whiskey",[200,3200]],["Antiquity Blue Whiskey",[230,3600]],["Golden Oak",[160,2400]],["Kala Patthar",[220,3400]],["Khukri Rum",[180,2800]]], "A peg is 30 ml. A bottle is 750 ml.", PEG_BOTTLE),
          drink("Traditional", [["Tongba",350,"Fermented millet in a wooden mug, topped up with hot water and sipped through a bamboo straw."],["Raksi",150,"Traditional Nepali spirit, per glass."],["Aila",200,"Traditional Newar spirit, per glass."]])
        ]}
    ]
  }
];

/* =====================================================
   RENDER THE MENU
   ===================================================== */
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function price(p){ return typeof p === "number" ? "Rs " + p.toLocaleString("en-US") : String(p); }

function subHTML(s){
  var mark = (s.v === true || s.v === false) ? '<i class="mk ' + (s.v ? "v" : "n") + '" title="' + (s.v ? "Vegetarian" : "Non-vegetarian") + '"></i>' : "";
  var lis = s.items.map(function(it){
    var prices = Array.isArray(it[1])
      ? it[1].map(function(x){ return '<span class="p p2">' + esc(price(x)) + '</span>'; }).join("")
      : '<span class="p">' + esc(price(it[1])) + '</span>';
    return '<li><div class="row"><span class="n">' + esc(it[0]) + '</span><span class="fill" aria-hidden="true"></span>' + prices + '</div>' +
           (it[2] ? '<p>' + esc(it[2]) + '</p>' : '') + '</li>';
  }).join("");
  var cols = s.cols ? '<div class="cols" aria-hidden="true">' + s.cols.map(function(c){ return '<span>' + esc(c) + '</span>'; }).join("") + '</div>' : "";
  return '<div class="sub' + (s.cols ? ' wide' : '') + '"><h4>' + mark + esc(s.t) + '</h4>' +
         (s.note ? '<p class="sub-note">' + esc(s.note) + '</p>' : '') + cols +
         '<ul>' + lis + '</ul></div>';
}

function catHTML(c){
  return '<section class="cat" id="cat-' + c.id + '">' +
    '<h3>' + esc(c.title) + (c.np ? '<span class="np" lang="ne">' + esc(c.np) + '</span>' : '') + '</h3>' +
    (c.blurb ? '<p class="blurb">' + esc(c.blurb) + '</p>' : '') +
    (c.note ? '<p class="cat-note">' + esc(c.note) + '</p>' : '') +
    '<div class="subs">' + c.subs.map(subHTML).join("") + '</div></section>';
}

var menuBody = document.getElementById("menuBody");
menuBody.innerHTML = GROUPS.map(function(g){
  return '<h2 class="group-title">' + esc(g.title) + '</h2>' +
         (g.intro ? '<p class="group-intro">' + esc(g.intro) + '</p>' : '') +
         g.cats.map(catHTML).join("");
}).join("") + '<p class="menu-end">Prices are in Nepali rupees. Please tell your server about any allergies.</p>';

var chipsEl = document.getElementById("chips");
var allCats = [];
GROUPS.forEach(function(g){ g.cats.forEach(function(c){ allCats.push(c); }); });
chipsEl.innerHTML = allCats.map(function(c){
  return '<button type="button" data-cat="' + c.id + '">' + esc(c.chip) + '</button>';
}).join("");

chipsEl.addEventListener("click", function(e){
  var b = e.target.closest("button[data-cat]");
  if(!b) return;
  var target = document.getElementById("cat-" + b.dataset.cat);
  if(target) target.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* Highlight the chip of the category currently on screen */
var spy = null;
function setChip(id){
  var btns = chipsEl.querySelectorAll("button");
  btns.forEach(function(b){
    var on = b.dataset.cat === id;
    if(on){ b.setAttribute("aria-current","true"); } else { b.removeAttribute("aria-current"); }
    if(on){
      var left = b.offsetLeft - (chipsEl.clientWidth - b.clientWidth) / 2;
      chipsEl.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  });
}
function startSpy(){
  if(spy || !("IntersectionObserver" in window)) return;
  spy = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting) setChip(en.target.id.replace("cat-",""));
    });
  }, { rootMargin: "-150px 0px -65% 0px" });
  document.querySelectorAll(".cat").forEach(function(el){ spy.observe(el); });
}

/* =====================================================
   VIEWS: the menu is hidden until someone clicks Menu
   ===================================================== */
var views = { home: document.getElementById("view-home"), menu: document.getElementById("view-menu") };
var TITLES = {
  home: "View 360 Restaurant | Rooftop Nepali Food and Drinks in Kirtipur",
  menu: "Menu | View 360 Restaurant"
};

function show(name, push){
  if(!views[name]) name = "home";
  Object.keys(views).forEach(function(k){ views[k].hidden = (k !== name); });
  document.querySelectorAll(".nav .link[data-view]").forEach(function(a){
    if(a.dataset.view === name){ a.setAttribute("aria-current","page"); } else { a.removeAttribute("aria-current"); }
  });
  document.title = TITLES[name];
  if(name === "menu"){ startSpy(); setChip(allCats[0].id); }
  window.scrollTo(0, 0);
  if(push){ try{ history.pushState({ view: name }, "", "#" + name); }catch(e){} }
}
function viewFromHash(){ return location.hash.indexOf("#menu") === 0 ? "menu" : "home"; }

document.addEventListener("click", function(e){
  var v = e.target.closest("[data-view]");
  if(v){ e.preventDefault(); show(v.dataset.view, true); return; }
  var s = e.target.closest("[data-scroll]");
  if(s){
    e.preventDefault();
    var el = document.getElementById(s.dataset.scroll);
    if(el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
window.addEventListener("popstate", function(){ show(viewFromHash(), false); });
show(viewFromHash(), false);

/* =====================================================
   CONTACT DETAILS
   ===================================================== */
var telHref = "tel:" + CONFIG.phone.replace(/[^\d+]/g, "");
document.getElementById("c-address").textContent = CONFIG.address;
document.getElementById("c-hours").textContent = CONFIG.hours;
var ph = document.getElementById("c-phone"); ph.textContent = CONFIG.phone; ph.href = telHref;
var em = document.getElementById("c-email"); em.textContent = CONFIG.email; em.href = "mailto:" + CONFIG.email;
document.getElementById("c-map").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Kirtipur, Kathmandu, Nepal");
