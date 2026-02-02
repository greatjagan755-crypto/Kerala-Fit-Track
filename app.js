
// ==========================================
// SHARED DATA & LOGIC
// ==========================================

const ACTIVITY_LEVELS = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
};

const GOAL_SPEED = {
    slow: 250,
    moderate: 500,
    fast: 750
};

const KERALA_FOODS = {
    breakfast: [
        { name: "Puttu & Kadala Curry", calories: 350, desc: "1 cup Puttu + 1/2 cup Curry", ingredients: ["Rice Flour", "Coconut", "Chickpeas (Kadala)", "Spices"] },
        { name: "Idli & Sambar", calories: 300, desc: "4 Idlis + 1/2 cup Sambar", ingredients: ["Idli Batter", "Lentils", "Mixed Vegetables", "Sambar Powder"] },
        { name: "Appam & Veg Stew", calories: 320, desc: "3 Appams + 1/2 cup Stew", ingredients: ["Appam Batter", "Coconut Milk", "Potato", "Carrot", "Green Peas"] },
        { name: "Dosa & Coconut Chutney", calories: 350, desc: "3 Dosas + 2 tbsp Chutney", ingredients: ["Dosa Batter", "Coconut", "Green Chillies", "Ginger"] },
        { name: "Upma (Rava) with Banana", calories: 300, desc: "1 bowl Upma + 1 small Banana", ingredients: ["Roasted Rava", "Onion", "Green Chillies", "Banana", "Mustard Seeds"] },
        { name: "Oats Kanjis (Kerala Style)", calories: 280, desc: "Savory oats with veggies", ingredients: ["Oats", "Carrot", "Beans", "Coconut Milk", "Pepper"] },
        { name: "Idiyappam & Egg Roast", calories: 350, desc: "3 Idiyappams + 1 Egg Roast", ingredients: ["Rice Flour", "Eggs", "Onion", "Tomato", "Spices"] },
        { name: "Pathiri & Chicken Curry", calories: 400, desc: "3 Pathiris + 1/2 cup Curry", ingredients: ["Rice Flour", "Chicken", "Coconut Milk", "Spices"] },
        { name: "Ragi Puttu", calories: 300, desc: "1 cup Ragi Puttu + Banana", ingredients: ["Ragi Flour", "Coconut", "Banana"] },
        { name: "Wheat Dosa", calories: 320, desc: "3 Wheat Dosas + Chutney", ingredients: ["Wheat Flour", "Coconut", "Green Chilli"] }
    ],
    lunch: [
        { name: "Kerala Rice Meal (Fish)", calories: 450, desc: "1 cup Matta rice, Mathi curry/fry, Thoran", ingredients: ["Matta Rice", "Sardines (Mathi)", "Coconut", "Vegetables", "Chilli Powder"] },
        { name: "Kerala Rice Meal (Veg)", calories: 400, desc: "1 cup Matta rice, Sambar, Aviyal, Thoran", ingredients: ["Matta Rice", "Mixed Vegetables", "Coconut", "Yogurt", "Lentils"] },
        { name: "Rice & Moru Curry", calories: 380, desc: "1 cup Rice, Moru curry, Pickle, Thoran", ingredients: ["Rice", "Yogurt", "Coconut", "Green Chillies", "Vegetables"] },
        { name: "Biryani (Small Portion)", calories: 500, desc: "3/4 cup Chicken/Veg Biryani (Occasional)", ingredients: ["Basmati Rice", "Chicken/Vegetables", "Biryani Masala", "Ghee", "Onions"] },
        { name: "Kappa & Fish Curry", calories: 450, desc: "1 cup Boiled Tapioca + Fish Curry (Spicy)", ingredients: ["Tapioca (Kappa)", "Fish", "Chilli Powder", "Tamarind"] },
        { name: "Lemon Rice & Salad", calories: 400, desc: "Tangy Lemon Rice + Cucumber Salad", ingredients: ["Rice", "Lemon", "Peanuts", "Cucumber", "Carrot"] },
        { name: "Curd Rice & Pickle", calories: 350, desc: "Comforting Curd Rice + Mango Pickle", ingredients: ["Rice", "Yogurt", "Mustard Seeds", "Pomegranate", "Pickle"] }
    ],
    dinner: [
        { name: "Chapati & Chicken Curry", calories: 350, desc: "2 Chapatis + 1/2 cup Chicken Curry (less oil)", ingredients: ["Wheat Flour", "Chicken", "Onions", "Tomatoes", "Garam Masala"] },
        { name: "Chapati & Green Gram", calories: 300, desc: "2 Chapatis + 1/2 cup Green Gram", ingredients: ["Wheat Flour", "Green Gram", "Coconut", "Garlic", "Cumin"] },
        { name: "Wheat Puttu & Steamed Banana", calories: 280, desc: "1 piece Wheat Puttu", ingredients: ["Wheat Flour", "Coconut", "Banana"] },
        { name: "Kanji & Payar", calories: 300, desc: "1 bowl Rice Porridge + Green Gram", ingredients: ["Rice", "Green Gram", "Coconut", "Pickle"] },
        { name: "Grilled Fish & Salad", calories: 250, desc: "For fast fat loss", ingredients: ["Fish Fillet", "Pepper", "Lemon", "Cucumber", "Tomato"] },
        { name: "Oats Upma", calories: 280, desc: "Fiber-rich Oats Upma with Veggies", ingredients: ["Oats", "Carrot", "Beans", "Onion"] },
        { name: "Broken Wheat Kanji", calories: 250, desc: "Light Wheat Porridge", ingredients: ["Broken Wheat", "Salt", "Light Coconut Milk"] },
        { name: "Multigrain Roti & Dal", calories: 320, desc: "2 Rotis + Yellow Dal", ingredients: ["Multigrain Flour", "Toor Dal", "Turmeric", "Cumin"] },
        { name: "Clear Soup & Salad", calories: 200, desc: "Chicken/Veg Soup + Fresh Salad", ingredients: ["Chicken/Veg Stock", "Pepper", "Lettuce", "Tomato"] }
    ],
    snacks: [
        { name: "Black Tea & Nuts", calories: 150, desc: "No sugar tea + 5-6 Almonds", ingredients: ["Tea Powder", "Almonds/Walnuts"] },
        { name: "Fruit Salad", calories: 120, desc: "Seasonal Kerala fruits", ingredients: ["Papaya", "Banana", "Watermelon"] },
        { name: "Buttermilk (Sambharam)", calories: 50, desc: "Spiced buttermilk", ingredients: ["Yogurt", "Green Chilli", "Ginger", "Curry Leaves"] },
        { name: "Boiled Egg White", calories: 50, desc: "2 Egg whites", ingredients: ["Eggs"] },
        { name: "Steamed Nendran Banana", calories: 150, desc: "1/2 Steamed Banana (Ethapazham)", ingredients: ["Nendran Banana"] },
        { name: "Roasted Gram (Pottukadalai)", calories: 100, desc: "Handful of roasted gram", ingredients: ["Roasted Gram"] },
        { name: "Green Tea & Biscuit", calories: 80, desc: "1 cup Green Tea + 1 Digestive Biscuit", ingredients: ["Green Tea Bag", "Digestive Biscuit"] }
    ]
};

