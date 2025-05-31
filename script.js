/**
 * Material Conversion Constants
 * These values are used to convert between different units of measurement
 */
const CONVERSIONS = {
    // Weight conversions
    cement_bag_to_ton: 20,      // 20 bags (50kg each) = 1 ton
    white_cement_weight: 40,    // kg per bag
    adhesive_weight: 50,        // kg per bag
    
    // Volume conversions
    sand_bags_per_meter: 24,    // 24 bags per cubic meter
    paint_bucket_volume: 20,    // liters per bucket for sealer
    paint_finish_bucket: 9,     // liters per bucket for finish paint
    
    // Weight per container
    dyton_bucket: 15,          // kg per bucket for dyton putty
    acrylic_bucket: 15,        // kg per bucket for acrylic putty
    plastic_bucket: 9          // liters per bucket for plastic paint
};

/**
 * Category Definitions
 * Main categories and their subcategories for construction materials
 */
const MAIN_CATEGORIES = [
    'الهدم',
    'المباني',
    'البياض',
    'البورسلين',
    'رخام',
    'العزل',
    'تكييفات',
    'جبس',
    'النقاشة'
];

// Sub-categories mapped to main categories
const SUB_CATEGORIES = {
    'الهدم': [
        'هدم مباني حوائط',
        'تكسير سيراميك حوائط',
        'تكسير سيراميك أرضيات',
        'تكسير محارة'
    ],
    'المباني': [
        'طوب طفلي 20×9×5',
        'طوب طفلي 24×11×6',
        'طوب مصمت دبل 24×11×11',
        'طوب أحمر 20×10×5'
    ],
    'البياض': [
        'طرطشة',
        'بؤج',
        'ملو'
    ],
    'البورسلين': [
        'بورسلين أرضيات 120×60 سم',
        'بورسلين حوائط 120×60 سم',
        'تأسيس تحت HDF',
        'وزر'
    ],
    'رخام': [
        'رخام اسود اسباني (أرضيات)',
        'رخام كرارة أبيض (أرضيات)',
        'تجاليد',
        'درج سلم'
    ],
    'جبس': [
        'أسقف جبس'
    ],
    'العزل': [
        'أنسومات',
        'سيكا 107',
        'عزل حراري'
    ],
    'النقاشة': [
        'تأسيس حوائط',
        'تأسيس أسقف',
        'تشطيب نقاشة'
    ]
};

/**
 * Production Rates
 * Daily production rates and required workers for each category and subcategory
 */
const PRODUCTION_RATES = {
    'الهدم': {
        'هدم مباني حوائط': {'معدل': 12, 'العمالة': 'عامل هدم'},
        'تكسير سيراميك أرضيات': {'معدل': 15, 'العمالة': 'عامل هدم'},
        'تكسير سيراميك حوائط': {'معدل': 20, 'العمالة': 'عامل هدم'},
        'تكسير محارة': {'معدل': 20, 'العمالة': 'عامل هدم'}
    },
    'المباني': {
        'طوب طفلي 20×9×5': {'معدل': 25, 'العمالة': 'بنا + مساعد'},
        'طوب طفلي 24×11×6': {'معدل': 28, 'العمالة': 'بنا + مساعد'},
        'طوب مصمت دبل 24×11×11': {'معدل': 28, 'العمالة': 'بنا + مساعد'},
        'طوب أحمر 20×10×5': {'معدل': 28, 'العمالة': 'بنا + مساعد'}
    },
    'البياض': {
        'طرطشة': {'معدل': 180, 'العمالة': 'مبيض + مساعد'},
        'بؤج': {'معدل': 75, 'العمالة': 'مبيض + مساعد'},
        'ملو': {'معدل': 40, 'العمالة': 'مبيض + مساعد'}
    },
    'البورسلين': {
        'بورسلين أرضيات 120×60 سم': {'معدل': 25, 'العمالة': 'مبلط + مساعد'},
        'بورسلين حوائط 120×60 سم': {'معدل': 15, 'العمالة': 'مبلط + مساعد'},
        'تأسيس تحت HDF': {'معدل': 25, 'العمالة': 'مبلط + مساعد'},
        'وزر': {'معدل': 15, 'العمالة': 'مبلط + مساعد'}
    },
    'رخام': {
        'رخام اسود اسباني (أرضيات)': {'معدل': 15, 'العمالة': 'مبلط رخام + مساعد'},
        'رخام كرارة أبيض (أرضيات)': {'معدل': 12, 'العمالة': 'مبلط رخام + مساعد'},
        'تجاليد': {'معدل': 5, 'العمالة': 'مبلط رخام + مساعد'},
        'درج سلم': {'معدل': 12, 'العمالة': 'مبلط رخام + مساعد'}
    },
    'جبس': {
        'أسقف جبس': {'معدل': 18, 'العمالة': 'معلم جبس + مساعد'}
    },
    'العزل': {
        'أنسومات': {'معدل': 60, 'العمالة': 'معلم عزل + مساعد'},
        'سيكا 107': {'معدل': 6, 'العمالة': 'معلم عزل + مساعد'},
        'عزل حراري': {'معدل': 60, 'العمالة': 'معلم عزل + مساعد'}
    },
    'النقاشة': {
        'تأسيس حوائط': {'معدل': 60, 'العمالة': 'نقاش + مساعد'},
        'تأسيس أسقف': {'معدل': 180, 'العمالة': 'نقاش + مساعد'},
        'تشطيب نقاشة': {'معدل': 180, 'العمالة': 'نقاش + مساعد'}
    }
};

