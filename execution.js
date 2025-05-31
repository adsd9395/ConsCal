// معدلات الإنتاج اليومية للعمال
const DAILY_RATES = {
    'الهدم': {
        'هدم مباني حوائط': {'معدل_يومي': 12, 'نوع_العمالة': 'عامل هدم'},
        'تكسير سيراميك أرضيات': {'معدل_يومي': 15, 'نوع_العمالة': 'عامل هدم'},
        'تكسير سيراميك حوائط': {'معدل_يومي': 20, 'نوع_العمالة': 'عامل هدم'},
        'تكسير محارة': {'معدل_يومي': 20, 'نوع_العمالة': 'عامل هدم'}
    },
    'المباني': {
        'طوب 20×9×5': {'معدل_يومي': 25, 'نوع_العمالة': 'بنا + مساعد'},
        'طوب 24×11×11': {'معدل_يومي': 28, 'نوع_العمالة': 'بنا + مساعد'}
    },
    'البياض': {
        'طرطشة': {'معدل_يومي': 180, 'نوع_العمالة': 'مبيض + مساعد'},
        'بؤج': {'معدل_يومي': 75, 'نوع_العمالة': 'مبيض + مساعد'},
        'ملو': {'معدل_يومي': 40, 'نوع_العمالة': 'مبيض + مساعد'}
    },
    'البورسلين': {
        'حوائط بورسلين 120×60': {'معدل_يومي': 15, 'نوع_العمالة': 'مبلط + مساعد'},
        'أرضيات بورسلين 120×60': {'معدل_يومي': 25, 'نوع_العمالة': 'مبلط + مساعد'},
        'تأسيس بلاط HDF أسفله': {'معدل_يومي': 25, 'نوع_العمالة': 'مبلط + مساعد'}
    },
    'رخام': {
        'ترابيع أرضيات': {'معدل_يومي': 15, 'نوع_العمالة': 'مبلط رخام + مساعد'},
        'درج سلم': {'معدل_يومي': 12, 'نوع_العمالة': 'مبلط رخام + مساعد'},
        'تجاليد': {'معدل_يومي': 5, 'نوع_العمالة': 'مبلط رخام + مساعد'}
    },
    'جبس': {
        'أسقف جبس': {'معدل_يومي': 18, 'نوع_العمالة': 'معلم جبس + مساعد'}
    },
    'العزل': {
        'أنسومات': {'معدل_يومي': 60, 'نوع_العمالة': 'معلم عزل + مساعد'},
        'سيكا 107': {'معدل_يومي': 6, 'نوع_العمالة': 'معلم عزل + مساعد'},
        'حراري': {'معدل_يومي': 60, 'نوع_العمالة': 'معلم عزل + مساعد'}
    },
    'النقاشة': {
        'معجون و صنفرة': {'معدل_يومي': 60, 'نوع_العمالة': 'نقاش + مساعد'},
        'وجه بلاستيك': {'معدل_يومي': 180, 'نوع_العمالة': 'نقاش + مساعد'}
    }
};

// أنواع الأعمال الفرعية لكل بند
const WORK_TYPES = {
    'الهدم': ['هدم مباني حوائط', 'تكسير سيراميك حوائط', 'تكسير سيراميك أرضيات', 'تكسير محارة'],
    'المباني': ['طوب 20×9×5', 'طوب 24×11×11'],
    'البياض': ['طرطشة', 'بؤج', 'ملو'],
    'البورسلين': ['حوائط بورسلين 120×60', 'أرضيات بورسلين 120×60', 'تأسيس بلاط HDF أسفله'],
    'رخام': ['ترابيع أرضيات', 'درج سلم', 'تجاليد'],
    'جبس': ['أسقف جبس'],
    'العزل': ['أنسومات', 'سيكا 107', 'حراري'],
    'النقاشة': ['معجون و صنفرة', 'وجه بلاستيك']
};

