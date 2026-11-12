/* ============================================================
   بيانات المنيو — الملف الوحيد اللي محتاج تعدّل فيه.
   المصدر: منيو 8-11-2026 (الوش + الضهر). الأسعار بالجنيه شاملة الضريبة.
   لتعديل سعر: غيّر الأرقام في prices (من الأصغر للأكبر).
   لإضافة صنف: انسخ أي صنف وغيّر البيانات (id لازم يطابق اسم ملف الصورة في img/).
   ============================================================ */

window.MENU_META = {
  version: "منيو 8-11-2026",
  // أسماء الأحجام بالترتيب من الأصغر للأكبر — راجعها وعدّلها لو الأحجام الفعلية مختلفة
  sizeLabels: {
    3: [{ ar: "صغير", en: "Small" }, { ar: "وسط", en: "Medium" }, { ar: "كبير", en: "Large" }],
    2: [{ ar: "وسط", en: "Medium" }, { ar: "كبير", en: "Large" }],
    1: [{ ar: "سعر موحّد", en: "One size" }]
  },
  note: "الأسعار بالجنيه المصري وشاملة ضريبة القيمة المضافة."
};

window.SECTIONS = [
  { id: "signature", ar: "المشروبات المميزة", en: "Signature", subAr: "ساخنة، مثلجة أو ممزوجة بالثلج", subEn: "Hot, iced or blended", icon: "★" },
  { id: "blended",   ar: "المشروبات الممزوجة بالثلج", en: "Blended", subAr: "مشروبات فروزن بالكريمة", subEn: "Frozen blended drinks", icon: "❄" },
  { id: "classics",  ar: "المشروبات الكلاسيكية", en: "Classics", subAr: "ساخنة أو مثلجة", subEn: "Hot & iced", icon: "☕" },
  { id: "tea",       ar: "شاي الأعشاب والنكهات", en: "Herbal & Flavoured Tea", subAr: "", subEn: "", icon: "🍵" },
  { id: "smoothie",  ar: "سموزي الفاكهة والزبادي", en: "Fruit & Yogurt Smoothie", subAr: "", subEn: "", icon: "🍓" }
];

/* coffee: true = فيه قهوة/إسبريسو مذكور في المنيو | false = مفيهوش قهوة | null = المنيو مش بيوضّح
   serve: hot / iced / blended / smoothie */
