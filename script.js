// Constants for material conversions
const CONVERSIONS = {
    cement_bag_to_ton: 20,  // 20 bags (50kg each) = 1 ton
    white_cement_weight: 40,  // kg per bag
    adhesive_weight: 50,  // kg per bag
    sand_bags_per_meter: 24,  // 24 bags per cubic meter
    paint_bucket_volume: 20,  // liters per bucket for sealer
    paint_finish_bucket: 9,   // liters per bucket for finish paint
    dyton_bucket: 15,        // kg per bucket for dyton putty
    acrylic_bucket: 15,      // kg per bucket for acrylic putty
    plastic_bucket: 9        // liters per bucket for plastic paint
};

// Main categories list
const MAIN_CATEGORIES = ['الهدم', 'المباني', 'البياض', 'البورسلين', 'رخام', 'العزل', 'تكييفات', 'جبس', 'النقاشة'];

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
    'الهدم': ['هدم مباني حوائط', 'تكسير سيراميك حوائط', 'تكسير سيراميك أرضيات', 'تكسير محارة'],
    'المباني': ['طوب طفلي 20×9×5', 'طوب طفلي 24×11×6', 'طوب مصمت دبل 24×11×11', 'طوب أحمر 20×10×5'],
    'البورسلين': ['بورسلين أرضيات 120×60 سم', 'بورسلين حوائط 120×60 سم', 'تأسيس تحت HDF', 'وزر'],
    'رخام': ['رخام اسود اسباني (أرضيات)', 'رخام كرارة أبيض (أرضيات)', 'رخام (تجاليد)'],
    'العزل': ['سيكا 107', 'أنسومات', 'عزل حراري'],
    'النقاشة': ['تأسيس حوائط', 'تأسيس أسقف', 'تشطيب نقاشة']
};

// Initialize Bootstrap modals
const productionRatesModal = new bootstrap.Modal(document.getElementById('productionRatesModal'));
const materialStorageModal = new bootstrap.Modal(document.getElementById('materialStorageModal'));

function showProductionRates() {
    const content = document.getElementById('productionRatesContent');
    content.innerHTML = `
        <div class="list-group">
            <div class="list-group-item list-group-item-primary fw-bold mb-2">المباني</div>
            <div class="list-group-item">• معدل الإنتاج: 25 م² / يوم</div>
            <div class="list-group-item">• العمالة: بنا + مساعد</div>

            <div class="list-group-item list-group-item-primary fw-bold mb-2 mt-4">البياض</div>
            <div class="list-group-item">• طرطشة: 180 م² / يوم - مبيض + مساعد</div>
            <div class="list-group-item">• بؤج: 70 م² / يوم - مبيض + مساعد</div>
            <div class="list-group-item">• ملو: 40 م² / يوم - مبيض + مساعد</div>

            <div class="list-group-item list-group-item-primary fw-bold mb-2 mt-4">البورسلين</div>
            <div class="list-group-item">• أرضيات: 25 م² / يوم - مبلط + مساعد</div>
            <div class="list-group-item">• حوائط: 15 م² / يوم - مبلط + مساعد</div>
            <div class="list-group-item">• تأسيس تحت HDF: 25 م² / يوم - مبلط + مساعد</div>

            <div class="list-group-item list-group-item-primary fw-bold mb-2 mt-4">العزل</div>
            <div class="list-group-item">• أنسومات: 60 م² / يوم - صنايعي + مساعد</div>
            <div class="list-group-item">• سيكا 107: 6 م² / يوم - صنايعي + مساعد</div>
            <div class="list-group-item">• عزل حراري: 60 م² / يوم - صنايعي + مساعد</div>

            <div class="list-group-item list-group-item-primary fw-bold mb-2 mt-4">النقاشة</div>
            <div class="list-group-item">• معجون وصنفرة: 60 م² / يوم - نقاش + مساعد</div>
            <div class="list-group-item">• بلاستيك: 150 م² / يوم - نقاش + مساعد</div>
        </div>
    `;
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

    // Skip subcategory creation for تكييفات, جبس and البياض
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
    } else if (mainCategory === 'تكييفات') {
        areaLabel.textContent = 'أدخل عدد التكييفات';
    } else {
        areaLabel.textContent = 'أدخل المساحة (متر مربع)';
    }
}