// Initialize Bootstrap modals
const materialStorageModal = new bootstrap.Modal(document.getElementById('materialStorageModal'));

/**
 * Navigation Functions
 * Handle page transitions and modal displays
 */

function showCalculator() {
    document.getElementById('homepage').classList.add('d-none');
    document.getElementById('calculatorPage').classList.remove('d-none');
    document.getElementById('executionTimePage').classList.add('d-none');
}

function showHomepage() {
    document.getElementById('calculatorPage').classList.add('d-none');
    document.getElementById('homepage').classList.remove('d-none');
    document.getElementById('executionTimePage').classList.add('d-none');
}

function showExecutionTime() {
    document.getElementById('homepage').classList.add('d-none');
    document.getElementById('calculatorPage').classList.add('d-none');
    document.getElementById('executionTimePage').classList.remove('d-none');
    updateWorkTypes();
}

function showMaterialStorage() {
    materialStorageModal.show();
}

/**
 * UI Update Functions
 * Handle dynamic updates to form elements and labels
 */

function updateSubCategory() {
    const mainCategory = document.getElementById('mainCategory').value;
    const container = document.getElementById('subCategoryContainer');
    container.innerHTML = '';
    
    // Clear input fields and results
    document.getElementById('area').value = '';
    document.getElementById('results').innerHTML = '';

    if (mainCategory === 'تكييفات' || mainCategory === 'جبس' || mainCategory === 'البياض') {
        updateAreaLabel();
        return;
    }

    if (SUB_CATEGORIES[mainCategory]) {
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = getSubCategoryLabel(mainCategory);

        const select = document.createElement('select');
        select.className = 'form-select';
        select.id = 'subType';
        select.onchange = function() {
            document.getElementById('area').value = '';
            document.getElementById('results').innerHTML = '';
            updateAreaLabel();
        };

        SUB_CATEGORIES[mainCategory].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });

        container.appendChild(label);
        container.appendChild(select);
    }

    updateAreaLabel();
}

/**
 * Helper Functions
 * Utility functions for labels and text content
 */

function getSubCategoryLabel(category) {
    const labels = {
        'الهدم': 'نوع الهدم:',
        'رخام': 'نوع الرخام:',
        'المباني': 'نوع الطوب:',
        'البورسلين': 'نوع البورسلين:',
        'العزل': 'نوع العزل:',
        'النقاشة': 'نوع التأسيس:'
    };
    return labels[category] || '';
}

function updateAreaLabel() {
    const mainCategory = document.getElementById('mainCategory').value;
    const subTypeElement = document.getElementById('subType');
    const subType = subTypeElement ? subTypeElement.value : null;
    const areaLabel = document.getElementById('areaLabel');

    if ((mainCategory === 'البورسلين' && subType === 'وزر') || 
        (mainCategory === 'رخام' && subType === 'درج سلم')) {
        areaLabel.textContent = 'أدخل المساحة (متر طولي)';
    } else if (mainCategory === 'تكييفات') {
        areaLabel.textContent = 'أدخل عدد التكييفات';
    } else {
        areaLabel.textContent = 'أدخل المساحة (متر مربع)';
    }
}

