
// Diet Logic Module
// Handles BMR/TDEE calculations and generates meal plans based on Kerala cuisine

export const ACTIVITY_LEVELS = {
    sedentary: 1.2,      // Little or no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Hard exercise 6-7 days/week
    very_active: 1.9     // Very hard exercise & physical job
};

export const GOAL_SPEED = {
    slow: 250,    // -250 kcal/day (0.25kg/week)
    moderate: 500,// -500 kcal/day (0.5kg/week)
    fast: 750     // -750 kcal/day (0.75kg/week) - capped to avoid unsafe drops
};

const KERALA_FOODS = {
    breakfast: [
        { name: "Puttu & Kadala Curry", calories: 350, protein: "Medium", desc: "1 cup Puttu + 1/2 cup Curry" },
        { name: "Idli & Sambar", calories: 300, protein: "Medium", desc: "4 Idlis + 1/2 cup Sambar" },
        { name: "Appam & Veg Stew", calories: 320, protein: "Low", desc: "3 Appams + 1/2 cup Stew" },
        { name: "Dosa & Coconut Chutney", calories: 350, protein: "Low", desc: "3 Dosas + 2 tbsp Chutney" },
        { name: "Upma (Rava) with Banana", calories: 300, protein: "Low", desc: "1 bowl Upma + 1 small Banana" },
        { name: "Oats Kanjis (Kerala Style)", calories: 280, protein: "Medium", desc: "Savory oats with veggies" }
    ],
    lunch: [
        { name: "Kerala Rice Meal (Fish)", calories: 450, protein: "High", desc: "1 cup Matta rice, Mathi curry/fry, Thoran" },
        { name: "Kerala Rice Meal (Veg)", calories: 400, protein: "Medium", desc: "1 cup Matta rice, Sambar, Aviyal, Thoran, Curd" },
        { name: "Rice & Moru Curry", calories: 380, protein: "Low", desc: "1 cup Rice, Moru curry, Pickle, Thoran" },
        { name: "Biryani (Small Portion)", calories: 500, protein: "Medium", desc: "3/4 cup Chicken/Veg Biryani (Occasional)" }
    ],
    dinner: [
        { name: "Chapati & Chicken Curry", calories: 350, protein: "High", desc: "2 Chapatis + 1/2 cup Chicken Curry (less oil)" },
        { name: "Chapati & Green Gram (Payar)", calories: 300, protein: "Medium", desc: "2 Chapatis + 1/2 cup Green Gram Thoran/Curry" },
        { name: "Wheat Puttu & Steamed Banana", calories: 280, protein: "Low", desc: "1 piece Wheat Puttu" },
        { name: "Kanji & Payar", calories: 300, protein: "Medium", desc: "1 bowl Rice Porridge + Green Gram" },
        { name: "Grilled Fish & Salad", calories: 250, protein: "High", desc: "For fast fat loss" }
    ],
    snacks: [
        { name: "Black Tea & Nuts", calories: 150, desc: "No sugar tea + 5-6 Almonds" },
        { name: "Fruit Salad", calories: 120, desc: "Seasonal Kerala fruits (Papaya, Jackfruit limited)" },
        { name: "Buttermilk (Sambharam)", calories: 50, desc: "Spiced buttermilk" },
        { name: "Boiled Egg White", calories: 50, desc: "2 Egg whites" }
    ]
};

export function calculateCalories(userData) {
    // Mifflin-St Jeor Equation
    let bmr;
    if (userData.gender === 'male') {
        bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5;
    } else {
        bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
    }

    const tdee = bmr * ACTIVITY_LEVELS[userData.activity];
    const targetCalories = Math.round(tdee - GOAL_SPEED[userData.speed]); // Ensuring it doesn't go below unsafe limits

    // Safety floor: Men 1500, Women 1200
    const minCalories = userData.gender === 'male' ? 1500 : 1200;

    return Math.max(targetCalories, minCalories);
}

export function generatePlan(calories, preference) {
    // Determine portion scaling based on calorie target
    // Base plan is roughly 1500-1600 kcal. 
    // We will scale text descriptions or just recommend variety. For simplicity, we randomly select suitable meals.

    // Filter logic (Basic) - If vegetarian, remove fish/chicken options
    // Note: The KERALA_FOODS options need 'tags' to filter robustly, but I'll do a simple keyword check or assume 'Veg' preference implies no meat.

    const isVeg = preference === 'veg';

    const filterFood = (list) => {
        if (!isVeg) return list;
        return list.filter(item => {
            const n = item.name.toLowerCase();
            return !n.includes('fish') && !n.includes('chicken') && !n.includes('mathi') && !n.includes('egg');
        });
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan = [];

    days.forEach(day => {
        const bf = getRandom(filterFood(KERALA_FOODS.breakfast));
        const ln = getRandom(filterFood(KERALA_FOODS.lunch));
        const dn = getRandom(filterFood(KERALA_FOODS.dinner));
        const sn = getRandom(filterFood(KERALA_FOODS.snacks));

        // Basic calorie summing for display (Approx)
        const dayTotal = bf.calories + ln.calories + dn.calories + sn.calories;

        // Dynamic water: 35ml per kg body weight is a standard rule

        plan.push({
            day,
            meals: {
                breakfast: bf,
                lunch: ln,
                dinner: dn,
                snack: sn
            },
            approxCalories: dayTotal
        });
    });

    return plan;
}

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
