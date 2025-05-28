// Constants for material conversions
const CONVERSIONS = {
    cement_bag_to_ton: 20,  // 20 bags (50kg each) = 1 ton
    white_cement_weight: 40,  // kg per bag
    adhesive_weight: 50,  // kg per bag
    sand_bags_per_meter: 24,  // 24 bags per cubic meter
};

// Daily production rates
const PRODUCTION_RATES = {
    'المباني': {
        'معدل': 25,
        'العمالة': 'بنا + مساعد'
    },
    'البياض': {
        'طرطشة': {'معدل': 180, 'العمالة': 'مبيض + مساعد'},
        'بؤج': {'معدل': 70, 'العمالة': 'مبيض + مساعد'},
        'ملو': {'معدل': 40, 'العمالة': 'مبيض + مساعد'}
    },
    'البورسلين': {
        'أرضيات': {'معدل': 25, 'العمالة': 'مبلط + مساعد'},
        'حوائط': {'معدل': 15, 'العمالة': 'مبلط + مساعد'},
        'تأسيس تحت HDF': {'معدل': 25, 'العمالة': 'مبلط + مساعد'}
    },
    'العزل': {
        'أنسومات': {'معدل': 60, 'العمالة': 'صنايعي + مساعد'},
        'سيكا 107': {'معدل': 6, 'العمالة': 'صنايعي + مساعد'},
        'عزل حراري': {'معدل': 60, 'العمالة': 'صنايعي + مساعد'}
    },
    'النقاشة': {
        'معجون وصنفرة': {'معدل': 60, 'العمالة': 'نقاش + مساعد'},
        'بلاستيك': {'معدل': 150, 'العمالة': 'نقاش + مساعد'}
    }
};

// Sub-category options for each main category
const SUB_CATEGORIES = {
    'المباني': ['طوب طفلي 20×9×5', 'طوب طفلي 24×11×6'],
    'البورسلين': ['بورسلين أرضيات', 'بورسلين حوائط', 'تأسيس تحت HDF', 'وزر'],
    'العزل': ['سيكا 107', 'أنسومات', 'عزل حراري'],
    'النقاشة': ['تأسيس حوائط', 'تأسيس أسقف']
};

// Initialize Bootstrap modals
const productionRatesModal = new bootstrap.Modal(document.getElementById('productionRatesModal'));
const materialStorageModal = new bootstrap.Modal(document.getElementById('materialStorageModal'));

function showProductionRates() {
    const content = document.getElementById('productionRatesContent');
    content.innerHTML = '';

    for (const [category, data] of Object.entries(PRODUCTION_RATES)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'mb-4';
        
        const categoryTitle = document.createElement('h5');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        if ('معدل' in data) {
            const rate = document.createElement('div');
            rate.className = 'ms-3';
            rate.textContent = `معدل الإنتاج: ${data['معدل']} م² / يوم - ${data['العمالة']}`;
            categoryDiv.appendChild(rate);
        } else {
            for (const [subCategory, subData] of Object.entries(data)) {
                const subRate = document.createElement('div');
                subRate.className = 'ms-3';
                subRate.textContent = `${subCategory} - معدل الإنتاج: ${subData['معدل']} م² / يوم - ${subData['العمالة']}`;
                categoryDiv.appendChild(subRate);
            }
        }

        content.appendChild(categoryDiv);
    }

    productionRatesModal.show();
}

function showMaterialStorage() {
    materialStorageModal.show();
}