function calculateCalories(userData) {
    let bmr;
    if (userData.gender === 'male') {
        bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5;
    } else {
        bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
    }
    const tdee = bmr * ACTIVITY_LEVELS[userData.activity];
    const targetCalories = Math.round(tdee - GOAL_SPEED[userData.speed]);
    const minCalories = userData.gender === 'male' ? 1500 : 1200;
    return Math.max(targetCalories, minCalories);
}

function generatePlan(calories, preference) {
    const isVeg = preference === 'veg';
    const filterFood = (list) => {
        if (!isVeg) return list;
        return list.filter(item => {
            const n = item.name.toLowerCase();
            return !n.includes('fish') && !n.includes('chicken') && !n.includes('mathi') && !n.includes('egg') && !n.includes('biryani');
        });
    };
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan = [];
    days.forEach(day => {
        const bf = getRandom(filterFood(KERALA_FOODS.breakfast));
        const ln = getRandom(filterFood(KERALA_FOODS.lunch));
        const dn = getRandom(filterFood(KERALA_FOODS.dinner));
        const sn = getRandom(filterFood(KERALA_FOODS.snacks));
        const dayTotal = bf.calories + ln.calories + dn.calories + sn.calories;
        plan.push({ day, meals: { breakfast: bf, lunch: ln, dinner: dn, snack: sn }, approxCalories: dayTotal });
    });
    return plan;
}

function getRandom(arr) {
    if (!arr || arr.length === 0) return { name: "Safe Veg Meal", calories: 300, desc: "Standard Veg Option", ingredients: ["Vegetables"] };
    return arr[Math.floor(Math.random() * arr.length)];
}



