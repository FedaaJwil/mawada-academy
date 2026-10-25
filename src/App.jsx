import React, { useState } from "react";
import {
  Heart,
  PlayCircle,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Lock,
  ArrowLeft,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Truck,
  Users,
  BookOpen,
  Star,
  ChevronLeft,
  X,
  Check,
} from "lucide-react";

// ============================================================================
// 1. منطقة البيانات (عدلي هنا بسهولة مستقبلاً دون لمس الكود البرمجي)
// ============================================================================

const SITE_CONFIG = {
  academyName: "مَوَدَّة",
  academySlogan: "أكاديمية بناء الأسرة الواعية",
  whatsappNumber: "201000000000", // ضعي رقم الواتساب الخاص بك هنا (بكود الدولة بدون +)
  cardPrice: 350, // سعر لعبة الكروت بالجنيه
  shippingCost: 50, // سعر الشحن الثابت
};

// بيانات مراحل الأكاديمية والكورسات
const COURSES_DATA = [
  {
    id: "course-1",
    stage: "مرحلة الخطوبة والاختيار",
    title: "أساسيات الخطوبة الناجحة وفهم شريك الحياة",
    description:
      "الدليل العملي لبناء فترة خطوبة واعية، اكتشاف مدى التوافق، ووضع الأسس الصحيحة قبل الزواج بدون تجميل أو مثالية زائفة.",
    isFree: true,
    status: "available", // available | coming_soon
    instructor: "فريق أكاديمية مودة",
    duration: "ساعتان ونصف",
    lessonsCount: 5,
    lessons: [
      {
        id: 1,
        title: "١. لماذا نتزوج؟ تصحيح المفاهيم قبل البداية",
        duration: "18:30",
        videoId: "dQw4w9WgXcQ",
        description:
          "في هذا الدرس نناقش الدوافع الحقيقية للزواج وكيف نبني توقعات واقعية.",
      },
      {
        id: 2,
        title: "٢. الخريطة النفسية: كيف تفهمين نفسك وتفهمين شريكك؟",
        duration: "25:15",
        videoId: "dQw4w9WgXcQ",
        description:
          "أدوات عملية لفهم الطباع المختلفة وطرق التعبير عن المشاعر.",
      },
      {
        id: 3,
        title: "٣. الحوارات الكبرى: الماديات، العمل، والأدوار داخل البيت",
        duration: "32:00",
        videoId: "dQw4w9WgXcQ",
        description: "كيف نفتح المواضيع الحساسة بذكاء وهدوء خلال فترة الخطوبة؟",
      },
      {
        id: 4,
        title: "٤. إدارة الخلافات وحدود تدخل الأهل",
        duration: "28:45",
        videoId: "dQw4w9WgXcQ",
        description:
          "وضع الحدود الصحية مع العائلتين وحل المشكلات داخل الإطار الثنائي.",
      },
      {
        id: 5,
        title: "٥. علامات الأمان (Green Flags) وعلامات الخطر (Red Flags)",
        duration: "22:10",
        videoId: "dQw4w9WgXcQ",
        description:
          "مؤشرات واضحة تساعدك على اتخاذ قرار الاستمرار أو التوقف بوعي.",
      },
    ],
  },
  {
    id: "course-2",
    stage: "مرحلة الاستعداد للزواج",
    title: "تأسيس البيت وإدارة السنة الأولى من الزواج",
    description:
      "كيف تنتقلون من مرحلة التخطيط والفرح إلى واقع الحياة اليومية المشتركة، إدارة الميزانية، وتجاوز صدمات السنة الأولى.",
    isFree: false,
    price: 600,
    status: "coming_soon",
    duration: "4 ساعات",
    lessonsCount: 8,
    lessons: [],
  },
  {
    id: "course-3",
    stage: "ما بعد الزواج والتربية",
    title: "شراكة تدوم: تجديد المودة واستقبال الطفل الأول",
    description:
      "الحفاظ على حيوية العلاقة الزوجية وسط ضغوط الحياة، والاستعداد النفسي والعملي لمرحلة الأبوة والأمومة.",
    isFree: false,
    price: 750,
    status: "coming_soon",
    duration: "5 ساعات",
    lessonsCount: 10,
    lessons: [],
  },
];