function addResult(text) {
    const results = document.getElementById('results');
    const div = document.createElement('div');
    div.className = 'result-item';
    div.textContent = text;
    results.appendChild(div);
}

function calculate() {
    const resultsDiv = document.getElementById('results');
    const mainCategory = document.getElementById('mainCategory').value;
    const area = parseFloat(document.getElementById('area').value);
    
    if (isNaN(area) || area <= 0) {
        resultsDiv.innerHTML = '<div class="result-item error">الرجاء إدخال قيمة صحيحة موجبة للمساحة</div>';
        return;
    }

    let results = calculateResults(mainCategory, area);
    resultsDiv.innerHTML = results;
    
    // Add success animation
    resultsDiv.classList.add('calculation-complete');
    setTimeout(() => {
        resultsDiv.classList.remove('calculation-complete');
    }, 500);
}

function calculateResults(category, area) {
    let results = '';
    const subTypeElement = document.getElementById('subType');
    const subType = subTypeElement ? subTypeElement.value : null;

    if (category === 'الهدم') {
        let water_cart;
        switch(subType) {
            case 'هدم مباني حوائط':
                water_cart = area * 0.1;
                break;
            case 'تكسير سيراميك حوائط':
            case 'تكسير سيراميك أرضيات':
                water_cart = area * 0.04;
                break;
            case 'تكسير محارة':
                water_cart = area * 0.03;
                break;
        }
        results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;

    } else if (category === 'تكييفات') {
        const water_cart = area * 0.02;
        results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;

    } else if (category === 'جبس') {
        const water_cart = area * 0.02;
        results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;

    } else if (category === 'رخام') {
        if (subType === 'رخام (تجاليد)' || subType === 'تجاليد') {
            const adhesive = area * 0.2;
            const water_cart = area * 0.04;

            results += `<div class="result-item">مادة لاصقة: ${adhesive.toFixed(2)} شيكارة</div>`;
            results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;

        } else if (subType === 'درج سلم') {
            const cement = area * 0.264;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand_mortar = area * 0.048;
            const sand_mortar_bags = sand_mortar * CONVERSIONS.sand_bags_per_meter;
            const sand_fill = area * 0.1;
            const sand_fill_bags = sand_fill * CONVERSIONS.sand_bags_per_meter;
            const adhesive = area * 0.07;
            const water_cart = area * 0.04;

            results += `<div class="result-item">الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)</div>`;
            results += `<div class="result-item">رمل مونة: ${sand_mortar.toFixed(3)} متر مكعب (${Math.round(sand_mortar_bags)} شيكارة)</div>`;
            results += `<div class="result-item">رمل ردم: ${sand_fill.toFixed(3)} متر مكعب (${Math.round(sand_fill_bags)} شيكارة)</div>`;
            results += `<div class="result-item">مادة لاصقة: ${adhesive.toFixed(2)} شيكارة</div>`;
            results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;

        } else if (subType === 'رخام اسود اسباني (أرضيات)' || subType === 'رخام كرارة أبيض (أرضيات)') {
            const cement = area * 0.33;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand_mortar = area * 0.06;
            const sand_mortar_bags = sand_mortar * CONVERSIONS.sand_bags_per_meter;
            const sand_fill = area * 0.15;
            const sand_fill_bags = sand_fill * CONVERSIONS.sand_bags_per_meter;
            const adhesive = area * 0.07;
            const water_cart = area * 0.04;

            results += `<div class="result-item">الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)</div>`;
            results += `<div class="result-item">رمل مونة: ${sand_mortar.toFixed(3)} متر مكعب (${Math.round(sand_mortar_bags)} شيكارة)</div>`;
            results += `<div class="result-item">رمل ردم: ${sand_fill.toFixed(3)} متر مكعب (${Math.round(sand_fill_bags)} شيكارة)</div>`;
            results += `<div class="result-item">مادة لاصقة: ${adhesive.toFixed(2)} شيكارة</div>`;
            results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;
        }

    } else if (category === 'المباني') {
        const cement = area * 0.25;
        const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
        const sand = area * 0.0417;
        const sand_bags = sand * CONVERSIONS.sand_bags_per_meter;
        const water_cart = area * 0.022;
        let bricks;

        switch(subType) {
            case 'طوب طفلي 20×9×5':
                bricks = area * 80;
                break;
            case 'طوب طفلي 24×11×6':
                bricks = area * 60;
                break;
            case 'طوب مصمت دبل 24×11×11':
                bricks = area * 38;
                break;
            case 'طوب أحمر 20×10×5':
                bricks = area * 87;
                break;
        }

        results += `<div class="result-item">الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)</div>`;
        results += `<div class="result-item">الرمل: ${sand.toFixed(3)} متر مكعب (${Math.round(sand_bags)} شيكارة)</div>`;
        results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;
        results += `<div class="result-item">الطوب: ${Math.round(bricks)} طوبة</div>`;

    } else if (category === 'البياض') {
        const cement = area * 0.33;
        const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
        const sand = area * 0.056;
        const sand_bags = sand * CONVERSIONS.sand_bags_per_meter;
        const fresco = (area / 40) * 2;
        const water_cart = area * 0.003;
        const fiber = (area / 40) * 0.5;

        results += `<div class="result-item">الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)</div>`;
        results += `<div class="result-item">الرمل: ${sand.toFixed(3)} متر مكعب (${Math.round(sand_bags)} شيكارة)</div>`;
        results += `<div class="result-item">فريسبيكو: ${fresco.toFixed(1)} عود</div>`;
        results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;
        results += `<div class="result-item">شبك فايبر: ${fiber.toFixed(2)} لفة</div>`;

    } else if (category === 'البورسلين') {
        if (subType === 'بورسلين أرضيات 120×60 سم') {
            const cement = area * 0.4;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const adhesive = area / 20;
            const sand_mortar = area * 0.0625;
            const sand_mortar_bags = sand_mortar * CONVERSIONS.sand_bags_per_meter;
            const sand_fill = area * 0.15;
            const sand_fill_bags = sand_fill * CONVERSIONS.sand_bags_per_meter;
            const water_cart = area * 0.04;
            const clips = area / 13;
            const white_cement = area / 100;

            results += `<div class="result-item">الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)</div>`;
            results += `<div class="result-item">مادة لاصقة: ${adhesive.toFixed(2)} شيكارة</div>`;
            results += `<div class="result-item">رمل مونة: ${sand_mortar.toFixed(3)} متر مكعب (${Math.round(sand_mortar_bags)} شيكارة)</div>`;
            results += `<div class="result-item">رمل ردم: ${sand_fill.toFixed(3)} متر مكعب (${Math.round(sand_fill_bags)} شيكارة)</div>`;
            results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;
            results += `<div class="result-item">كليبسات: ${clips.toFixed(2)} كيس</div>`;
            results += `<div class="result-item">أسمنت أبيض: ${white_cement.toFixed(2)} شيكارة</div>`;

        } else if (subType === 'بورسلين حوائط 120×60 سم') {
            const adhesive = area / 6;
            const clips = area / 13;
            const white_cement = area / 100;

            results += `<div class="result-item">مادة لاصقة: ${adhesive.toFixed(2)} شيكارة</div>`;
            results += `<div class="result-item">كليبسات: ${clips.toFixed(2)} كيس</div>`;
            results += `<div class="result-item">أسمنت أبيض: ${white_cement.toFixed(2)} شيكارة</div>`;

        } else if (subType === 'وزر') {
            const adhesive = area / 60;
            results += `<div class="result-item">مادة لاصقة: ${adhesive.toFixed(2)} شيكارة</div>`;

        } else if (subType === 'تأسيس تحت HDF') {
            const cement = area * 0.25;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand_mortar = area * 0.056;
            const sand_mortar_bags = sand_mortar * CONVERSIONS.sand_bags_per_meter;
            const sand_fill = area * 0.15;
            const sand_fill_bags = sand_fill * CONVERSIONS.sand_bags_per_meter;
            const water_cart = area * 0.04;
            const white_cement = area / 100;

            results += `<div class="result-item">الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)</div>`;
            results += `<div class="result-item">رمل مونة: ${sand_mortar.toFixed(3)} متر مكعب (${Math.round(sand_mortar_bags)} شيكارة)</div>`;
            results += `<div class="result-item">رمل ردم: ${sand_fill.toFixed(3)} متر مكعب (${Math.round(sand_fill_bags)} شيكارة)</div>`;
            results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;
            results += `<div class="result-item">أسمنت أبيض: ${white_cement.toFixed(2)} شيكارة</div>`;
        }

    } else if (category === 'العزل') {
        if (subType === 'أنسومات') {
            const cement = area * 0.33;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand = area * 0.1;
            const sand_bags = sand * CONVERSIONS.sand_bags_per_meter;
            const membrane = area / 8;
            const primer = area / 16;

            results += `<div class="result-item">الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)</div>`;
            results += `<div class="result-item">الرمل: ${sand.toFixed(3)} متر مكعب (${Math.round(sand_bags)} شيكارة)</div>`;
            results += `<div class="result-item">ميمبرين: ${membrane.toFixed(2)} لفة</div>`;
            results += `<div class="result-item">برايمر: ${primer.toFixed(2)} بستلة</div>`;

        } else if (subType === 'سيكا 107') {
            const cement = area * 0.33;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand = area * 0.1;
            const sand_bags = sand * CONVERSIONS.sand_bags_per_meter;
            const sika = area / 10;
            const adibond = area / 24;

            results += `<div class="result-item">الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)</div>`;
            results += `<div class="result-item">الرمل: ${sand.toFixed(3)} متر مكعب (${Math.round(sand_bags)} شيكارة)</div>`;
            results += `<div class="result-item">سيكا: ${sika.toFixed(2)} مجموعة</div>`;
            results += `<div class="result-item">أديبوند: ${adibond.toFixed(2)} جركن</div>`;

        } else if (subType === 'عزل حراري') {
            const foam = area / 3.5;
            results += `<div class="result-item">فوم: ${foam.toFixed(2)} كيلو</div>`;
        }

    } else if (category === 'النقاشة') {
        if (subType === 'تأسيس حوائط') {
            const sealer = area * 0.14;
            const sealer_buckets = sealer / CONVERSIONS.paint_bucket_volume;
            const acrylic = area * 0.8;
            const acrylic_buckets = acrylic / CONVERSIONS.acrylic_bucket;
            const dyton = area * 0.43;
            const dyton_buckets = dyton / CONVERSIONS.dyton_bucket;
            const plastic = area * 0.08;
            const plastic_buckets = plastic / CONVERSIONS.plastic_bucket;
            const water_cart = area * 0.002;

            results += `<div class="result-item">سيلر: ${sealer.toFixed(2)} لتر (${sealer_buckets.toFixed(2)} بستلة)</div>`;
            results += `<div class="result-item">معجون أكريلك: ${acrylic.toFixed(2)} كجم (${acrylic_buckets.toFixed(2)} بستلة)</div>`;
            results += `<div class="result-item">دايتون: ${dyton.toFixed(2)} كجم (${dyton_buckets.toFixed(2)} بستلة)</div>`;
            results += `<div class="result-item">بلاستيك: ${plastic.toFixed(2)} لتر (${plastic_buckets.toFixed(2)} بستلة)</div>`;
            results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;

        } else if (subType === 'تأسيس أسقف') {
            const thermal_sealer = area * 0.07;
            const thermal_sealer_buckets = thermal_sealer / CONVERSIONS.paint_bucket_volume;
            const dyton = area * 0.33;
            const dyton_buckets = dyton / CONVERSIONS.dyton_bucket;
            const plastic = area * 0.09;
            const plastic_buckets = plastic / CONVERSIONS.plastic_bucket;
            const water_cart = area * 0.002;

            results += `<div class="result-item">سيلر حراري: ${thermal_sealer.toFixed(2)} لتر (${thermal_sealer_buckets.toFixed(2)} بستلة)</div>`;
            results += `<div class="result-item">دايتون: ${dyton.toFixed(2)} كجم (${dyton_buckets.toFixed(2)} بستلة)</div>`;
            results += `<div class="result-item">بلاستيك: ${plastic.toFixed(2)} لتر (${plastic_buckets.toFixed(2)} بستلة)</div>`;
            results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;

        } else if (subType === 'تشطيب نقاشة') {
            const paint = area * 0.15;
            const paint_buckets = paint / CONVERSIONS.paint_finish_bucket;
            const water_cart = area * 0.002;

            results += `<div class="result-item">دهان: ${paint.toFixed(2)} لتر (${paint_buckets.toFixed(2)} بستلة)</div>`;
            results += `<div class="result-item">عربية رتش: ${water_cart.toFixed(3)}</div>`;
        }
    }
    
    return results;
}