// ==========================================
// BMI LOGIC
// ==========================================
function calculateBMIValue(heightCm, weightKg) {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return parseFloat(bmi.toFixed(1));
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: "Underweight", color: "#3B82F6", tip: "Focus on nutrient-dense foods to gain healthy weight." };
    if (bmi < 24.9) return { category: "Normal Weight", color: "#10B981", tip: "Great job! Maintain your balanced diet and activity." };
    if (bmi < 29.9) return { category: "Overweight", color: "#F59E0B", tip: "A slight caloric deficit and more activity can help." };
    return { category: "Obese", color: "#EF4444", tip: "Consult a professional. Focus on sustainable lifestyle changes." };
}

// ==========================================
// PAGE ROUTING & EVENTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- MAIN PLANNER PAGE ---
    const dietForm = document.getElementById('dietForm');
    if (dietForm) {
        initPlannerPage();
    }



    // --- BMI CALCULATOR PAGE ---
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        initBMIPage();
    }
});

function initPlannerPage() {
    const dietForm = document.getElementById('dietForm');
    const inputSection = document.getElementById('inputSection');
    const resultSection = document.getElementById('resultSection');
    const planContainer = document.getElementById('planContainer');
    const caloriesDisplay = document.getElementById('caloriesDisplay');
    const waterDisplay = document.getElementById('waterDisplay');
    const resetBtn = document.getElementById('resetBtn');

    // Check for saved state on load (Session Only)
    const savedState = sessionStorage.getItem('keralaDietState');
    if (savedState) {
        const state = JSON.parse(savedState);
        renderResult(state.calories, state.water, state.plan);
        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }

    dietForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userData = {
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            weight: parseFloat(document.getElementById('weight').value),
            height: parseFloat(document.getElementById('height').value),
            activity: document.getElementById('activity').value,
            preference: document.getElementById('preference').value,
            speed: document.getElementById('speed').value
        };

        const dailyCalories = calculateCalories(userData);
        const plan = generatePlan(dailyCalories, userData.preference);
        const waterIntake = (userData.weight * 0.035).toFixed(1);

        // SAVE STATE TO SESSION STORAGE
        const appState = {
            plan: plan,
            calories: dailyCalories,
            water: waterIntake,
            preference: userData.preference
        };
        sessionStorage.setItem('keralaDietState', JSON.stringify(appState));

        renderResult(dailyCalories, waterIntake, plan);

        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        resultSection.classList.add('fade-in');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        resultSection.classList.remove('fade-in');
        inputSection.classList.remove('hidden');
        inputSection.classList.add('fade-in');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Optional: localStorage.removeItem('keralaDietState'); if you want to clear it on reset
    });

    function renderResult(calories, water, plan) {
        caloriesDisplay.textContent = calories;
        waterDisplay.textContent = water;
        planContainer.innerHTML = '';
        plan.forEach(dayPlan => {
            const card = document.createElement('div');
            card.className = 'day-card';
            card.innerHTML = `
                <div class="day-title">${dayPlan.day}</div>
                <div class="meal-row"><span>Breakfast</span>${dayPlan.meals.breakfast.name}</div>
                <div class="meal-row"><span>Lunch</span>${dayPlan.meals.lunch.name}</div>
                <div class="meal-row"><span>Snack</span>${dayPlan.meals.snack.name}</div>
                <div class="meal-row"><span>Dinner</span>${dayPlan.meals.dinner.name}</div>
            `;
            planContainer.appendChild(card);
        });
    }
}



function initBMIPage() {
    const bmiForm = document.getElementById('bmiForm');
    const bmiResultSection = document.getElementById('bmiResultSection');
    const bmiValueDisplay = document.getElementById('bmiValue');
    const bmiCategoryDisplay = document.getElementById('bmiCategory');
    const bmiTipDisplay = document.getElementById('bmiTip');

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const height = parseFloat(document.getElementById('bmiHeight').value);
        const weight = parseFloat(document.getElementById('bmiWeight').value);

        const bmi = calculateBMIValue(height, weight);
        const result = getBMICategory(bmi);

        bmiValueDisplay.textContent = bmi;
        bmiCategoryDisplay.textContent = result.category;
        bmiCategoryDisplay.style.color = result.color;
        bmiTipDisplay.textContent = result.tip;

        bmiResultSection.classList.remove('hidden');
        bmiResultSection.classList.add('fade-in');
    });
}