// عينة من أسئلة كروت اللعبة لتجربتها على الموقع
const SAMPLE_CARDS = [
  {
    category: "اكتشاف الذات",
    color: "bg-rose-100 text-rose-800 border-rose-200",
    question:
      "ما هو أكثر موقف مررت به في السنوات الأخيرة وغيّر نظرتك للحياة أو جعلك أكثر نضجاً؟",
    hint: "هدف السؤال: فهم الخبرات التي شكلت شخصية شريكك.",
  },
  {
    category: "توقعات الزواج",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    question:
      "كيف تتخيل شكل يوم الإجازة المثالي لنا بعد الزواج؟ وهل تميل للهدوء في البيت أم الخروج والأنشطة؟",
    hint: "هدف السؤال: معرفة مدى توافق نمط الحياة اليومي (Lifestyle).",
  },
  {
    category: "إدارة الخلافات",
    color: "bg-teal-100 text-teal-800 border-teal-200",
    question:
      "عندما تشعر بالضغط أو الزعل، هل تفضل النقاش فوراً لحل المشكلة أم تحتاج لوقت من العزلة والهدوء أولاً؟",
    hint: "هدف السؤال: تجنب سوء الفهم وقت الغضب.",
  },
  {
    category: "الماديات والأولويات",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    question:
      "لو معنا مبلغ فائض آخر العام، ما هي أولويتك: السفر وتجربة جديدة، أم الادخار والاستثمار، أم شراء شيء للبيت؟",
    hint: "هدف السؤال: فهم العقلية المالية وترتيب الأولويات.",
  },
];

// ============================================================================
// 2. المكون الرئيسي للتطبيق (Main App Component)
// ============================================================================