// Execution time calculator functions
function updateExecutionSubCategory() {
    const mainCategory = document.getElementById('executionCategory').value;
    const container = document.getElementById('executionSubCategoryContainer');
    container.innerHTML = '';
    
    // Clear area input field
    document.getElementById('executionArea').value = '';
    document.getElementById('executionResults').innerHTML = '';

    if (SUB_CATEGORIES[mainCategory]) {
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = getSubCategoryLabel(mainCategory);

        const select = document.createElement('select');
        select.className = 'form-select';
        select.id = 'executionSubType';
        select.onchange = function() {
            document.getElementById('executionArea').value = '';
            document.getElementById('executionResults').innerHTML = '';
            updateExecutionAreaLabel();
        };

        SUB_CATEGORIES[mainCategory].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });

        container.appendChild(label);
        container.appendChild(select);
    }

    updateExecutionAreaLabel();
}

function updateExecutionAreaLabel() {
    const mainCategory = document.getElementById('executionCategory').value;
    const subTypeElement = document.getElementById('executionSubType');
    const subType = subTypeElement ? subTypeElement.value : null;
    const areaLabel = document.getElementById('executionAreaLabel');

    if ((mainCategory === 'البورسلين' && subType === 'وزر') || 
        (mainCategory === 'رخام' && subType === 'درج سلم')) {
        areaLabel.textContent = 'أدخل المساحة (متر طولي)';
    } else {
        areaLabel.textContent = 'أدخل المساحة (متر مربع)';
    }
}