function updateSubCategory() {
    const mainCategory = document.getElementById('mainCategory').value;
    const container = document.getElementById('subCategoryContainer');
    container.innerHTML = '';
    
    // Clear area input field
    document.getElementById('area').value = '';
    document.getElementById('results').innerHTML = '';

    if (SUB_CATEGORIES[mainCategory]) {
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = getSubCategoryLabel(mainCategory);

        const select = document.createElement('select');
        select.className = 'form-select';
        select.id = 'subType';
        select.onchange = function() {
            // Clear area input field when sub-category changes
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

function updateAreaLabel() {
    const mainCategory = document.getElementById('mainCategory').value;
    const subTypeElement = document.getElementById('subType');
    const subType = subTypeElement ? subTypeElement.value : null;
    const areaLabel = document.getElementById('areaLabel');

    if (mainCategory === 'البورسلين' && subType === 'وزر') {
        areaLabel.textContent = 'أدخل المساحة (متر طولي)';
    } else {
        areaLabel.textContent = 'أدخل المساحة (متر مربع)';
    }
}

function getSubCategoryLabel(category) {
    switch(category) {
        case 'المباني': return 'نوع الطوب:';
        case 'البورسلين': return 'نوع البورسلين:';
        case 'العزل': return 'نوع العزل:';
        case 'النقاشة': return 'نوع التأسيس:';
        default: return '';
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
    const area = parseFloat(document.getElementById('area').value);
    const results = document.getElementById('results');
    results.innerHTML = '';

    if (!area || area <= 0) return;

    const category = document.getElementById('mainCategory').value;
    const subTypeElement = document.getElementById('subType');
    const subType = subTypeElement ? subTypeElement.value : null;

    if (category === 'المباني') {
        const cement = area * 0.25;
        const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
        const sand = area * 0.0417;
        const sand_bags = sand * CONVERSIONS.sand_bags_per_meter;
        const water_cart = area * 0.022;
        const bricks = area * (subType.includes('20×9×5') ? 80 : 60);

        addResult(`الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)`);
        addResult(`الرمل: ${sand.toFixed(3)} متر مكعب (${Math.round(sand_bags)} شيكارة)`);
        addResult(`عربية رتش: ${water_cart.toFixed(3)}`);
        addResult(`الطوب: ${Math.round(bricks)} طوبة`);

    } else if (category === 'البياض') {
        const cement = area * 0.33;
        const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
        const sand = area * 0.056;
        const sand_bags = sand * CONVERSIONS.sand_bags_per_meter;
        const fresco = (area / 40) * 2;
        const water_cart = area * 0.003;
        const fiber = (area / 40) * 0.5;

        addResult(`الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)`);
        addResult(`الرمل: ${sand.toFixed(3)} متر مكعب (${Math.round(sand_bags)} شيكارة)`);
        addResult(`فريسبيكو: ${fresco.toFixed(1)} عود`);
        addResult(`عربية رتش: ${water_cart.toFixed(3)}`);
        addResult(`شبك فايبر: ${fiber.toFixed(2)} لفة`);

    } else if (category === 'البورسلين') {
        if (subType === 'بورسلين أرضيات') {
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

            addResult(`الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)`);
            addResult(`مادة لاصقة: ${adhesive.toFixed(2)} شيكارة`);
            addResult(`رمل مونة: ${sand_mortar.toFixed(3)} متر مكعب (${Math.round(sand_mortar_bags)} شيكارة)`);
            addResult(`رمل ردم: ${sand_fill.toFixed(3)} متر مكعب (${Math.round(sand_fill_bags)} شيكارة)`);
            addResult(`عربية رتش: ${water_cart.toFixed(3)}`);
            addResult(`كليبسات: ${clips.toFixed(2)} كيس`);
            addResult(`أسمنت أبيض: ${white_cement.toFixed(2)} شيكارة`);

        } else if (subType === 'بورسلين حوائط') {
            const adhesive = area / 6;
            const clips = area / 13;
            const white_cement = area / 100;

            addResult(`مادة لاصقة: ${adhesive.toFixed(2)} شيكارة`);
            addResult(`كليبسات: ${clips.toFixed(2)} كيس`);
            addResult(`أسمنت أبيض: ${white_cement.toFixed(2)} شيكارة`);

        } else if (subType === 'وزر') {
            const adhesive = area / 60;
            addResult(`مادة لاصقة: ${adhesive.toFixed(2)} شيكارة`);

        } else if (subType === 'تأسيس تحت HDF') {
            const cement = area * 0.25;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand_mortar = area * 0.056;
            const sand_mortar_bags = sand_mortar * CONVERSIONS.sand_bags_per_meter;
            const sand_fill = area * 0.15;
            const sand_fill_bags = sand_fill * CONVERSIONS.sand_bags_per_meter;
            const water_cart = area * 0.04;
            const white_cement = area / 100;

            addResult(`الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)`);
            addResult(`رمل مونة: ${sand_mortar.toFixed(3)} متر مكعب (${Math.round(sand_mortar_bags)} شيكارة)`);
            addResult(`رمل ردم: ${sand_fill.toFixed(3)} متر مكعب (${Math.round(sand_fill_bags)} شيكارة)`);
            addResult(`عربية رتش: ${water_cart.toFixed(3)}`);
            addResult(`أسمنت أبيض: ${white_cement.toFixed(2)} شيكارة`);
        }

    } else if (category === 'العزل') {
        if (subType === 'أنسومات') {
            const cement = area * 0.33;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand = area * 0.1;
            const sand_bags = sand * CONVERSIONS.sand_bags_per_meter;
            const membrane = area / 8;
            const primer = area / 16;

            addResult(`الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)`);
            addResult(`الرمل: ${sand.toFixed(3)} متر مكعب (${Math.round(sand_bags)} شيكارة)`);
            addResult(`ميمبرين: ${membrane.toFixed(2)} لفة`);
            addResult(`برايمر: ${primer.toFixed(2)} بستلة`);

        } else if (subType === 'سيكا 107') {
            const cement = area * 0.33;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand = area * 0.1;
            const sand_bags = sand * CONVERSIONS.sand_bags_per_meter;
            const sika = area / 10;
            const adibond = area / 24;

            addResult(`الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)`);
            addResult(`الرمل: ${sand.toFixed(3)} متر مكعب (${Math.round(sand_bags)} شيكارة)`);
            addResult(`سيكا: ${sika.toFixed(2)} مجموعة`);
            addResult(`أديبوند: ${adibond.toFixed(2)} جركن`);

        } else if (subType === 'عزل حراري') {
            const foam = area / 3.5;
            addResult(`فوم: ${foam.toFixed(2)} كيلو`);
        }

    } else if (category === 'النقاشة') {
        if (subType === 'تأسيس حوائط') {
            const sealer = area * 0.14;
            const acrylic = area * 0.8;
            const dyton = area * 0.43;
            const plastic = area * 0.08;

            addResult(`سيلر: ${sealer.toFixed(2)} بستلة`);
            addResult(`معجون أكريلك: ${acrylic.toFixed(2)} كجم`);
            addResult(`دايتون: ${dyton.toFixed(2)} كجم`);
            addResult(`بلاستيك: ${plastic.toFixed(2)} لتر`);

        } else if (subType === 'تأسيس أسقف') {
            const thermal_sealer = area * 0.07;
            const dyton = area * 0.33;
            const plastic = area * 0.09;

            addResult(`سيلر حراري: ${thermal_sealer.toFixed(2)} بستلة`);
            addResult(`دايتون: ${dyton.toFixed(2)} كجم`);
            addResult(`بلاستيك: ${plastic.toFixed(2)} لتر`);
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateSubCategory();
}); 