function getSubCategoryLabel(category) {
    switch(category) {
        case 'الهدم': return 'نوع الهدم:';
        case 'رخام': return 'نوع الرخام:';
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
        addResult(`عربية رتش: ${water_cart.toFixed(3)}`);

    } else if (category === 'تكييفات') {
        const water_cart = area * 0.02;
        addResult(`عربية رتش: ${water_cart.toFixed(3)}`);

    } else if (category === 'جبس') {
        const water_cart = area * 0.02;
        addResult(`عربية رتش: ${water_cart.toFixed(3)}`);

    } else if (category === 'رخام') {
        if (subType === 'رخام (تجاليد)') {
            const adhesive = area * 0.07;
            const water_cart = area * 0.04;

            addResult(`مادة لاصقة: ${adhesive.toFixed(2)} شيكارة`);
            addResult(`عربية رتش: ${water_cart.toFixed(3)}`);

        } else {
            // Common calculations for both floor types
            const cement = area * 0.33;
            const cement_tons = cement / CONVERSIONS.cement_bag_to_ton;
            const sand_mortar = area * 0.06;
            const sand_mortar_bags = sand_mortar * CONVERSIONS.sand_bags_per_meter;
            const sand_fill = area * 0.15;
            const sand_fill_bags = sand_fill * CONVERSIONS.sand_bags_per_meter;
            const adhesive = area * 0.07;
            const water_cart = area * 0.04;

            addResult(`الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)`);
            addResult(`رمل مونة: ${sand_mortar.toFixed(3)} متر مكعب (${Math.round(sand_mortar_bags)} شيكارة)`);
            addResult(`رمل ردم: ${sand_fill.toFixed(3)} متر مكعب (${Math.round(sand_fill_bags)} شيكارة)`);
            addResult(`مادة لاصقة: ${adhesive.toFixed(2)} شيكارة`);
            addResult(`عربية رتش: ${water_cart.toFixed(3)}`);
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

            addResult(`الأسمنت: ${cement.toFixed(2)} شيكارة (${cement_tons.toFixed(2)} طن)`);
            addResult(`مادة لاصقة: ${adhesive.toFixed(2)} شيكارة`);
            addResult(`رمل مونة: ${sand_mortar.toFixed(3)} متر مكعب (${Math.round(sand_mortar_bags)} شيكارة)`);
            addResult(`رمل ردم: ${sand_fill.toFixed(3)} متر مكعب (${Math.round(sand_fill_bags)} شيكارة)`);
            addResult(`عربية رتش: ${water_cart.toFixed(3)}`);
            addResult(`كليبسات: ${clips.toFixed(2)} كيس`);
            addResult(`أسمنت أبيض: ${white_cement.toFixed(2)} شيكارة`);

        } else if (subType === 'بورسلين حوائط 120×60 سم') {
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
            const sealer_buckets = sealer / CONVERSIONS.paint_bucket_volume;
            const acrylic = area * 0.8;
            const acrylic_buckets = acrylic / CONVERSIONS.acrylic_bucket;
            const dyton = area * 0.43;
            const dyton_buckets = dyton / CONVERSIONS.dyton_bucket;
            const plastic = area * 0.08;
            const plastic_buckets = plastic / CONVERSIONS.plastic_bucket;
            const water_cart = area * 0.002;

            addResult(`سيلر: ${sealer.toFixed(2)} لتر (${sealer_buckets.toFixed(2)} بستلة)`);
            addResult(`معجون أكريلك: ${acrylic.toFixed(2)} كجم (${acrylic_buckets.toFixed(2)} بستلة)`);
            addResult(`دايتون: ${dyton.toFixed(2)} كجم (${dyton_buckets.toFixed(2)} بستلة)`);
            addResult(`بلاستيك: ${plastic.toFixed(2)} لتر (${plastic_buckets.toFixed(2)} بستلة)`);
            addResult(`عربية رتش: ${water_cart.toFixed(3)}`);

        } else if (subType === 'تأسيس أسقف') {
            const thermal_sealer = area * 0.07;
            const thermal_sealer_buckets = thermal_sealer / CONVERSIONS.paint_bucket_volume;
            const dyton = area * 0.33;
            const dyton_buckets = dyton / CONVERSIONS.dyton_bucket;
            const plastic = area * 0.09;
            const plastic_buckets = plastic / CONVERSIONS.plastic_bucket;
            const water_cart = area * 0.002;

            addResult(`سيلر حراري: ${thermal_sealer.toFixed(2)} لتر (${thermal_sealer_buckets.toFixed(2)} بستلة)`);
            addResult(`دايتون: ${dyton.toFixed(2)} كجم (${dyton_buckets.toFixed(2)} بستلة)`);
            addResult(`بلاستيك: ${plastic.toFixed(2)} لتر (${plastic_buckets.toFixed(2)} بستلة)`);
            addResult(`عربية رتش: ${water_cart.toFixed(3)}`);

        } else if (subType === 'تشطيب نقاشة') {
            const paint = area * 0.15;
            const paint_buckets = paint / CONVERSIONS.paint_finish_bucket;
            const water_cart = area * 0.002;

            addResult(`دهان: ${paint.toFixed(2)} لتر (${paint_buckets.toFixed(2)} بستلة)`);
            addResult(`عربية رتش: ${water_cart.toFixed(3)}`);
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateSubCategory();
});