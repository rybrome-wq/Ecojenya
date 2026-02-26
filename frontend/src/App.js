import React, { useState } from "react";
import "@/App.css";
import { 
  MessageCircle, Phone, PhoneCall, ArrowUpRight, Instagram, 
  Leaf, Truck, MapPin, Quote, Menu, X
} from "lucide-react";

// ==================== DATA ====================

const stats = [
  { id: "natural", value: "100%", label: "натуральное сырье" },
  { id: "price", value: "-20%", label: "ниже рынка" },
  { id: "gomel", value: "Гомель", label: "собственное производство" },
  { id: "delivery", value: "BY/World", label: "доставка по Беларуси и миру" },
];

const products = [
  {
    id: "oils",
    title: "Масла холодного отжима",
    tag: "Холодный отжим",
    description: "Кедровое, тыквенное, кунжутное. Без нагрева и химии — максимум омега‑3/6/9 и аминокислот.",
    image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-acaca95b-27bc-4a6b-9ae7-64a25cbafae8/web/275x275/ca0850db-338d-427b-91c3-240ad68d6959_%D1%82%D1%8B%D0%BA%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE%D0%B5-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp",
    colSpan: "md:col-span-2 md:row-span-2"
  },
  {
    id: "chocolate",
    title: "Шоколад handmade",
    tag: "Ручная работа",
    description: "Bean‑to‑bar из Гомеля. Теобромин, магний и железо для энергии и иммунитета.",
    image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-3a3dce50-8c91-41f6-9a3c-5efce67d3ec2/web/275x275/9607d001-b207-4327-a907-46e0bcde4b4b_025DA3F8-D7E6-4E24-9A75-E9F9AF9D6BD0-scaled.webp",
    colSpan: "md:col-span-2"
  },
  {
    id: "cheese",
    title: "Сыр из сырого молока",
    tag: "Сырое молоко",
    description: "Живой продукт без консервантов. Сбалансированный вкус и польза для микробиома.",
    image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-eb66f73c-9afa-418f-af61-c553541fcfe0/web/275x275/b9c4c57f-5cb1-4d78-b475-4b127bce3d96_%D0%93%D1%80%D1%8E%D0%B9%D0%B5%D1%80)-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp",
    colSpan: "md:col-span-2"
  },
  {
    id: "tea",
    title: "Чай и травяные сборы",
    tag: "Сборы",
    description: "Собственные миксы для тонуса, сна и мягкой детокс‑поддержки.",
    image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-74a6a23e-860c-4779-b286-083b0a70a013/web/275x275/74b1fc4c-4b8e-40e7-8a55-24422f803c84_D4165458-FC30-40E6-BB8E-12D0B9E58B38.webp",
    colSpan: "md:col-span-1"
  },
  {
    id: "urbec",
    title: "Урбеч и суперфуды",
    tag: "Энергия",
    description: "Паста из семян и орехов с плотной питательностью и насыщением.",
    image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-5efd6d8a-639e-455b-8929-06ec3708e219/web/275x275/1396eb55-9c4d-4238-8013-3847fcb18d57_54038B96-03EA-4E83-A2C6-1A4115301454-scaled.webp",
    colSpan: "md:col-span-1"
  },
];