// دالة تحديث أنواع الأعمال الفرعية
function updateWorkTypes() {
    const mainWork = document.getElementById('executionCategory').value;
    const container = document.getElementById('executionSubCategoryContainer');
    container.innerHTML = '';
    
    // مسح حقول الإدخال
    document.getElementById('executionArea').value = '';
    document.getElementById('executionResults').innerHTML = '';

    if (WORK_TYPES[mainWork]) {
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = getWorkTypeLabel(mainWork);

        const select = document.createElement('select');
        select.className = 'form-select';
        select.id = 'executionSubType';
        select.onchange = function() {
            document.getElementById('executionArea').value = '';
            document.getElementById('executionResults').innerHTML = '';
            updateWorkAreaLabel();
        };

        WORK_TYPES[mainWork].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });

        container.appendChild(label);
        container.appendChild(select);
    }

    updateWorkAreaLabel();
}

// دالة الحصول على عنوان نوع العمل
function getWorkTypeLabel(workType) {
    switch(workType) {
        case 'الهدم': return 'نوع الهدم:';
        case 'رخام': return 'نوع الرخام:';
        case 'المباني': return 'نوع الطوب:';
        case 'البورسلين': return 'نوع البورسلين:';
        case 'العزل': return 'نوع العزل:';
        case 'النقاشة': return 'نوع التأسيس:';
        default: return '';
    }
}

// دالة تحديث عنوان المساحة
function updateWorkAreaLabel() {
    const mainWork = document.getElementById('executionCategory').value;
    const subTypeElement = document.getElementById('executionSubType');
    const subType = subTypeElement ? subTypeElement.value : null;
    const areaLabel = document.getElementById('executionAreaLabel');

    if (mainWork === 'البورسلين' && subType === 'وزر') {
        areaLabel.textContent = 'أدخل المساحة (متر طولي)';
    } else {
        areaLabel.textContent = 'أدخل المساحة (متر مربع)';
    }
}

// دالة حساب مدة التنفيذ
function calculateExecutionTime() {
    const resultsDiv = document.getElementById('executionResults');
    const mainWork = document.getElementById('executionCategory').value;
    const workArea = parseFloat(document.getElementById('executionArea').value);
    const teamsCount = parseInt(document.getElementById('workersCount').value) || 1;
    
    if (isNaN(workArea)) {
        resultsDiv.innerHTML = '<div class="result-item">الرجاء إدخال قيمة صحيحة للمساحة</div>';
        return;
    }

    const subTypeElement = document.getElementById('executionSubType');
    const subType = subTypeElement ? subTypeElement.value : null;
    let dailyProductionRate = 0;
    let workersType = '';

    if (DAILY_RATES[mainWork]) {
        if (typeof DAILY_RATES[mainWork] === 'object' && !DAILY_RATES[mainWork].معدل_يومي) {
            if (DAILY_RATES[mainWork][subType]) {
                dailyProductionRate = DAILY_RATES[mainWork][subType].معدل_يومي;
                workersType = DAILY_RATES[mainWork][subType].نوع_العمالة;
            }
        } else {
            dailyProductionRate = DAILY_RATES[mainWork].معدل_يومي;
            workersType = DAILY_RATES[mainWork].نوع_العمالة;
        }
    }

    if (dailyProductionRate > 0) {
        const executionDays = Math.ceil(workArea / (dailyProductionRate * teamsCount));
        let results = '';
        results += `<div class="result-item">المدة المتوقعة: ${executionDays} يوم</div>`;
        resultsDiv.innerHTML = results;
    } else {
        resultsDiv.innerHTML = '<div class="result-item">لم يتم العثور على معدل الإنتاج لهذا البند</div>';
    }

    // إضافة تأثير النجاح
    resultsDiv.classList.add('calculation-complete');
    setTimeout(() => {
        resultsDiv.classList.remove('calculation-complete');
    }, 500);
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateWorkTypes();
}); 