export default function App() {
  // حالات التنقل والتفاعل (States)
  const [activeTab, setActiveTab] = useState("home"); // 'home' | 'course-player'
  const [currentLesson, setCurrentLesson] = useState(
    COURSES_DATA[0].lessons[0],
  );
  const [completedLessons, setCompletedLessons] = useState([1]);

  // حالات كروت اللعبة التفاعلية
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // حالات نافذة طلب الشراء (Order Modal)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    governorate: "القاهرة",
    address: "",
    quantity: 1,
    paymentMethod: "cod", // 'cod' (الدفع عند الاستلام) | 'instapay'
    notes: "",
  });

  // تبديل حالة إتمام الدرس
  const toggleLessonComplete = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  // تقليب كروت اللعبة التجريبية
  const nextSampleCard = () => {
    setIsCardFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % SAMPLE_CARDS.length);
    }, 150);
  };

  // التعامل مع إرسال طلب شراء الكروت
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const totalPrice =
      orderForm.quantity * SITE_CONFIG.cardPrice + SITE_CONFIG.shippingCost;

    // ------------------------------------------------------------------------
    // ملاحظة تقنية: هنا يمكنك وضع كود إرسال البيانات إلى Supabase أو Google Sheets
    // مثال: await supabase.from('orders').insert([{ ...orderForm, totalPrice }]);
    // ------------------------------------------------------------------------

    setOrderSubmitted(true);

    // تجهيز رسالة الواتساب الأوتوماتيكية
    const paymentText =
      orderForm.paymentMethod === "instapay"
        ? "إنستا باي / محفظة إلكترونية"
        : "الدفع عند الاستلام";
    const whatsappMessage = `مرحباً أكاديمية ${SITE_CONFIG.academyName} 🌸
أود تأكيد طلب شراء "كروت خطوبة واعية":
- الاسم: ${orderForm.name}
- رقم الهاتف: ${orderForm.phone}
- المحافظة: ${orderForm.governorate}
- العنوان: ${orderForm.address}
- عدد النسخ: ${orderForm.quantity}
- طريقة الدفع: ${paymentText}
- الإجمالي (شامل الشحن): ${totalPrice} جنيه
${orderForm.notes ? `- ملاحظات: ${orderForm.notes}` : ""}`;

    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans selection:bg-rose-200"
    >
      {/* ================= شريط التنقل العلوي (Navbar) ================= */}
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* اللوجو */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-rose-800 to-amber-800 bg-clip-text text-transparent">
                {SITE_CONFIG.academyName}
              </span>
              <p className="text-xs text-stone-500 hidden sm:block">
                {SITE_CONFIG.academySlogan}
              </p>
            </div>
          </div>

          {/* روابط التنقل */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => setActiveTab("home")}
              className="hover:text-rose-700 transition"
            >
              الرئيسية
            </button>
            <a
              href="#courses"
              onClick={() => setActiveTab("home")}
              className="hover:text-rose-700 transition"
            >
              مسار الدورات
            </a>
            <a
              href="#cards-game"
              onClick={() => setActiveTab("home")}
              className="hover:text-rose-700 transition"
            >
              لعبة كروت الخطوبة
            </a>
          </div>

          {/* أزرار الإجراءات السريعة */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("course-player")}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 font-semibold text-sm transition"
            >
              <PlayCircle className="w-4 h-4" />
              <span>ابدأ الكورس المجاني</span>
            </button>
            <button
              onClick={() => {
                setOrderSubmitted(false);
                setIsOrderModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>اطلب الكروت</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= العرض الشرطي: إما الصفحة الرئيسية أو مشغل الكورس ================= */}
      {activeTab === "home" ? (
        <main>
          {/* 1. القسم الترحيبي (Hero Section) */}
          <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-6 text-right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>خطوتك الأولى نحو بيت هادئ وعلاقة ناضجة</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.2]">
                  لأن الزواج ليس مجرد فرح.. بل{" "}
                  <span className="text-rose-700 underline decoration-amber-400/60 decoration-wavy underline-offset-8">
                    رحلة وعي
                  </span>{" "}
                  نبدأها معاً.
                </h1>

                <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
                  منصة متكاملة تأخذ بيدك من مرحلة الاختيار والخطوبة وحتى تأسيس
                  البيت وما بعد الزواج، عبر دورات عملية مبسطة وأدوات تفاعلية
                  تساعدكما على فهم أنفسكما وبعضكما بعمق.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActiveTab("course-player")}
                    className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold shadow-lg shadow-rose-700/20 transition transform hover:-translate-y-0.5"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>شاهد الدورة التأسيسية (مجاناً)</span>
                  </button>
                  <a
                    href="#cards-game"
                    className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-stone-50 text-slate-800 font-bold border border-stone-200 shadow-sm transition"
                  >
                    <span>اكتشف كروت المخطوبين</span>
                    <ArrowLeft className="w-4 h-4" />
                  </a>
                </div>

                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-200/80 text-center sm:text-right">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">
                      100%
                    </div>
                    <div className="text-xs text-stone-500">
                      محتوى علمي وعملي واقعي
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-rose-700">
                      +60 سؤال
                    </div>
                    <div className="text-xs text-stone-500">
                      في لعبة كروت الخطوبة
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-amber-700">
                      3 مراحل
                    </div>
                    <div className="text-xs text-stone-500">
                      خطوبة، زواج، وما بعدهما
                    </div>
                  </div>
                </div>
              </div>

              {/* بطاقة بصرية في الـ Hero */}
              <div className="md:col-span-5 relative">
                <div className="bg-gradient-to-br from-rose-100 via-amber-50 to-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xl relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      متاح الآن مجاناً
                    </span>
                    <BookOpen className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-stone-500">
                      الدورة الأولى ضمن المسار
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {COURSES_DATA[0].title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {COURSES_DATA[0].description}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-stone-100 space-y-2.5">
                    {COURSES_DATA[0].lessons.slice(0, 3).map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-2.5 text-xs text-stone-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                        <span className="truncate font-medium">
                          {lesson.title}
                        </span>
                      </div>
                    ))}
                    <div className="text-xs text-rose-700 font-semibold pt-1">
                      + درسين إضافيين بالداخل...
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("course-player")}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4 text-amber-400" />
                    <span>ابدأ المشاهدة الآن بدون تسجيل</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. قسم مسار الأكاديمية والدورات (Courses Roadmap) */}
          <section
            id="courses"
            className="py-16 bg-white border-y border-stone-200/80 px-4 sm:px-6"
          >
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-rose-700 font-bold text-sm">
                  خريطة التعلم في الأكاديمية
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  نسير معكما خطوة بخطوة
                </h2>
                <p className="text-stone-600 text-sm sm:text-base">
                  رتبنا المحتوى ليتناسب مع كل مرحلة تمرون بها، بداية من فترة
                  التعارف والخطوبة وحتى استقرار الأسرة.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {COURSES_DATA.map((course, idx) => (
                  <div
                    key={course.id}
                    className={`rounded-3xl p-6 sm:p-7 border transition flex flex-col justify-between ${
                      course.status === "available"
                        ? "bg-[#FAF8F5] border-rose-200 shadow-md ring-2 ring-rose-500/10"
                        : "bg-stone-50/60 border-stone-200 opacity-85"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-200/70 text-stone-700">
                          المرحلة {idx + 1}: {course.stage}
                        </span>
                        {course.isFree ? (
                          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            مجاناً
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                            قريباً
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-stone-200/70 space-y-4">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span>عدد الدروس: {course.lessonsCount} دروس</span>
                        <span>المدة: {course.duration}</span>
                      </div>

                      {course.status === "available" ? (
                        <button
                          onClick={() => setActiveTab("course-player")}
                          className="w-full py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm transition flex items-center justify-center gap-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>دخول الدورة مجاناً</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full py-3 rounded-xl bg-stone-200 text-stone-600 font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                        >
                          <Lock className="w-4 h-4" />
                          <span>يُفتح قريباً ({course.price} ج.م)</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. قسم لعبة كروت الخطوبة التفاعلي (The Card Game Section) */}
          <section id="cards-game" className="py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 rounded-[2.5rem] p-6 sm:p-12 text-white shadow-2xl overflow-hidden relative">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  {/* شرح اللعبة ومميزاتها */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>الإصدار المطبوع للمخطوبين والمتزوجين حديثاً</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                      لعبة كروت "حوارات عميقة".. اكسروا الملل واكتشفوا بعضكم
                      بجد!
                    </h2>

                    <p className="text-stone-300 text-base leading-relaxed">
                      أغلب المخطوبين يحتارون في فتح مواضيع تكشف الشخصية الحقيقية
                      بعيداً عن الأسئلة التقليدية. صممنا لكما علبة كروت مقسمة
                      علمياً تساعدكما على فهم نفسكما وشريككما في جو ممتع ودافئ.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <div className="font-bold text-amber-300 text-sm mb-1">
                          ٤ أقسام متنوعة
                        </div>
                        <p className="text-xs text-stone-300">
                          اكتشاف الذات، توقعات الزواج، إدارة الخلافات،
                          والماديات.
                        </p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <div className="font-bold text-rose-300 text-sm mb-1">
                          طباعة فاخرة تعيش معكم
                        </div>
                        <p className="text-xs text-stone-300">
                          ورق مقوى عالي الجودة مقاوم للتلف في علبة أنيقة تصلح
                          كهدية خطوبة.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-6">
                      <button
                        onClick={() => {
                          setOrderSubmitted(false);
                          setIsOrderModalOpen(true);
                        }}
                        className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>
                          اطلب نسختك الآن ({SITE_CONFIG.cardPrice} ج.م)
                        </span>
                      </button>
                      <div className="flex items-center gap-2 text-xs text-stone-300">
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span>توصيل لجميع محافظات مصر</span>
                      </div>
                    </div>
                  </div>

                  {/* معاينة حية للكروت (Interactive Card Flipper) */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div className="w-full max-w-sm bg-[#FAF8F5] text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400/40 min-h-[320px] flex flex-col justify-between transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${SAMPLE_CARDS[currentCardIndex].color}`}
                        >
                          قسم: {SAMPLE_CARDS[currentCardIndex].category}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                          {currentCardIndex + 1} / {SAMPLE_CARDS.length}
                        </span>
                      </div>

                      <div className="my-6 text-center space-y-4">
                        <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                          "{SAMPLE_CARDS[currentCardIndex].question}"
                        </p>

                        {isCardFlipped && (
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-fadeIn">
                            💡 {SAMPLE_CARDS[currentCardIndex].hint}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-4 border-t border-stone-200">
                        <button
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          className="text-xs font-semibold text-rose-700 hover:underline"
                        >
                          {isCardFlipped
                            ? "إخفاء الهدف من السؤال"
                            : "اعرف الهدف النفسي للسؤال"}
                        </button>

                        <button
                          onClick={nextSampleCard}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>اسحب كارت تاني</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-stone-400 mt-3 text-center">
                      👆 جرب تقليب الكروت! هذه عينة حقيقية من الأسئلة داخل
                      العلبة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* ================= صفحة مشغل الكورس المجاني (Course Player View) ================= */
        <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
          {/* زر العودة */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setActiveTab("home")}
              className="inline-flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-rose-700 transition"
            >
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span>العودة للصفحة الرئيسية</span>
            </button>

            <div className="text-xs font-semibold text-stone-500">
              نسبة إنجازك في الدورة:{" "}
              <span className="text-rose-700 font-bold">
                {Math.round(
                  (completedLessons.length / COURSES_DATA[0].lessons.length) *
                    100,
                )}
                %
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* مشغل الفيديو وتفاصيل الدرس (يمين) */}
            <div className="lg:col-span-8 space-y-6">
              {/* إطار فيديو يوتيوب */}
              <div className="aspect-video w-full bg-slate-950 rounded-3xl overflow-hidden shadow-lg border border-stone-200">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0`}
                  title={currentLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* عنوان الدرس وزر الإتمام */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-rose-700">
                      {COURSES_DATA[0].title}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                      {currentLesson.title}
                    </h1>
                  </div>

                  <button
                    onClick={() => toggleLessonComplete(currentLesson.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                      completedLessons.includes(currentLesson.id)
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {completedLessons.includes(currentLesson.id)
                        ? "تم مشاهدة الدرس"
                        : "تحديد كمكتمل"}
                    </span>
                  </button>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                  {currentLesson.description}
                </p>
              </div>

              {/* بانر ترويجي للكروت تحت الفيديو */}
              <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-5 rounded-2xl border border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-900">
                    💡 تطبيق عملي على هذا الدرس:
                  </div>
                  <p className="text-xs text-stone-600">
                    تطبيق الأسئلة الموجودة في "كروت الخطوبة" يساعدكما على تحويل
                    كلام الكورس إلى نقاش حقيقي ممتع.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOrderSubmitted(false);
                    setIsOrderModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shrink-0"
                >
                  اطلب الكروت الآن
                </button>
              </div>
            </div>

            {/* قائمة دروس الكورس (يسار) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-stone-200 p-5 sticky top-28 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <h3 className="font-extrabold text-slate-900">
                    محتوى الدورة
                  </h3>
                  <span className="text-xs text-stone-500">
                    {COURSES_DATA[0].lessons.length} دروس
                  </span>
                </div>

                <div className="space-y-2.5">
                  {COURSES_DATA[0].lessons.map((lesson) => {
                    const isCurrent = currentLesson.id === lesson.id;
                    const isDone = completedLessons.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                          isCurrent
                            ? "bg-rose-50/80 border-rose-300 text-rose-950 font-bold"
                            : "bg-white hover:bg-stone-50 border-stone-200/70 text-stone-700"
                        }`}
                      >
                        <div className="mt-0.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <PlayCircle
                              className={`w-4 h-4 ${isCurrent ? "text-rose-600" : "text-stone-400"}`}
                            />
                          )}
                        </div>
                        <div className="flex-1 text-xs leading-relaxed">
                          <div>{lesson.title}</div>
                          <div className="text-[11px] text-stone-400 mt-1">
                            {lesson.duration} دقيقة
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= نافذة طلب شراء الكروت (Order Modal) ================= */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-5 left-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>

            {!orderSubmitted ? (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-rose-700">
                    شحن لجميع المحافظات
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    طلب لعبة كروت الخطوبة
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      الاسم بالكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderForm.name}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, name: e.target.value })
                      }
                      placeholder="مثال: سارة أحمد"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        رقم الموبايل (واتساب) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={orderForm.phone}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, phone: e.target.value })
                        }
                        placeholder="010XXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        المحافظة *
                      </label>
                      <select
                        value={orderForm.governorate}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            governorate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:border-rose-600"
                      >
                        <option>القاهرة</option>
                        <option>الجيزة</option>
                        <option>الإسكندرية</option>
                        <option>الدقهلية</option>
                        <option>الشرقية</option>
                        <option>الغربية</option>
                        <option>محافظة أخرى</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      العنوان بالتفصيل *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderForm.address}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, address: e.target.value })
                      }
                      placeholder="المنطقة، اسم الشارع، رقم العقار، الدور..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        عدد النسخ
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={orderForm.quantity}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            quantity: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        طريقة الدفع
                      </label>
                      <select
                        value={orderForm.paymentMethod}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:border-rose-600"
                      >
                        <option value="cod">الدفع عند الاستلام</option>
                        <option value="instapay">InstaPay / فودافون كاش</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ملخص الحساب */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between text-stone-600">
                    <span>سعر الكروت ({orderForm.quantity} نسخة):</span>
                    <span>
                      {orderForm.quantity * SITE_CONFIG.cardPrice} ج.م
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>مصاريف الشحن:</span>
                    <span>{SITE_CONFIG.shippingCost} ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-stone-200">
                    <span>الإجمالي المطلوب:</span>
                    <span className="text-rose-700">
                      {orderForm.quantity * SITE_CONFIG.cardPrice +
                        SITE_CONFIG.shippingCost}{" "}
                      ج.م
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تأكيد الطلب عبر واتساب</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  تم تجهيز طلبك بنجاح!
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  تم فتح محادثة واتساب مع خدمة العملاء لتأكيد موعد التوصيل. إذا
                  لم تفتح النافذة تلقائياً، تواصلي معنا مباشرة.
                </p>
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  إغلاق النافذة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= التذييل (Footer) ================= */}
      <footer className="bg-white border-t border-stone-200 py-10 px-4 sm:px-6 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>أكاديمية {SITE_CONFIG.academyName} لبناء الأسرة</span>
          </div>
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} — صُمم بكل حب لبناء
            بيوت واعية
          </div>
        </div>
      </footer>
    </div>
  );
}