window.ITEMS = [
  /* ---------------- SIGNATURE ---------------- */
  {
    id: "turtle-mocha", section: "signature", en: "Turtle Mocha", ar: "تيرتل موكا",
    serve: ["hot", "iced", "blended"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Real chocolate", "Steamed milk", "Rich espresso", "Caramel", "Whipped cream", "Caramel sauce", "Snickers®"],
    ingAr: ["شوكولاتة حقيقية", "لبن مبخّر", "إسبريسو", "كراميل", "كريمة مخفوقة (ويبد كريم)", "صوص كراميل", "سنيكرز"],
    descEn: "Real chocolate melted into steamed milk, with rich espresso & caramel. Topped with whipped cream, caramel sauce & Snickers®.",
    descAr: "شوكولاتة حقيقية ذايبة في لبن مبخّر مع إسبريسو وكراميل، ويتزيّن بالكريمة المخفوقة وصوص الكراميل وسنيكرز."
  },
  {
    id: "caramel-high-rise", section: "signature", en: "Caramel High Rise", ar: "كراميل هاي رايز",
    serve: ["hot", "iced", "blended"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Freshly steamed milk", "Espresso", "Caramel syrup", "Whipped cream", "Caramel sauce"],
    ingAr: ["لبن مبخّر طازج", "إسبريسو", "سيرب كراميل", "كريمة مخفوقة", "صوص كراميل"],
    descEn: "Freshly steamed milk with espresso & caramel syrup. Topped with whipped cream & caramel sauce.",
    descAr: "لبن مبخّر طازج مع إسبريسو وسيرب كراميل، ويتزيّن بالكريمة المخفوقة وصوص الكراميل."
  },
  {
    id: "salted-caramel-budino", section: "signature", en: "Salted Caramel Budino", ar: "سولتد كراميل بودينو",
    serve: ["hot", "iced", "blended"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Sweet cream", "Espresso", "Caramel", "Whipped cream", "Caramel sauce", "Sugar salt (light sprinkle)"],
    ingAr: ["كريمة حلوة", "إسبريسو", "كراميل", "كريمة مخفوقة", "صوص كراميل", "رشّة خفيفة من ملح السكر"],
    descEn: "Delicious sweet cream & espresso beverage with caramel topped with whipped cream, caramel sauce and a light sprinkle of sugar salt.",
    descAr: "مشروب كريمة حلوة وإسبريسو مع كراميل، ويتزيّن بالكريمة المخفوقة وصوص الكراميل ورشّة خفيفة من ملح السكر."
  },
  {
    id: "campfire-mocha", section: "signature", en: "Campfire Mocha", ar: "كامب فاير موكا",
    serve: ["hot", "iced", "blended"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Real chocolate", "Steamed milk", "Rich espresso", "Toasted marshmallow flavor", "Whipped cream", "Mini marshmallows", "Chocolate chips"],
    ingAr: ["شوكولاتة حقيقية", "لبن مبخّر", "إسبريسو", "نكهة مارشميلو محمّص", "كريمة مخفوقة", "ميني مارشميلو", "قطع شوكولاتة (تشوكليت تشيبس)"],
    descEn: "Real chocolate melted into steamed milk, with rich espresso & toasted marshmallow flavor. Topped with whipped cream, mini marshmallows & chocolate chips.",
    descAr: "شوكولاتة حقيقية ذايبة في لبن مبخّر مع إسبريسو ونكهة المارشميلو المحمّص، ويتزيّن بالكريمة وميني مارشميلو وقطع الشوكولاتة."
  },
  {
    id: "mint-condition-mocha", section: "signature", en: "Mint Condition Mocha", ar: "مينت كونديشن موكا",
    serve: ["hot", "iced", "blended"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Real chocolate", "Steamed milk", "Rich espresso", "Mint flavor", "Whipped cream", "Chocolate Mint"],
    ingAr: ["شوكولاتة حقيقية", "لبن مبخّر", "إسبريسو", "نكهة نعناع", "كريمة مخفوقة", "شوكولاتة بالنعناع"],
    descEn: "Real chocolate melted into steamed milk, with rich espresso & mint flavor. Topped with whipped cream & chocolate Mint.",
    descAr: "شوكولاتة حقيقية ذايبة في لبن مبخّر مع إسبريسو ونكهة النعناع، ويتزيّن بالكريمة المخفوقة وشوكولاتة بالنعناع."
  },
  {
    id: "berry-white-mocha", section: "signature", en: "Berry White Mocha", ar: "بيري وايت موكا",
    serve: ["hot", "iced", "blended"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Real chocolate", "Steamed milk", "Rich espresso", "Raspberry flavor", "Whipped cream", "White chocolate chips"],
    ingAr: ["شوكولاتة حقيقية", "لبن مبخّر", "إسبريسو", "نكهة توت العُليق (راسبيري)", "كريمة مخفوقة", "قطع شوكولاتة بيضاء"],
    descEn: "Real chocolate melted into steamed milk, with rich espresso & raspberry flavor. Topped with whipped cream & white chocolate chips.",
    descAr: "شوكولاتة حقيقية ذايبة في لبن مبخّر مع إسبريسو ونكهة الراسبيري، ويتزيّن بالكريمة المخفوقة وقطع الشوكولاتة البيضاء."
  },

  /* ---------------- BLENDED ---------------- */
  {
    id: "fudgy-wudgy", section: "blended", en: "Fudgy Wudgy", ar: "فادجي وادجي",
    serve: ["blended"], coffee: null, prices: [160, 180, 195],
    ingEn: ["Vanilla cream base", "Black Out cupcake", "Whipped cream", "Dark chocolate drizzle", "Chocolate chips"],
    ingAr: ["قاعدة كريمة فانيليا", "كب كيك بلاك آوت", "كريمة مخفوقة", "صوص شوكولاتة دارك", "قطع شوكولاتة"],
    descEn: "Vanilla cream-based drink, blended with Black Out cupcake. Topped with whipped cream, dark chocolate drizzle & chips.",
    descAr: "مشروب بقاعدة كريمة الفانيليا ممزوج بكب كيك بلاك آوت، ويتزيّن بالكريمة المخفوقة وصوص الشوكولاتة الدارك وقطع الشوكولاتة."
  },
  {
    id: "red-velvet", section: "blended", en: "Red Velvet", ar: "ريد فيلفت",
    serve: ["blended"], coffee: null, prices: [160, 180, 195],
    ingEn: ["Vanilla cream base", "Red Velvet cupcake", "Whipped cream", "White chocolate drizzle", "Chocolate chips"],
    ingAr: ["قاعدة كريمة فانيليا", "كب كيك ريد فيلفت", "كريمة مخفوقة", "صوص شوكولاتة بيضاء", "قطع شوكولاتة"],
    descEn: "Vanilla cream-based drink, blended with Red Velvet cupcake. Topped with whipped cream, white chocolate drizzle & chips.",
    descAr: "مشروب بقاعدة كريمة الفانيليا ممزوج بكب كيك ريد فيلفت، ويتزيّن بالكريمة المخفوقة وصوص الشوكولاتة البيضاء وقطع الشوكولاتة."
  },
  {
    id: "tiramisu", section: "blended", en: "Tiramisu", ar: "تراميسو",
    serve: ["blended"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Vanilla cream base", "Blackout cupcake", "Cold espresso", "Whipped cream", "Cocoa powder"],
    ingAr: ["قاعدة كريمة فانيليا", "كب كيك بلاك آوت", "إسبريسو بارد", "كريمة مخفوقة", "بودرة كاكاو"],
    descEn: "Vanilla cream-based drink, blended with Blackout cupcake & cold espresso. Topped with whipped cream & cocoa powder.",
    descAr: "مشروب بقاعدة كريمة الفانيليا ممزوج بكب كيك بلاك آوت وإسبريسو بارد، ويتزيّن بالكريمة المخفوقة وبودرة الكاكاو."
  },
  {
    id: "caribou-cooler", section: "blended", en: "Caribou Cooler®", ar: "كاريبو كولر",
    serve: ["blended"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Smooth house coffee", "Ice"],
    ingAr: ["قهوة الهاوس الناعمة", "ثلج"],
    flavorsEn: ["Vanilla", "Espresso", "Chocolate"], flavorsAr: ["فانيليا", "إسبريسو", "شوكولاتة"],
    flavorFree: true,
    descEn: "Our smooth house coffee blended with ice. Comes in vanilla, espresso, & chocolate flavor. Your choice of flavor is free.",
    descAr: "قهوة الهاوس الناعمة ممزوجة بالثلج. متاح بنكهات الفانيليا أو الإسبريسو أو الشوكولاتة، واختيار النكهة مجاني."
  },
  {
    id: "coffeeless-cooler", section: "blended", en: "Coffeeless Cooler®", ar: "كولر بدون قهوة",
    serve: ["blended"], coffee: false, prices: [145, 165, 185],
    ingEn: ["Signature shake mix", "Ice", "Whipped cream", "Drizzle toppings"],
    ingAr: ["ميلك شيك ميكس الخاص بكاريبو", "ثلج", "كريمة مخفوقة", "صوص (دريزل) للتزيين"],
    flavorsEn: ["Frozen Hot Chocolate", "Cookies & Cream", "Chocolate", "Caramel", "Vanilla"],
    flavorsAr: ["فروزن هوت شوكليت", "كوكيز آند كريم", "شوكولاتة", "كراميل", "فانيليا"],
    flavorFree: true,
    descEn: "Frozen Hot Chocolate, Cookies & Cream, chocolate, caramel, or vanilla blended with ice & our signature shake mix. Topped with whipped cream & drizzle toppings. Your choice of flavor is free.",
    descAr: "اختار نكهتك: فروزن هوت شوكليت، كوكيز آند كريم، شوكولاتة، كراميل أو فانيليا — ممزوجة بالثلج وميلك شيك ميكس كاريبو، وتتزيّن بالكريمة والصوص. اختيار النكهة مجاني."
  },

  /* ---------------- CLASSICS ---------------- */
  {
    id: "latte", section: "classics", en: "Latte", ar: "لاتيه",
    serve: ["hot", "iced"], coffee: true, prices: [125, 135, 145],
    ingEn: ["Rich espresso", "Creamy steamed milk"],
    ingAr: ["إسبريسو", "لبن مبخّر كريمي"],
    descEn: "Rich espresso combined with creamy steamed milk.",
    descAr: "إسبريسو غني مع لبن مبخّر كريمي."
  },
  {
    id: "lite-latte", section: "classics", en: "Lite Latte", ar: "لايت لاتيه",
    serve: ["hot", "iced"], coffee: true, prices: [130, 140, 155],
    ingEn: ["Espresso", "Skimmed milk"],
    ingAr: ["إسبريسو", "لبن خالي الدسم (سكيمد)"],
    flavorsEn: ["Sugar-free caramel", "Sugar-free vanilla", "Sugar-free hazelnut"], flavorsAr: ["كراميل خالي من السكر", "فانيليا خالية من السكر", "بندق خالي من السكر"],
    descEn: "40% less calories than our classic latte; made with skimmed milk. Available in 3 sugar-free flavours: caramel, vanilla & hazelnut.",
    descAr: "سعراته أقل بنسبة 40% من اللاتيه الكلاسيك، مصنوع بلبن خالي الدسم. متاح بـ 3 نكهات خالية من السكر: كراميل، فانيليا وبندق."
  },
  {
    id: "spanish-latte", section: "classics", en: "Spanish Latte", ar: "سبانش لاتيه",
    serve: ["hot", "iced"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Rich espresso", "Special milk"],
    ingAr: ["إسبريسو", "لبن خاص (حلو)"],
    descEn: "A twisted Latin latte version that combines with rich espresso & special milk, gives it a sweet finish.",
    descAr: "نسخة لاتينية من اللاتيه: إسبريسو غني مع لبن خاص يديله طعم حلو في الآخر."
  },
  {
    id: "cappuccino", section: "classics", en: "Cappuccino", ar: "كابتشينو",
    serve: ["hot", "iced"], coffee: true, prices: [125, 135, 145],
    ingEn: ["Rich espresso", "Steamed milk", "Deep layer of foam"],
    ingAr: ["إسبريسو", "لبن مبخّر", "طبقة فوم سميكة"],
    descEn: "Rich espresso blended with steamed milk & topped with a deep layer of foam.",
    descAr: "إسبريسو غني مع لبن مبخّر، وفوقه طبقة سميكة من الفوم."
  },
  {
    id: "espresso", section: "classics", en: "Espresso", ar: "إسبرسو",
    serve: ["hot"], coffee: true, prices: [85, 100, 110],
    ingEn: ["Cross Fox Espresso"],
    ingAr: ["إسبرسو كروس فوكس (Cross Fox)"],
    descEn: "Our Cross Fox Espresso is the beating heart of Caribou Coffee & is exquisite on its own.",
    descAr: "إسبرسو كروس فوكس هو قلب كاريبو النابض، وطعمه رائع لوحده."
  },
  {
    id: "mocha", section: "classics", en: "Mocha®", ar: "موكا",
    serve: ["hot", "iced"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Real chocolate", "Steamed milk", "Rich espresso", "Whipped cream", "Chocolate chips"],
    ingAr: ["شوكولاتة حقيقية", "لبن مبخّر", "إسبريسو", "كريمة مخفوقة", "قطع شوكولاتة"],
    descEn: "Real chocolate melted into steamed milk, combined with rich espresso, topped with whipped cream & chocolate chips.",
    descAr: "شوكولاتة حقيقية ذايبة في لبن مبخّر مع إسبريسو، وتتزيّن بالكريمة المخفوقة وقطع الشوكولاتة."
  },
  {
    id: "hot-chocolate", section: "classics", en: "Hot Chocolate", ar: "شوكولاتة ساخنة",
    serve: ["hot", "iced"], coffee: false, prices: [160, 180, 195],
    ingEn: ["Real chocolate", "Steamed milk", "Whipped cream", "Chocolate chips"],
    ingAr: ["شوكولاتة حقيقية", "لبن مبخّر", "كريمة مخفوقة", "قطع شوكولاتة"],
    descEn: "Real chocolate melted into steamed milk, topped with whipped cream & chocolate chips.",
    descAr: "شوكولاتة حقيقية ذايبة في لبن مبخّر، وتتزيّن بالكريمة المخفوقة وقطع الشوكولاتة."
  },
  {
    id: "americano", section: "classics", en: "Americano", ar: "أمريكانو",
    serve: ["hot", "iced"], coffee: true, prices: [120, 130, 140],
    ingEn: ["Rich espresso", "Steaming hot water"],
    ingAr: ["إسبريسو", "مياه ساخنة"],
    descEn: "Rich espresso combined with steaming hot water creates this bolder, stronger version of traditional brewed coffee.",
    descAr: "إسبريسو غني مع مياه ساخنة، بيطلع نسخة أقوى وأجرأ من القهوة المحضّرة التقليدية."
  },
  {
    id: "flat-white", section: "classics", en: "Flat White", ar: "فلات وايت",
    serve: ["hot"], coffee: true, prices: [120], sizeNote: { ar: "متاح في حجم 8 أوز فقط", en: "Available only in 8 oz." },
    ingEn: ["Double shot of espresso", "Microfoam"],
    ingAr: ["دبل شوت إسبريسو", "ميكروفوم (رغوة ناعمة)"],
    descEn: "A hot drink consisting of double shot of espresso topped with microfoam. Available only in 8 oz.",
    descAr: "مشروب ساخن من دبل شوت إسبريسو وفوقه ميكروفوم. متاح في حجم 8 أوز فقط."
  },
  {
    id: "espresso-shaker", section: "classics", en: "Espresso Shaker", ar: "إسبريسو شيكر",
    serve: ["iced"], coffee: true, prices: [120, 130],
    ingEn: ["Cold espresso", "Cream", "Ice", "Your choice of flavour"],
    ingAr: ["إسبريسو بارد", "كريمة", "ثلج", "نكهة على اختيارك"],
    descEn: "Cold espresso shaken with cream, ice and your choice of flavour.",
    descAr: "إسبريسو بارد مخفوق مع الكريمة والثلج ونكهة من اختيارك."
  },
  {
    id: "cold-press", section: "classics", en: "Cold Press Coffee", ar: "قهوة مثلجة باردة",
    serve: ["iced"], coffee: true, prices: [120, 130, 140],
    ingEn: ["Caribou Blend®", "Ice cold water (steeped)"],
    ingAr: ["كاريبو بليند® (ميديم روست)", "مياه باردة بالنقع"],
    descEn: "Caribou Blend® steeped in ice cold water to fully extract the flavors of this full-bodied medium roast coffee.",
    descAr: "كاريبو بليند® منقوعة في مياه باردة لاستخلاص كامل نكهات القهوة المتوسطة التحميص."
  },
  {
    id: "freshly-brewed", section: "classics", en: "Freshly Brewed Coffee", ar: "قهوة طازجة",
    serve: ["hot", "iced"], coffee: true, prices: [120, 130, 140],
    ingEn: ["Regular & seasonal brewed coffees (rotating selection)"],
    ingAr: ["قهوة محضّرة من تشكيلة بتتغيّر (عادية وموسمية)"],
    descEn: "We rotate a selection of our regular & seasonal coffees and brew every hour to ensure maximum freshness.",
    descAr: "بنبدّل تشكيلة من القهوة العادية والموسمية ونحضّر قهوة جديدة كل ساعة لضمان أقصى درجات الطزاجة."
  },
  {
    id: "caramel-macchiato", section: "classics", en: "Caramel Macchiato", ar: "كراميل ماكياتو",
    serve: ["hot", "iced"], coffee: true, prices: [160, 180, 195],
    ingEn: ["Rich, bold espresso", "Steamed milk foam", "Caramel sauce", "Vanilla flavour"],
    ingAr: ["إسبريسو قوي", "رغوة لبن مبخّر", "صوص كراميل", "نكهة فانيليا"],
    descEn: "Rich, bold espresso topped with a dollop of steamed milk foam, with caramel sauce and vanilla flavour.",
    descAr: "إسبريسو قوي وفوقه رغوة لبن مبخّر، مع صوص كراميل ونكهة فانيليا."
  },
  {
    id: "turkish-coffee", section: "classics", en: "Turkish Coffee", ar: "قهوة تركية",
    serve: ["hot"], coffee: true, prices: [90, 110], priceLabels: [{ ar: "سنجل", en: "Single" }, { ar: "دبل", en: "Double" }],
    ingEn: ["Finely ground coffee beans", "Sugar (added to taste)"],
    ingAr: ["بن مطحون ناعم", "سكر (حسب الطلب)"],
    descEn: "Finely ground coffee beans boiled in a pot and served in a cup where the grounds are allowed to settle. Sugar is added to taste.",
    descAr: "بن مطحون ناعم بيتغلي في الإبريق ويتقدّم في فنجان بحيث الرواسب تترسّب في القاع. السكر حسب الطلب."
  },
  {
    id: "cortado", section: "classics", en: "Cortado", ar: "كورتادو",
    serve: ["hot"], coffee: true, prices: [120],
    ingEn: ["Rich espresso", "Warm milk (roughly equal amount)"],
    ingAr: ["إسبريسو", "لبن دافي بنفس الكمية تقريبًا"],
    descEn: "A rich espresso mixed with a roughly equal amount of warm milk to reduce the acidity.",
    descAr: "إسبريسو غني ممزوج بكمية مساوية تقريبًا من اللبن الدافي لتقليل الحموضة."
  },

  /* ---------------- TEA ---------------- */
  {
    id: "herbal-tea", section: "tea", en: "Hot Herbal Tea", ar: "شاي بالأعشاب",
    serve: ["hot"], coffee: false, prices: [80, 85, 95],
    ingEn: ["Herbal / flavoured tea"],
    ingAr: ["شاي بالأعشاب / بالنكهات"],
    flavorsEn: ["Earl Grey", "English Breakfast", "Chamomile", "Green Jasmine", "Assam tea", "Gunpowder Green"],
    flavorsAr: ["إيرل جراي", "إنجلش بريكفاست", "كاموميل (بابونج)", "ياسمين أخضر", "شاي أسام", "جن باودر جرين"],
    flavorsLabel: true,
    descEn: "Flavours available: Earl Grey, English Breakfast, Chamomile, Green Jasmine, Assam tea & Gunpowder Green.",
    descAr: "النكهات المتاحة: إيرل جراي، إنجلش بريكفاست، كاموميل، ياسمين أخضر، شاي أسام وجن باودر جرين."
  },

  /* ---------------- SMOOTHIES ---------------- */
  {
    id: "hibiscus-berries", section: "smoothie", en: "Hibiscus Berries", ar: "كركديه توت",
    serve: ["smoothie"], coffee: false, prices: [140],
    ingEn: ["Hibiscus", "Blueberry syrup", "Ice"],
    ingAr: ["كركديه", "سيرب توت أزرق (بلو بيري)", "ثلج"],
    descEn: "A blend of hibiscus with blue berry syrup blended with ice. A naturally sweet, tangy taste.",
    descAr: "مزيج من الكركديه مع سيرب البلو بيري ممزوج بالثلج. طعم حلو طبيعي ومنعش (فيه حموضة خفيفة)."
  },
  {
    id: "mango-orange", section: "smoothie", en: "Mango Orange", ar: "مانجو برتقال",
    serve: ["smoothie"], coffee: false, prices: [140, 160, 180],
    ingEn: ["All-natural yogurt", "Mango & orange pure", "Ice"],
    ingAr: ["زبادي طبيعي", "مهروس (بيوريه) مانجو وبرتقال", "ثلج"],
    descEn: "A blend of all-natural yogurt with mango & orange pure blended with ice. A naturally sweet, tangy treat.",
    descAr: "مزيج من الزبادي الطبيعي مع بيوريه المانجو والبرتقال ممزوج بالثلج. حلو طبيعي ومنعش."
  },
  {
    id: "strawberry-banana", section: "smoothie", en: "Strawberry Banana", ar: "فراولة وموز",
    serve: ["smoothie"], coffee: false, prices: [140, 160, 180],
    ingEn: ["All-natural yogurt", "Strawberry & banana puree", "Ice"],
    ingAr: ["زبادي طبيعي", "بيوريه فراولة وموز", "ثلج"],
    descEn: "A blend of all-natural yogurt with strawberry & banana puree blended with ice. A naturally sweet, tangy treat.",
    descAr: "مزيج من الزبادي الطبيعي مع بيوريه الفراولة والموز ممزوج بالثلج. حلو طبيعي ومنعش."
  }
];

/* ---------------- Make it your own ---------------- */
window.CUSTOM = {
  titleAr: "شكلها على حسب رغبتك", titleEn: "Make it your own",
  groups: [
    { id: "milk", ar: "اختيارات اللبن البديل", en: "Milk options", price: 55,
      items: [{ ar: "صويا", en: "Soy" }, { ar: "شوفان", en: "Oat" }, { ar: "جوز هند", en: "Coconut" }, { ar: "لوز", en: "Almond" }] },
    { id: "addons", ar: "الإضافات", en: "Add-ons", price: 40,
      items: [{ ar: "شوت إسبريسو إضافي (Moose it)", en: "Moose it extra espresso" }, { ar: "أوريو", en: "Oreo®" },
              { ar: "صوص شوكولاتة بيضاء", en: "White choco drizzle" }, { ar: "صوص شوكولاتة بالحليب", en: "Milk choco drizzle" },
              { ar: "سنيكرز", en: "Snickers®" }, { ar: "كريمة مخفوقة", en: "Whipped cream" },
              { ar: "صوص كراميل", en: "Caramel drizzle" }, { ar: "صوص شوكولاتة دارك", en: "Dark choco drizzle" }] },
    { id: "syrup", ar: "سيرب إضافي", en: "Extra syrup", price: 40,
      items: [{ ar: "كراميل", en: "Caramel" }, { ar: "فانيليا", en: "Vanilla" }, { ar: "بندق", en: "Hazelnut" },
              { ar: "كراميل خالي من السكر", en: "Sugar-free caramel" }, { ar: "فانيليا خالية من السكر", en: "Sugar-free vanilla" }, { ar: "نعناع", en: "Mint" }] }
  ]
};

/* ---------------- إجابات سريعة (كلها من المنيو) ---------------- */
window.FAQ = [
  { qAr: "الأسعار شاملة الضريبة؟", qEn: "Do prices include VAT?", aAr: "أيوه، الأسعار بالجنيه المصري وشاملة ضريبة القيمة المضافة.", aEn: "Yes — prices are in EGP and include VAT." },
  { qAr: "بدائل اللبن وسعرها؟", qEn: "Alternative milks & price?", aAr: "صويا، شوفان، جوز هند، لوز — بـ 55 جنيه للصنف.", aEn: "Soy, oat, coconut, almond — 55 EGP per item." },
  { qAr: "إيه الإضافات وسعرها؟", qEn: "Add-ons & price?", aAr: "40 جنيه للإضافة: شوت إسبريسو إضافي، أوريو، سنيكرز، كريمة مخفوقة، وصوصات (شوكولاتة بيضاء/بالحليب/دارك/كراميل).", aEn: "40 EGP each: extra espresso, Oreo, Snickers, whipped cream and drizzles (white/milk/dark choco, caramel)." },
  { qAr: "السيرب الإضافي؟", qEn: "Extra syrup?", aAr: "40 جنيه: كراميل، فانيليا، بندق، نعناع، وكراميل/فانيليا خالي من السكر.", aEn: "40 EGP: caramel, vanilla, hazelnut, mint, plus sugar-free caramel/vanilla." },
  { qAr: "فيه اختيار دايت / قليل السعرات؟", qEn: "Any lighter option?", aAr: "لايت لاتيه: سعراته أقل 40% من اللاتيه الكلاسيك ومصنوع بلبن خالي الدسم، وفيه 3 نكهات خالية من السكر (كراميل، فانيليا، بندق).", aEn: "Lite Latte: 40% fewer calories than the classic latte, made with skimmed milk, in 3 sugar-free flavours (caramel, vanilla, hazelnut)." },
  { qAr: "الفلات وايت بأي حجم؟", qEn: "Flat White size?", aAr: "متاح في حجم 8 أوز فقط وبسعر 120 جنيه.", aEn: "Available only in 8 oz — 120 EGP." },
  { qAr: "كاريبو كولر / كولر بدون قهوة — النكهة بتكلّف؟", qEn: "Is cooler flavor extra?", aAr: "لأ، اختيار النكهة مجاني في الاتنين.", aEn: "No — flavor choice is free on both." },
  { qAr: "مشروبات من غير قهوة؟", qEn: "Coffee-free options?", aAr: "كولر بدون قهوة، شوكولاتة ساخنة، شاي الأعشاب، وكل السموزي (كركديه توت، مانجو برتقال، فراولة وموز).", aEn: "Coffeeless Cooler, Hot Chocolate, herbal tea and all smoothies." },
  { qAr: "القهوة التركي بتتقدم إزاي؟", qEn: "How is Turkish coffee served?", aAr: "بن ناعم بيتغلي في الإبريق ويتقدم في فنجان، والسكر حسب الطلب. سنجل 90 / دبل 110.", aEn: "Finely ground, boiled in a pot and served in a cup; sugar to taste. Single 90 / Double 110." },
  { qAr: "القهوة الطازجة (Freshly Brewed) بتتغير؟", qEn: "Is the brewed coffee rotating?", aAr: "أيوه، بنبدّل تشكيلة من القهوة العادية والموسمية ونحضّر قهوة جديدة كل ساعة.", aEn: "Yes — we rotate regular & seasonal coffees and brew fresh every hour." }
];
