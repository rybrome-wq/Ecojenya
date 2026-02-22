import React, { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  Phone, MessageCircle, Mail, MapPin, Star, Leaf, Heart, 
  Shield, ChevronRight, Instagram, Menu, X, Send, 
  ArrowRight, Package, Users, Award, ShoppingBag,
  Plus, Trash2, Edit, Check, LogOut
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ==================== LAYOUT ====================

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/catalog", label: "Каталог" },
    { to: "/reviews", label: "Отзывы" },
    { to: "/about", label: "О нас" },
    { to: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <Leaf className="w-8 h-8 text-secondary" strokeWidth={1.5} />
            <span className="font-display text-2xl font-bold text-primary">EcoJenya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-foreground hover:text-accent transition-colors hover:underline decoration-2 underline-offset-4 ${
                  location.pathname === link.to ? "text-accent underline" : ""
                }`}
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://instagram.com/ecojenya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
              data-testid="header-instagram"
            >
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="tel:+375291234567"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 py-2 font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
              data-testid="header-phone-btn"
            >
              Позвонить
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-3 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid={`mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+375291234567"
              className="block mt-4 bg-accent text-accent-foreground text-center rounded-full px-6 py-3 font-medium"
            >
              Позвонить
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-accent" strokeWidth={1.5} />
              <span className="font-display text-2xl font-bold">EcoJenya</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Натуральные эко-продукты ручной работы из Гомеля. 
              Масла холодного отжима, мёд, травяные чаи, шоколад и сыр.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/ecojenya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
                data-testid="footer-instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://t.me/ecojenya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
                data-testid="footer-telegram"
              >
                <Send className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/catalog?category=oils" className="hover:text-accent transition-colors">Растительные масла</Link></li>
              <li><Link to="/catalog?category=honey" className="hover:text-accent transition-colors">Мёд</Link></li>
              <li><Link to="/catalog?category=tea" className="hover:text-accent transition-colors">Травяные чаи</Link></li>
              <li><Link to="/catalog?category=chocolate" className="hover:text-accent transition-colors">Шоколад</Link></li>
              <li><Link to="/catalog?category=cheese" className="hover:text-accent transition-colors">Сыр</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+375291234567" className="hover:text-accent transition-colors">+375 29 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:info@ecojenya.by" className="hover:text-accent transition-colors">info@ecojenya.by</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>г. Гомель, Беларусь</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60">
          <p>© 2025 EcoJenya. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

// ==================== HOME PAGE ====================

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/5946083/pexels-photo-5946083.jpeg?auto=compress&cs=tinysrgb&w=1260"
          alt="Натуральные продукты"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm tracking-wide uppercase text-secondary mb-4 animate-fade-in">
            Из Гомеля с любовью
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-none text-primary mb-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
            Натуральные эко-продукты
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Растительные масла холодного отжима, алтайский мёд, травяные чаи, 
            шоколад и сыр ручной работы. Без консервантов, для вашего здоровья.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Link
              to="/catalog"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-accent/20 flex items-center gap-2"
              data-testid="hero-catalog-btn"
            >
              Смотреть каталог
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/375291234567"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-3 font-medium transition-colors flex items-center gap-2"
              data-testid="hero-whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4" />
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: Leaf, title: "100% натуральное", desc: "Без консервантов и добавок" },
    { icon: Heart, title: "Ручная работа", desc: "Каждый продукт с душой" },
    { icon: Shield, title: "Для здоровья", desc: "Профилактика заболеваний" },
    { icon: Package, title: "Доставка", desc: "По всему миру" },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <f.icon className="w-8 h-8 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoriesSection = ({ categories }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm tracking-wide uppercase text-secondary mb-2">Наш ассортимент</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">Категории товаров</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.slug}`}
              className="group bg-white/50 backdrop-blur-sm border border-border hover:border-accent/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
              data-testid={`category-${cat.slug}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{cat.description}</p>
                <span className="text-accent font-medium flex items-center gap-1 text-sm">
                  Смотреть товары
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProductsSection = ({ products }) => {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm tracking-wide uppercase text-secondary mb-2">Популярное</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">Хиты продаж</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter(p => p.featured).slice(0, 6).map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/catalog"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-3 font-medium transition-colors inline-flex items-center gap-2"
            data-testid="view-all-products-btn"
          >
            Все товары
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const InstagramSection = ({ posts }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm tracking-wide uppercase text-secondary mb-2">Мы в соцсетях</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-4">@ecojenya</h2>
          <a
            href="https://instagram.com/ecojenya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline"
            data-testid="instagram-follow-link"
          >
            <Instagram className="w-5 h-5" />
            Подписаться на Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group aspect-square rounded-xl overflow-hidden animate-fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
              data-testid={`instagram-post-${idx}`}
            >
              <img
                src={post.image_url}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
          Готовы попробовать натуральное?
        </h2>
        <p className="text-secondary-foreground/80 mb-8 text-lg">
          Свяжитесь с нами любым удобным способом и мы поможем подобрать продукты для вашего здоровья
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:+375291234567"
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 font-medium transition-transform hover:scale-105 flex items-center gap-2"
            data-testid="cta-phone-btn"
          >
            <Phone className="w-4 h-4" />
            +375 29 123-45-67
          </a>
          <a
            href="https://wa.me/375291234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 rounded-full px-8 py-3 font-medium transition-colors flex items-center gap-2"
            data-testid="cta-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href="https://t.me/ecojenya"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 rounded-full px-8 py-3 font-medium transition-colors flex items-center gap-2"
            data-testid="cta-telegram-btn"
          >
            <Send className="w-4 h-4" />
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes, igRes] = await Promise.all([
          axios.get(`${API}/categories`),
          axios.get(`${API}/products?featured=true`),
          axios.get(`${API}/instagram/feed?limit=6`),
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
        setInstagramPosts(igRes.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection products={products} />
      <InstagramSection posts={instagramPosts} />
      <CTASection />
    </Layout>
  );
};

// ==================== PRODUCT CARD ====================

const ProductCard = ({ product, index = 0 }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white/50 backdrop-blur-sm border border-border hover:border-accent/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      data-testid={`product-card-${product.slug}`}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
            Хит
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-primary mb-1 group-hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{product.price} BYN</span>
          <span className="text-sm text-muted-foreground">/ {product.unit}</span>
        </div>
      </div>
    </Link>
  );
};

// ==================== CATALOG PAGE ====================

const CatalogPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    setSelectedCategory(cat);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API}/categories`),
          axios.get(`${API}/products`),
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => {
        const cat = categories.find(c => c.slug === selectedCategory);
        return cat && p.category_id === cat.id;
      })
    : products;

  const selectedCategoryData = categories.find(c => c.slug === selectedCategory);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20" data-testid="catalog-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              {selectedCategoryData ? selectedCategoryData.name : "Каталог товаров"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {selectedCategoryData 
                ? selectedCategoryData.description 
                : "Натуральные эко-продукты ручной работы. Выберите категорию или просмотрите все товары."}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link
              to="/catalog"
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                !selectedCategory 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-accent/20"
              }`}
              data-testid="filter-all"
            >
              Все товары
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/catalog?category=${cat.slug}`}
                className={`px-5 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === cat.slug 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-accent/20"
                }`}
                data-testid={`filter-${cat.slug}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">В этой категории пока нет товаров</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// ==================== PRODUCT PAGE ====================

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${slug}`);
        setProduct(res.data);
        if (res.data.category_id) {
          const categories = await axios.get(`${API}/categories`);
          const cat = categories.data.find(c => c.id === res.data.category_id);
          setCategory(cat);
        }
      } catch (e) {
        console.error("Error fetching product:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Товар не найден</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20" data-testid="product-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-accent">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/catalog" className="hover:text-accent">Каталог</Link>
            {category && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link to={`/catalog?category=${category.slug}`} className="hover:text-accent">{category.name}</Link>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-accent">{product.price} BYN</span>
                <span className="text-muted-foreground">/ {product.unit}</span>
              </div>

              <p className="text-foreground/80 mb-8 leading-relaxed">
                {product.description}
              </p>

              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display text-lg font-semibold text-primary mb-4">Преимущества</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-card rounded-2xl p-6 mb-8">
                <h3 className="font-display text-lg font-semibold text-primary mb-4">Заказать</h3>
                <p className="text-muted-foreground mb-4">
                  Свяжитесь с нами любым удобным способом для оформления заказа
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+375291234567"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 py-3 font-medium transition-colors flex items-center gap-2"
                    data-testid="product-phone-btn"
                  >
                    <Phone className="w-4 h-4" />
                    Позвонить
                  </a>
                  <a
                    href="https://wa.me/375291234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 py-3 font-medium transition-colors flex items-center gap-2"
                    data-testid="product-whatsapp-btn"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href="https://t.me/ecojenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 py-3 font-medium transition-colors flex items-center gap-2"
                    data-testid="product-telegram-btn"
                  >
                    <Send className="w-4 h-4" />
                    Telegram
                  </a>
                </div>
              </div>

              {product.in_stock ? (
                <p className="text-secondary flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  В наличии
                </p>
              ) : (
                <p className="text-destructive flex items-center gap-2">
                  <X className="w-5 h-5" />
                  Нет в наличии
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// ==================== REVIEWS PAGE ====================

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ author_name: "", author_city: "", rating: 5, text: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API}/reviews`);
      setReviews(res.data);
    } catch (e) {
      console.error("Error fetching reviews:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/reviews`, formData);
      setSubmitted(true);
      setFormData({ author_name: "", author_city: "", rating: 5, text: "" });
    } catch (e) {
      console.error("Error submitting review:", e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20" data-testid="reviews-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Отзывы покупателей
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Что говорят наши клиенты о продуктах EcoJenya
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((review, idx) => (
              <div
                key={review.id}
                className="bg-card p-6 rounded-2xl border border-border animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
                data-testid={`review-${idx}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "text-accent fill-accent" : "text-border"}`}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{review.author_name}</p>
                    {review.author_city && (
                      <p className="text-sm text-muted-foreground">{review.author_city}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Review Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-3xl p-8 border border-border">
              <h2 className="font-display text-2xl font-semibold text-primary mb-6 text-center">
                Оставить отзыв
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <Award className="w-16 h-16 mx-auto text-secondary mb-4" />
                  <p className="text-lg font-semibold text-primary mb-2">Спасибо за отзыв!</p>
                  <p className="text-muted-foreground">Ваш отзыв будет опубликован после модерации</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Ваше имя *</label>
                      <input
                        type="text"
                        required
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        className="w-full bg-white/60 border border-input focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors"
                        placeholder="Введите имя"
                        data-testid="review-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Город</label>
                      <input
                        type="text"
                        value={formData.author_city}
                        onChange={(e) => setFormData({ ...formData, author_city: e.target.value })}
                        className="w-full bg-white/60 border border-input focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors"
                        placeholder="Ваш город"
                        data-testid="review-city-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Оценка</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: num })}
                          className="focus:outline-none"
                          data-testid={`review-star-${num}`}
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              num <= formData.rating ? "text-accent fill-accent" : "text-border hover:text-accent/50"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ваш отзыв *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      className="w-full bg-white/60 border border-input focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors resize-none"
                      placeholder="Расскажите о своём опыте..."
                      data-testid="review-text-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="review-submit-btn"
                  >
                    {submitting ? "Отправка..." : "Отправить отзыв"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// ==================== ABOUT PAGE ====================

const AboutPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20" data-testid="about-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              О компании EcoJenya
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Натуральные продукты ручной работы из Гомеля, Беларусь
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Производство EcoJenya"
                className="rounded-3xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-6">
                Наша история
              </h2>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                EcoJenya — это семейный бизнес, основанный энтузиастом здорового образа жизни 
                из Гомеля, Беларусь. Мы верим, что натуральные продукты — это основа здоровья 
                и профилактики заболеваний.
              </p>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Каждый наш продукт создаётся вручную, с заботой о качестве и пользе для здоровья. 
                Мы используем только натуральные ингредиенты без консервантов и химических добавок.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Наш ассортимент включает растительные масла холодного отжима из семян и орехов, 
                алтайский мёд, травяные чаи ручного сбора, сухофрукты, орехи, натуральную халву, 
                а также шоколад и сыр из сырого молока.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
              Наши принципы
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">Натуральность</h3>
                <p className="text-muted-foreground">
                  Только натуральные ингредиенты без консервантов и химических добавок
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">Ручная работа</h3>
                <p className="text-muted-foreground">
                  Каждый продукт создаётся вручную с заботой и вниманием к деталям
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">Для здоровья</h3>
                <p className="text-muted-foreground">
                  Продукты для укрепления иммунитета и профилактики заболеваний
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-primary mb-6">
              Свяжитесь с нами
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Будем рады ответить на ваши вопросы и помочь подобрать продукты для вашего здоровья
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+375291234567"
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 font-medium transition-colors flex items-center gap-2"
                data-testid="about-phone-btn"
              >
                <Phone className="w-4 h-4" />
                +375 29 123-45-67
              </a>
              <a
                href="https://wa.me/375291234567"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-3 font-medium transition-colors flex items-center gap-2"
                data-testid="about-whatsapp-btn"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// ==================== CONTACTS PAGE ====================

const ContactsPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20" data-testid="contacts-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Контакты
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a
                href="tel:+375291234567"
                className="bg-card p-8 rounded-2xl border border-border hover:border-accent/50 transition-colors group"
                data-testid="contact-phone"
              >
                <div className="w-14 h-14 mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">Телефон</h3>
                <p className="text-accent text-lg font-medium">+375 29 123-45-67</p>
                <p className="text-muted-foreground text-sm mt-2">Звоните с 9:00 до 20:00</p>
              </a>

              <a
                href="https://wa.me/375291234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card p-8 rounded-2xl border border-border hover:border-accent/50 transition-colors group"
                data-testid="contact-whatsapp"
              >
                <div className="w-14 h-14 mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MessageCircle className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">WhatsApp</h3>
                <p className="text-accent text-lg font-medium">+375 29 123-45-67</p>
                <p className="text-muted-foreground text-sm mt-2">Отвечаем быстро</p>
              </a>

              <a
                href="https://t.me/ecojenya"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card p-8 rounded-2xl border border-border hover:border-accent/50 transition-colors group"
                data-testid="contact-telegram"
              >
                <div className="w-14 h-14 mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Send className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">Telegram</h3>
                <p className="text-accent text-lg font-medium">@ecojenya</p>
                <p className="text-muted-foreground text-sm mt-2">Для быстрой связи</p>
              </a>

              <a
                href="https://instagram.com/ecojenya"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card p-8 rounded-2xl border border-border hover:border-accent/50 transition-colors group"
                data-testid="contact-instagram"
              >
                <div className="w-14 h-14 mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Instagram className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">Instagram</h3>
                <p className="text-accent text-lg font-medium">@ecojenya</p>
                <p className="text-muted-foreground text-sm mt-2">Новости и акции</p>
              </a>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-secondary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-primary mb-2">Адрес</h3>
                  <p className="text-foreground text-lg">г. Гомель, Беларусь</p>
                  <p className="text-muted-foreground mt-2">
                    Работаем по всей Беларуси и осуществляем доставку по миру
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-secondary/10 rounded-3xl p-8 text-center">
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Как сделать заказ?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Выберите товары</h4>
                    <p className="text-muted-foreground text-sm">Изучите каталог и выберите понравившиеся продукты</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Свяжитесь с нами</h4>
                    <p className="text-muted-foreground text-sm">Позвоните или напишите в мессенджер</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Получите заказ</h4>
                    <p className="text-muted-foreground text-sm">Доставка по Беларуси и всему миру</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// ==================== ADMIN PAGE ====================

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("ecojenya_admin");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [prodRes, revRes, catRes] = await Promise.all([
        axios.get(`${API}/products`),
        axios.get(`${API}/reviews?approved_only=false`),
        axios.get(`${API}/categories`),
      ]);
      setProducts(prodRes.data);
      setReviews(revRes.data);
      setCategories(catRes.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("ecojenya_admin", "true");
    } else {
      alert("Неверный пароль");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ecojenya_admin");
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Удалить товар?")) return;
    try {
      await axios.delete(`${API}/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (e) {
      console.error("Error deleting product:", e);
    }
  };

  const handleApproveReview = async (id) => {
    try {
      await axios.put(`${API}/reviews/${id}/approve`);
      setReviews(reviews.map(r => r.id === id ? { ...r, approved: true } : r));
    } catch (e) {
      console.error("Error approving review:", e);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Удалить отзыв?")) return;
    try {
      await axios.delete(`${API}/reviews/${id}`);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (e) {
      console.error("Error deleting review:", e);
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct && editingProduct.id) {
        await axios.put(`${API}/products/${editingProduct.id}`, productData);
      } else {
        await axios.post(`${API}/products`, productData);
      }
      fetchData();
      setEditingProduct(null);
    } catch (e) {
      console.error("Error saving product:", e);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-20" data-testid="admin-login">
          <div className="bg-card p-8 rounded-2xl border border-border max-w-md w-full">
            <h1 className="font-display text-2xl font-bold text-primary mb-6 text-center">
              Вход в админ-панель
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/60 border border-input focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3 text-foreground outline-none"
                  placeholder="Введите пароль"
                  data-testid="admin-password-input"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 font-medium transition-colors"
                data-testid="admin-login-btn"
              >
                Войти
              </button>
            </form>
            <p className="text-muted-foreground text-sm mt-4 text-center">
              Пароль по умолчанию: admin123
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 md:py-12" data-testid="admin-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl font-bold text-primary">Админ-панель</h1>
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2"
              data-testid="admin-logout-btn"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "products" 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-accent/20"
              }`}
              data-testid="admin-tab-products"
            >
              <ShoppingBag className="w-4 h-4 inline mr-2" />
              Товары ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "reviews" 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-accent/20"
              }`}
              data-testid="admin-tab-reviews"
            >
              <Star className="w-4 h-4 inline mr-2" />
              Отзывы ({reviews.filter(r => !r.approved).length} новых)
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setEditingProduct({})}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 py-2 font-medium transition-colors flex items-center gap-2"
                  data-testid="admin-add-product-btn"
                >
                  <Plus className="w-4 h-4" />
                  Добавить товар
                </button>
              </div>

              {editingProduct !== null && (
                <ProductForm
                  product={editingProduct}
                  categories={categories}
                  onSave={handleSaveProduct}
                  onCancel={() => setEditingProduct(null)}
                />
              )}

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-medium text-primary">Товар</th>
                      <th className="text-left p-4 font-medium text-primary">Категория</th>
                      <th className="text-left p-4 font-medium text-primary">Цена</th>
                      <th className="text-left p-4 font-medium text-primary">Статус</th>
                      <th className="text-right p-4 font-medium text-primary">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      const cat = categories.find(c => c.id === product.category_id);
                      return (
                        <tr key={product.id} className="border-t border-border" data-testid={`admin-product-${product.id}`}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <span className="font-medium text-primary">{product.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">{cat?.name || "—"}</td>
                          <td className="p-4 font-medium text-primary">{product.price} BYN</td>
                          <td className="p-4">
                            {product.in_stock ? (
                              <span className="text-secondary">В наличии</span>
                            ) : (
                              <span className="text-destructive">Нет</span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="text-muted-foreground hover:text-accent transition-colors mr-3"
                              data-testid={`admin-edit-${product.id}`}
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              data-testid={`admin-delete-${product.id}`}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`bg-card p-6 rounded-2xl border ${review.approved ? "border-border" : "border-accent"}`}
                  data-testid={`admin-review-${review.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-primary">{review.author_name}</span>
                        {review.author_city && (
                          <span className="text-muted-foreground text-sm">({review.author_city})</span>
                        )}
                        {!review.approved && (
                          <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">Новый</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-accent fill-accent" : "text-border"}`}
                          />
                        ))}
                      </div>
                      <p className="text-foreground">{review.text}</p>
                    </div>
                    <div className="flex gap-2">
                      {!review.approved && (
                        <button
                          onClick={() => handleApproveReview(review.id)}
                          className="text-secondary hover:text-secondary/80 transition-colors"
                          data-testid={`admin-approve-${review.id}`}
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        data-testid={`admin-delete-review-${review.id}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Product Form Component
const ProductForm = ({ product, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product.name || "",
    slug: product.slug || "",
    description: product.description || "",
    price: product.price || 0,
    unit: product.unit || "шт",
    category_id: product.category_id || "",
    image_url: product.image_url || "",
    in_stock: product.in_stock !== false,
    featured: product.featured || false,
    benefits: product.benefits || [],
  });
  const [benefitInput, setBenefitInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const map = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
        return map[char] || char;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData({ ...formData, benefits: [...formData.benefits, benefitInput.trim()] });
      setBenefitInput("");
    }
  };

  const removeBenefit = (index) => {
    setFormData({ ...formData, benefits: formData.benefits.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border mb-8" data-testid="product-form">
      <h3 className="font-display text-xl font-semibold text-primary mb-6">
        {product.id ? "Редактировать товар" : "Добавить товар"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Название *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) });
              }}
              className="w-full bg-white/60 border border-input focus:border-accent rounded-lg p-3 text-foreground outline-none"
              data-testid="product-name-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-white/60 border border-input focus:border-accent rounded-lg p-3 text-foreground outline-none"
              data-testid="product-slug-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Описание *</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-white/60 border border-input focus:border-accent rounded-lg p-3 text-foreground outline-none resize-none"
            data-testid="product-description-input"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Цена (BYN) *</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full bg-white/60 border border-input focus:border-accent rounded-lg p-3 text-foreground outline-none"
              data-testid="product-price-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Единица</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full bg-white/60 border border-input focus:border-accent rounded-lg p-3 text-foreground outline-none"
              data-testid="product-unit-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Категория *</label>
            <select
              required
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full bg-white/60 border border-input focus:border-accent rounded-lg p-3 text-foreground outline-none"
              data-testid="product-category-select"
            >
              <option value="">Выберите категорию</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">URL изображения</label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full bg-white/60 border border-input focus:border-accent rounded-lg p-3 text-foreground outline-none"
            data-testid="product-image-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Преимущества</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              className="flex-1 bg-white/60 border border-input focus:border-accent rounded-lg p-3 text-foreground outline-none"
              placeholder="Добавить преимущество"
              data-testid="product-benefit-input"
            />
            <button
              type="button"
              onClick={addBenefit}
              className="bg-secondary text-secondary-foreground px-4 rounded-lg"
              data-testid="product-add-benefit-btn"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.benefits.map((b, i) => (
              <span key={i} className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {b}
                <button type="button" onClick={() => removeBenefit(i)} className="text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.in_stock}
              onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
              className="w-5 h-5 accent-accent"
              data-testid="product-instock-checkbox"
            />
            <span className="text-foreground">В наличии</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 accent-accent"
              data-testid="product-featured-checkbox"
            />
            <span className="text-foreground">Хит продаж</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 font-medium transition-colors"
            data-testid="product-save-btn"
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border-2 border-border text-foreground hover:bg-muted rounded-full px-8 py-3 font-medium transition-colors"
            data-testid="product-cancel-btn"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

// ==================== APP ====================

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