function calculateExecutionTime() {
    const resultsDiv = document.getElementById('executionResults');
    const mainCategory = document.getElementById('executionCategory').value;
    const area = parseFloat(document.getElementById('executionArea').value);
    const workersCount = parseInt(document.getElementById('workersCount').value) || 1;
    
    if (isNaN(area) || area <= 0) {
        resultsDiv.innerHTML = '<div class="result-item error">الرجاء إدخال قيمة صحيحة موجبة للمساحة</div>';
        return;
    }

    if (workersCount <= 0) {
        resultsDiv.innerHTML = '<div class="result-item error">الرجاء إدخال عدد صحيح موجب للعمال</div>';
        return;
    }

    const subTypeElement = document.getElementById('executionSubType');
    const subType = subTypeElement ? subTypeElement.value : null;
    let dailyRate = 0;
    let workers = '';

    if (PRODUCTION_RATES[mainCategory]) {
        if (typeof PRODUCTION_RATES[mainCategory] === 'object' && !PRODUCTION_RATES[mainCategory].معدل) {
            if (PRODUCTION_RATES[mainCategory][subType]) {
                dailyRate = PRODUCTION_RATES[mainCategory][subType].معدل;
                workers = PRODUCTION_RATES[mainCategory][subType].العمالة;
            }
        } else {
            dailyRate = PRODUCTION_RATES[mainCategory].معدل;
            workers = PRODUCTION_RATES[mainCategory].العمالة;
        }
    }

    if (dailyRate > 0) {
        const days = Math.ceil(area / (dailyRate * workersCount));
        resultsDiv.innerHTML = `<div class="result-item">المدة المتوقعة: ${days} يوم</div>`;
    } else {
        resultsDiv.innerHTML = '<div class="result-item error">لم يتم العثور على معدل الإنتاج لهذا البند</div>';
    }

    // Add success animation
    resultsDiv.classList.add('calculation-complete');
    setTimeout(() => {
        resultsDiv.classList.remove('calculation-complete');
    }, 500);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateSubCategory();
    updateExecutionSubCategory(); // Initialize execution time calculator
});