const catalogItems = [
  { id: "sunflower-oil-250", name: "Подсолнечное масло", category: "Масла", format: "250 мл", price: "8 BYN", image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-5eec7e20-9fca-4b89-b410-a15ee8fd2ccd/web/275x275/0f575c2e-57d4-4a34-a856-424317e77812_%D0%9F%D0%BE%D0%B4%D1%81%D0%BE%D0%BB%D0%BD%D0%B5%D1%87%D0%BD%D0%BE%D0%B5-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp" },
  { id: "pumpkin-oil-250", name: "Тыквенное масло", category: "Масла", format: "250 мл", price: "14 BYN", image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-acaca95b-27bc-4a6b-9ae7-64a25cbafae8/web/275x275/ca0850db-338d-427b-91c3-240ad68d6959_%D1%82%D1%8B%D0%BA%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE%D0%B5-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp" },
  { id: "cedar-oil-100", name: "Кедровое масло", category: "Масла", format: "100 мл", price: "18 BYN", image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-b826149a-204e-4f00-a590-04d98f27304c/web/275x275/6020a406-6e19-4b87-9134-7217d00c4ca4_%D0%9A%D0%B5%D0%B4%D1%80%D0%BE%D0%B2%D0%BE%D0%B5%201-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp" },
  { id: "sesame-oil-250", name: "Кунжутное масло", category: "Масла", format: "250 мл", price: "12 BYN", image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-7f82c88a-fc03-4cf2-a965-83cfa1dde3f7/web/275x275/d8766b28-2e3b-462e-b67e-3cde5b0b4906_%D0%9A%D1%83%D0%BD%D0%B6%D1%83%D1%82%D0%BD%D0%BE%D0%B5-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp" },
  { id: "chocolate-dark", name: "Горький шоколад 70%", category: "Шоколад", format: "100 г", price: "10 BYN", image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-3a3dce50-8c91-41f6-9a3c-5efce67d3ec2/web/275x275/9607d001-b207-4327-a907-46e0bcde4b4b_025DA3F8-D7E6-4E24-9A75-E9F9AF9D6BD0-scaled.webp" },
  { id: "cheese-gruyere", name: "Сыр Грюйер", category: "Сыр", format: "300 г", price: "35 BYN", image: "https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-eb66f73c-9afa-418f-af61-c553541fcfe0/web/275x275/b9c4c57f-5cb1-4d78-b475-4b127bce3d96_%D0%93%D1%80%D1%8E%D0%B9%D0%B5%D1%80)-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp" },
];

const processSteps = [
  { id: "step-1", num: "1", title: "Отбор сырья", description: "Работаем только с проверенными поставщиками и локальными фермерами." },
  { id: "step-2", num: "2", title: "Холодный пресс", description: "Отжим при низкой температуре сохраняет омега‑3/6/9 и аминокислоты." },
  { id: "step-3", num: "3", title: "Ручная обработка", description: "Шоколад и сыр — ручная работа с сохранением живых культур и вкуса." },
  { id: "step-4", num: "4", title: "Свежесть под заказ", description: "Производим небольшими партиями и сразу отправляем клиентам." },
];

const testimonials = [
  { id: "vitaly", name: "Виталий, Минск", text: "Кедровое масло — лучшее, что пробовал. Чистая энергия и отличный вкус." },
  { id: "oksana", name: "Оксана, Гомель", text: "Шоколад без сахара — мой фаворит. Чувствую, что продукт живой и настоящий." },
  { id: "irina", name: "Ирина, Варшава", text: "Доставка пришла быстро, сыр свежайший. Спасибо за заботу и качество!" },
];

const instagramShots = [
  { id: "insta-1", src: "https://images.pexels.com/photos/9814620/pexels-photo-9814620.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: "insta-2", src: "https://images.pexels.com/photos/18908652/pexels-photo-18908652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: "insta-3", src: "https://images.pexels.com/photos/2877311/pexels-photo-2877311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
];

const faqs = [
  { id: "faq-1", question: "Как хранить масла холодного отжима?", answer: "В тёмном прохладном месте. После открытия — в холодильнике до 2 месяцев." },
  { id: "faq-2", question: "Есть ли доставка по миру?", answer: "Да, отправляем в ЕС и СНГ. Подберём оптимальный способ доставки." },
  { id: "faq-3", question: "Можно ли собрать набор под себя?", answer: "Конечно! Напишите в Telegram, и мы соберём персональный набор." },
];

const navLinks = [
  { href: "#products", label: "Продукты" },
  { href: "#catalog", label: "Каталог" },
  { href: "#process", label: "Процесс" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

// ==================== COMPONENTS ====================

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" data-testid="header">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3" data-testid="logo">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-display text-xl font-semibold text-foreground">EcoJenya</span>
              <p className="text-xs text-muted">Натуральная сила из Гомеля</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://t.me/rybrome"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              data-testid="header-telegram"
            >
              <MessageCircle className="w-4 h-4" />
              Написать
            </a>
            <a
              href="tel:+375445502011"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-light transition-colors"
              data-testid="header-phone"
            >
              <Phone className="w-4 h-4" />
              +375 44 550 20 11
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pt-4 pb-2 border-t border-border mt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="https://t.me/rybrome"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                <MessageCircle className="w-4 h-4" />
                Написать в Telegram
              </a>
              <a
                href="tel:+375445502011"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-medium text-primary"
              >
                <Phone className="w-4 h-4" />
                Позвонить
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

const HeroSection = () => (
  <section id="hero" className="relative overflow-hidden" data-testid="hero-section">
    {/* Ambient shapes */}
    <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
    <div className="absolute bottom-10 left-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

    <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Copy */}
        <div className="lg:col-span-6" data-testid="hero-copy">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary" data-testid="hero-badge">
            Натурально • Handmade • Без консервантов
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-tight mt-6" data-testid="hero-title">
            Живая сила природы в каждой капле.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted font-body" data-testid="hero-subtitle">
            Масла холодного отжима, сыр из сырого молока и шоколад ручной работы из Гомеля. Без нагрева и химии — только энергия природы.
          </p>

          {/* CTA Group */}
          <div className="mt-8 flex flex-wrap items-center gap-4" data-testid="hero-cta-group">
            <a
              href="https://t.me/rybrome"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary-light transition"
              data-testid="hero-telegram-button"
            >
              <MessageCircle className="h-5 w-5" />
              Написать в Telegram
            </a>
            <a
              href="tel:+375445502011"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-4 text-base font-medium text-primary hover:bg-primary hover:text-primary-foreground transition"
              data-testid="hero-call-button"
            >
              <PhoneCall className="h-5 w-5" />
              Позвонить
            </a>
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 text-primary underline decoration-accent underline-offset-4 hover:text-accent"
              data-testid="hero-catalog-link"
            >
              Смотреть мини-каталог
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="hero-stats">
            {stats.map((stat) => (
              <div key={stat.id} className="rounded-2xl border border-border bg-white/60 p-4" data-testid={`hero-stat-${stat.id}`}>
                <p className="text-2xl font-display text-primary">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-6" data-testid="hero-visual">
          <div className="relative">
            <img
              src="https://mofmarket.by/s3/mof-bucket/media/sellers/seller-7af83eef-37ce-450c-ba64-16f4a72b5394/advs/adv-b826149a-204e-4f00-a590-04d98f27304c/web/275x275/6020a406-6e19-4b87-9134-7217d00c4ca4_%D0%9A%D0%B5%D0%B4%D1%80%D0%BE%D0%B2%D0%BE%D0%B5%201-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp"
              alt="Натуральные масла EcoJenya"
              className="h-[520px] w-full rounded-[32px] object-cover shadow-2xl"
              data-testid="hero-image"
            />
            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-card p-6 shadow-xl" data-testid="hero-highlight">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Локальное производство</p>
              <p className="mt-2 font-display text-xl">Свежесть под заказ</p>
              <p className="mt-1 text-sm text-muted">Производим малыми партиями без складских остатков.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SectionHeading = ({ eyebrow, title, subtitle, testIdPrefix }) => (
  <div className="max-w-2xl" data-testid={`${testIdPrefix}-heading-wrapper`}>
    {eyebrow && (
      <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium" data-testid={`${testIdPrefix}-heading-eyebrow`}>
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4" data-testid={`${testIdPrefix}-heading-title`}>
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-lg text-muted font-body" data-testid={`${testIdPrefix}-heading-subtitle`}>
        {subtitle}
      </p>
    )}
  </div>
);

const ProductsSection = () => (
  <section id="products" className="py-24 md:py-32" data-testid="products-section">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Ассортимент"
        title="Создано природой, усилено руками"
        subtitle="Линейка EcoJenya — это чистые продукты, в которых слышно природу и заботу."
        testIdPrefix="products"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 auto-rows-[260px] gap-6" data-testid="products-bento-grid">
        {products.map((product) => (
          <article
            key={product.id}
            className={`group relative overflow-hidden rounded-3xl border border-border bg-white/80 p-6 ${product.colSpan}`}
            data-testid={`product-card-${product.id}`}
          >
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/55" />
            <div className="relative flex h-full flex-col justify-end">
              <span className="inline-flex w-fit items-center rounded-full bg-accent px-4 py-1 text-xs uppercase tracking-[0.2em] text-foreground">
                {product.tag}
              </span>
              <h3 className="mt-4 font-display text-2xl text-primary-foreground">{product.title}</h3>
              <p className="mt-2 text-sm text-card">{product.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const CatalogSection = () => (
  <section id="catalog" className="py-24 md:py-32" data-testid="catalog-section">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Мини-каталог"
        title="Актуальные позиции и цены"
        subtitle="Выберите продукт и оформите быстрый заказ прямо на странице."
        testIdPrefix="catalog"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10" data-testid="catalog-layout">
        {/* Product Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" data-testid="catalog-grid">
          {catalogItems.map((item) => (
            <article key={item.id} className="rounded-3xl border border-border bg-white/80 p-5" data-testid={`catalog-card-${item.id}`}>
              <div className="overflow-hidden rounded-2xl">
                <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.category}</p>
                  <h3 className="mt-2 font-display text-lg">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted">Формат: {item.format}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-primary">{item.price}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Order Card */}
        <div className="lg:col-span-5" data-testid="catalog-order-card">
          <div className="sticky top-28 rounded-[32px] bg-primary p-8 text-primary-foreground shadow-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Быстрый заказ</p>
            <h3 className="mt-4 font-display text-3xl">Оформить заказ</h3>
            <p className="mt-3 text-sm text-card/80">
              Напишите в Telegram или позвоните — мы подберём продукты под ваши цели и организуем доставку.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <a
                href="https://t.me/rybrome"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-full bg-primary-foreground px-7 py-4 text-base font-medium text-primary"
                data-testid="catalog-telegram-button"
              >
                Написать в Telegram
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="tel:+375445502011"
                className="inline-flex items-center justify-between rounded-full border-2 border-primary-foreground px-7 py-4 text-base font-medium text-primary-foreground"
                data-testid="catalog-call-button"
              >
                Позвонить +375 44 550 20 11
                <PhoneCall className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6 rounded-2xl bg-primary-light p-5">
              <p className="text-sm text-card/90">
                Минимальный заказ: 30 BYN. Доставка по Гомелю — бесплатно от 50 BYN.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section id="process" className="py-24 md:py-32 bg-card" data-testid="process-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <SectionHeading
            eyebrow="Преимущества"
            title="Почему продукты EcoJenya — это другой уровень"
            subtitle="Мы контролируем каждый этап: от выбора сырья до упаковки."
            testIdPrefix="process"
          />
          <div className="mt-8">
            <img
              src="https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Процесс производства"
              className="rounded-3xl shadow-lg"
            />
          </div>
        </div>

        <div>
          <ol className="space-y-4" data-testid="process-steps">
            {processSteps.map((step) => (
              <li key={step.id} className="flex gap-5 rounded-3xl border border-border bg-white/70 p-6" data-testid={`process-step-${step.id}`}>
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center font-display text-lg text-primary">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

const DeliverySection = () => (
  <section id="delivery" className="py-24 md:py-32 bg-card" data-testid="delivery-section">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Доставка и цена"
        title="Свежесть под заказ, цены на 20% ниже рынка"
        subtitle="Собственное производство в Гомеле даёт нам честную цену и контроль качества."
        testIdPrefix="delivery"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="delivery-grid">
        <div className="rounded-3xl border border-border bg-white/70 p-7" data-testid="delivery-card-pricing">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Цена</p>
          <h3 className="mt-4 font-display text-3xl">На 20% ниже рынка</h3>
          <p className="mt-3 text-sm text-muted">Прямое производство без посредников — вы получаете честную стоимость и свежий продукт.</p>
        </div>

        <div className="rounded-3xl border border-border bg-white/70 p-7" data-testid="delivery-card-logistics">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Доставка</p>
          <h3 className="mt-4 font-display text-3xl">Беларусь и мир</h3>
          <p className="mt-3 text-sm text-muted">Мы подбираем оптимальный способ отправки и сохраняем продукт свежим в пути.</p>
          <div className="mt-6 flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted">Отправка в течение 24–48 часов</span>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-primary p-7 text-primary-foreground" data-testid="delivery-card-location">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Производство</p>
          <h3 className="mt-4 font-display text-3xl">Гомель, Беларусь</h3>
          <p className="mt-3 text-sm text-card">Небольшая мастерская, где каждую партию доводим до совершенства.</p>
          <div className="mt-6 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="text-sm">Доставка по предзаказу</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ReviewsSection = () => (
  <section id="reviews" className="py-24 md:py-32" data-testid="reviews-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <SectionHeading
          eyebrow="Социальное доказательство"
          title="Нас выбирают семьи и веганы"
          subtitle="Отзывы клиентов и живой контент из Instagram подтверждают качество."
          testIdPrefix="reviews"
        />
        <a
          href="https://www.instagram.com/ecojenya/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-primary underline decoration-accent underline-offset-4 hover:text-accent"
          data-testid="reviews-instagram-link"
        >
          <Instagram className="h-5 w-5" />
          Смотреть Instagram
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-6" data-testid="reviews-grid">
        {/* Instagram shots */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {instagramShots.map((shot) => (
            <div key={shot.id} className="overflow-hidden rounded-2xl" data-testid={`instagram-shot-${shot.id}`}>
              <img src={shot.src} alt="Instagram EcoJenya" className="h-44 w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="lg:col-span-2 space-y-4" data-testid="reviews-testimonials">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-3xl border border-border bg-white/70 p-6" data-testid={`testimonial-card-${testimonial.id}`}>
              <Quote className="h-6 w-6 text-accent" />
              <p className="mt-4 text-sm text-muted">{testimonial.text}</p>
              <p className="mt-4 font-display text-base">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section id="faq" className="py-24 md:py-32 bg-card" data-testid="faq-section">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="FAQ"
        title="Частые вопросы"
        subtitle="Собрали ответы, чтобы вам было легко принять решение."
        testIdPrefix="faq"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="faq-grid">
        {faqs.map((item) => (
          <div key={item.id} className="rounded-3xl border border-border bg-white/70 p-6" data-testid={`faq-card-${item.id}`}>
            <h3 className="font-display text-lg">{item.question}</h3>
            <p className="mt-3 text-sm text-muted">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactsSection = () => (
  <section id="contacts" className="py-24 md:py-32" data-testid="contacts-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="rounded-[32px] bg-primary p-10 md:p-14 text-primary-foreground shadow-2xl" data-testid="contacts-card">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div data-testid="contacts-copy">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Свяжитесь с нами</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Подберём набор под ваши цели</h2>
            <p className="mt-4 text-base text-card">Напишите в Telegram или позвоните — расскажем о продуктах и организуем доставку.</p>
          </div>

          <div className="flex flex-col gap-4" data-testid="contacts-actions">
            <a
              href="https://t.me/rybrome"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-full bg-primary-foreground px-7 py-4 text-base font-medium text-primary"
              data-testid="contacts-telegram-button"
            >
              Написать в Telegram
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="tel:+375445502011"
              className="inline-flex items-center justify-between rounded-full border-2 border-primary-foreground px-7 py-4 text-base font-medium text-primary-foreground"
              data-testid="contacts-call-button"
            >
              Позвонить +375 44 550 20 11
              <PhoneCall className="h-5 w-5" />
            </a>
            <div className="rounded-3xl bg-primary-light p-6" data-testid="contacts-note">
              <p className="text-sm text-card">Мы отвечаем ежедневно и помогаем подобрать продукт под цели: энергия, иммунитет, сон, восстановление.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-border" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div>
            <span className="font-display text-xl font-semibold text-foreground">EcoJenya</span>
            <p className="text-xs text-muted">Натуральная сила из Гомеля</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/ecojenya/"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-primary transition-colors"
            data-testid="footer-instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://t.me/rybrome"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-primary transition-colors"
            data-testid="footer-telegram"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a
            href="tel:+375445502011"
            className="text-muted hover:text-primary transition-colors"
            data-testid="footer-phone"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <p className="text-sm text-muted">© 2025 EcoJenya. Гомель, Беларусь</p>
      </div>
    </div>
  </footer>
);

// ==================== APP ====================

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="app-root">
      <Header />
      <main data-testid="main-content">
        <HeroSection />
        <ProductsSection />
        <CatalogSection />
        <ProcessSection />
        <DeliverySection />
        <ReviewsSection />
        <FAQSection />
        <ContactsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
