from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="EcoJenya API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: str = ""
    image_url: str = ""
    order: int = 0

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: str
    price: float
    unit: str = "шт"
    category_id: str
    image_url: str = ""
    images: List[str] = []
    in_stock: bool = True
    featured: bool = False
    benefits: List[str] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ProductCreate(BaseModel):
    name: str
    slug: str
    description: str
    price: float
    unit: str = "шт"
    category_id: str
    image_url: str = ""
    images: List[str] = []
    in_stock: bool = True
    featured: bool = False
    benefits: List[str] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    unit: Optional[str] = None
    category_id: Optional[str] = None
    image_url: Optional[str] = None
    images: Optional[List[str]] = None
    in_stock: Optional[bool] = None
    featured: Optional[bool] = None
    benefits: Optional[List[str]] = None

class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    author_name: str
    author_city: str = ""
    rating: int = 5
    text: str
    product_id: Optional[str] = None
    approved: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ReviewCreate(BaseModel):
    author_name: str
    author_city: str = ""
    rating: int = 5
    text: str
    product_id: Optional[str] = None

class ContactInfo(BaseModel):
    phone: str = "+375 29 123-45-67"
    whatsapp: str = "+375291234567"
    telegram: str = "@ecojenya"
    instagram: str = "@ecojenya"
    email: str = "info@ecojenya.by"
    address: str = "г. Гомель, Беларусь"

class InstagramPost(BaseModel):
    id: str
    image_url: str
    caption: str = ""
    permalink: str
    timestamp: str

# ==================== SEED DATA ====================

SEED_CATEGORIES = [
    {"id": "cat-oils", "name": "Растительные масла", "slug": "oils", "description": "Масла холодного отжима из семян и орехов", "image_url": "https://images.pexels.com/photos/9814625/pexels-photo-9814625.jpeg?auto=compress&cs=tinysrgb&w=800", "order": 1},
    {"id": "cat-honey", "name": "Мёд", "slug": "honey", "description": "Натуральный алтайский мёд", "image_url": "https://images.pexels.com/photos/4921856/pexels-photo-4921856.jpeg?auto=compress&cs=tinysrgb&w=800", "order": 2},
    {"id": "cat-tea", "name": "Травяные чаи", "slug": "tea", "description": "Чаи ручного сбора из трав", "image_url": "https://images.pexels.com/photos/28206588/pexels-photo-28206588.jpeg?auto=compress&cs=tinysrgb&w=800", "order": 3},
    {"id": "cat-dried-fruits", "name": "Сухофрукты и орехи", "slug": "dried-fruits", "description": "Натуральные сухофрукты и орехи", "image_url": "https://images.pexels.com/photos/3872416/pexels-photo-3872416.jpeg?auto=compress&cs=tinysrgb&w=800", "order": 4},
    {"id": "cat-chocolate", "name": "Шоколад", "slug": "chocolate", "description": "Шоколад ручной работы", "image_url": "https://images.pexels.com/photos/4791301/pexels-photo-4791301.jpeg?auto=compress&cs=tinysrgb&w=800", "order": 5},
    {"id": "cat-cheese", "name": "Сыр", "slug": "cheese", "description": "Сыр из сырого молока", "image_url": "https://images.pexels.com/photos/6660118/pexels-photo-6660118.jpeg?auto=compress&cs=tinysrgb&w=800", "order": 6},
    {"id": "cat-sweets", "name": "Сладости", "slug": "sweets", "description": "Халва и пряники на пророщенном зерне", "image_url": "https://images.pexels.com/photos/5848592/pexels-photo-5848592.jpeg?auto=compress&cs=tinysrgb&w=800", "order": 7},
]

SEED_PRODUCTS = [
    {"id": "prod-1", "name": "Льняное масло холодного отжима", "slug": "linseed-oil", "description": "Натуральное льняное масло, богатое Омега-3. Идеально для салатов и каш. Укрепляет иммунитет и улучшает состояние кожи.", "price": 15.0, "unit": "250 мл", "category_id": "cat-oils", "image_url": "https://images.pexels.com/photos/9814625/pexels-photo-9814625.jpeg?auto=compress&cs=tinysrgb&w=800", "featured": True, "benefits": ["Богато Омега-3", "Укрепляет иммунитет", "Холодный отжим"]},
    {"id": "prod-2", "name": "Тыквенное масло", "slug": "pumpkin-oil", "description": "Масло из семян тыквы. Полезно для пищеварения и здоровья простаты. Насыщенный ореховый вкус.", "price": 18.0, "unit": "250 мл", "category_id": "cat-oils", "image_url": "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["Для пищеварения", "Богато цинком", "Холодный отжим"]},
    {"id": "prod-3", "name": "Кедровое масло", "slug": "cedar-oil", "description": "Масло сибирского кедра. Источник витамина E и полиненасыщенных жирных кислот.", "price": 35.0, "unit": "100 мл", "category_id": "cat-oils", "image_url": "https://images.pexels.com/photos/4198939/pexels-photo-4198939.jpeg?auto=compress&cs=tinysrgb&w=800", "featured": True, "benefits": ["Витамин E", "Антиоксиданты", "Сибирский кедр"]},
    {"id": "prod-4", "name": "Алтайский мёд цветочный", "slug": "altai-honey", "description": "Натуральный мёд с алтайских лугов. Собран вручную, без термообработки. Укрепляет иммунитет.", "price": 25.0, "unit": "500 г", "category_id": "cat-honey", "image_url": "https://images.pexels.com/photos/4921856/pexels-photo-4921856.jpeg?auto=compress&cs=tinysrgb&w=800", "featured": True, "benefits": ["100% натуральный", "С алтайских лугов", "Без термообработки"]},
    {"id": "prod-5", "name": "Мёд с прополисом", "slug": "propolis-honey", "description": "Мёд обогащённый прополисом. Природный антибиотик, укрепляет защитные силы организма.", "price": 30.0, "unit": "350 г", "category_id": "cat-honey", "image_url": "https://images.pexels.com/photos/5946083/pexels-photo-5946083.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["С прополисом", "Природный антибиотик", "Укрепляет иммунитет"]},
    {"id": "prod-6", "name": "Иван-чай ферментированный", "slug": "ivan-tea", "description": "Традиционный русский чай из кипрея. Ручной сбор и ферментация. Успокаивает и тонизирует.", "price": 12.0, "unit": "100 г", "category_id": "cat-tea", "image_url": "https://images.pexels.com/photos/28206588/pexels-photo-28206588.jpeg?auto=compress&cs=tinysrgb&w=800", "featured": True, "benefits": ["Ручной сбор", "Ферментированный", "Без кофеина"]},
    {"id": "prod-7", "name": "Чай с чабрецом", "slug": "thyme-tea", "description": "Травяной чай с чабрецом. Антисептические свойства, полезен при простуде.", "price": 10.0, "unit": "50 г", "category_id": "cat-tea", "image_url": "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["Антисептик", "При простуде", "Ручной сбор"]},
    {"id": "prod-8", "name": "Курага натуральная", "slug": "dried-apricots", "description": "Сушёные абрикосы без сахара и консервантов. Богаты калием и железом.", "price": 14.0, "unit": "300 г", "category_id": "cat-dried-fruits", "image_url": "https://images.pexels.com/photos/3872416/pexels-photo-3872416.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["Без сахара", "Богата калием", "Без консервантов"]},
    {"id": "prod-9", "name": "Грецкий орех", "slug": "walnuts", "description": "Отборные грецкие орехи. Полезны для мозга и сердечно-сосудистой системы.", "price": 20.0, "unit": "400 г", "category_id": "cat-dried-fruits", "image_url": "https://images.pexels.com/photos/4033325/pexels-photo-4033325.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["Для мозга", "Омега-3", "Отборные"]},
    {"id": "prod-10", "name": "Шоколад горький 70%", "slug": "dark-chocolate", "description": "Шоколад ручной работы из какао-бобов. 70% какао, без рафинированного сахара.", "price": 8.0, "unit": "100 г", "category_id": "cat-chocolate", "image_url": "https://images.pexels.com/photos/4791301/pexels-photo-4791301.jpeg?auto=compress&cs=tinysrgb&w=800", "featured": True, "benefits": ["70% какао", "Ручная работа", "Без рафинированного сахара"]},
    {"id": "prod-11", "name": "Шоколад с орехами", "slug": "chocolate-nuts", "description": "Молочный шоколад с цельными орехами. Нежный вкус и хрустящая текстура.", "price": 10.0, "unit": "100 г", "category_id": "cat-chocolate", "image_url": "https://images.pexels.com/photos/3735147/pexels-photo-3735147.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["С цельными орехами", "Ручная работа", "Натуральные ингредиенты"]},
    {"id": "prod-12", "name": "Сыр Качотта", "slug": "caciotta-cheese", "description": "Полутвёрдый сыр из сырого молока. Выдержка 2 месяца. Нежный сливочный вкус.", "price": 40.0, "unit": "300 г", "category_id": "cat-cheese", "image_url": "https://images.pexels.com/photos/6660118/pexels-photo-6660118.jpeg?auto=compress&cs=tinysrgb&w=800", "featured": True, "benefits": ["Из сырого молока", "2 месяца выдержки", "Ручная работа"]},
    {"id": "prod-13", "name": "Брынза домашняя", "slug": "brynza", "description": "Традиционная брынза из коровьего молока. Мягкая, солоноватая, идеальна для салатов.", "price": 25.0, "unit": "400 г", "category_id": "cat-cheese", "image_url": "https://images.pexels.com/photos/4087609/pexels-photo-4087609.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["Домашняя", "Из коровьего молока", "Для салатов"]},
    {"id": "prod-14", "name": "Халва подсолнечная", "slug": "halva", "description": "Натуральная халва из семян подсолнечника. Без консервантов, на основе мёда.", "price": 12.0, "unit": "300 г", "category_id": "cat-sweets", "image_url": "https://images.pexels.com/photos/5848592/pexels-photo-5848592.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["На основе мёда", "Без консервантов", "Натуральная"]},
    {"id": "prod-15", "name": "Пряники на пророщенном зерне", "slug": "gingerbread", "description": "Пряники из муки пророщенного зерна. Полезная альтернатива обычным сладостям.", "price": 8.0, "unit": "200 г", "category_id": "cat-sweets", "image_url": "https://images.pexels.com/photos/5849559/pexels-photo-5849559.jpeg?auto=compress&cs=tinysrgb&w=800", "benefits": ["Пророщенное зерно", "Полезные", "Без сахара"]},
]

SEED_REVIEWS = [
    {"id": "rev-1", "author_name": "Марина", "author_city": "Минск", "rating": 5, "text": "Заказываю льняное масло уже полгода. Качество отличное, вкус натуральный. Доставка быстрая, упаковка надёжная. Рекомендую!", "approved": True},
    {"id": "rev-2", "author_name": "Алексей", "author_city": "Гомель", "rating": 5, "text": "Попробовал кедровое масло — просто восторг! Настоящий сибирский продукт. Буду заказывать ещё.", "approved": True},
    {"id": "rev-3", "author_name": "Елена", "author_city": "Брест", "rating": 5, "text": "Мёд с прополисом помог всей семье пережить сезон простуд. Дети едят с удовольствием. Спасибо EcoJenya!", "approved": True},
    {"id": "rev-4", "author_name": "Сергей", "author_city": "Москва", "rating": 4, "text": "Шоколад ручной работы — это нечто особенное. Чувствуется разница с магазинным. Единственное — хотелось бы побольше вариантов.", "approved": True},
    {"id": "rev-5", "author_name": "Ольга", "author_city": "Витебск", "rating": 5, "text": "Иван-чай стал моим любимым напитком! Успокаивает, при этом не вызывает сонливости. Буду брать ещё.", "approved": True},
]

MOCK_INSTAGRAM_POSTS = [
    {"id": "ig-1", "image_url": "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600", "caption": "Свежая партия льняного масла готова к отправке! Холодный отжим сохраняет все полезные свойства", "permalink": "https://instagram.com/ecojenya", "timestamp": "2025-01-10T10:00:00Z"},
    {"id": "ig-2", "image_url": "https://images.pexels.com/photos/4033325/pexels-photo-4033325.jpeg?auto=compress&cs=tinysrgb&w=600", "caption": "Грецкие орехи нового урожая. Крупные, сладкие, идеальны для здорового перекуса", "permalink": "https://instagram.com/ecojenya", "timestamp": "2025-01-08T14:30:00Z"},
    {"id": "ig-3", "image_url": "https://images.pexels.com/photos/4921856/pexels-photo-4921856.jpeg?auto=compress&cs=tinysrgb&w=600", "caption": "Алтайский мёд — жидкое золото для вашего иммунитета", "permalink": "https://instagram.com/ecojenya", "timestamp": "2025-01-05T09:15:00Z"},
    {"id": "ig-4", "image_url": "https://images.pexels.com/photos/4791301/pexels-photo-4791301.jpeg?auto=compress&cs=tinysrgb&w=600", "caption": "Шоколад ручной работы. Каждая плитка — маленький шедевр", "permalink": "https://instagram.com/ecojenya", "timestamp": "2025-01-03T16:45:00Z"},
    {"id": "ig-5", "image_url": "https://images.pexels.com/photos/6660118/pexels-photo-6660118.jpeg?auto=compress&cs=tinysrgb&w=600", "caption": "Сыр Качотта из сырого молока. 2 месяца терпеливой выдержки", "permalink": "https://instagram.com/ecojenya", "timestamp": "2025-01-01T11:00:00Z"},
    {"id": "ig-6", "image_url": "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=600", "caption": "Травяные чаи ручного сбора. Вкус и аромат живой природы", "permalink": "https://instagram.com/ecojenya", "timestamp": "2024-12-28T13:20:00Z"},
]

# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "EcoJenya API", "version": "1.0.0"}

# Categories
@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    categories = await db.categories.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    if not categories:
        for cat in SEED_CATEGORIES:
            await db.categories.insert_one(cat)
        categories = SEED_CATEGORIES
    return categories

@api_router.get("/categories/{slug}")
async def get_category(slug: str):
    category = await db.categories.find_one({"slug": slug}, {"_id": 0})
    if not category:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    return category

# Products
@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    limit: int = Query(default=50, le=100)
):
    products = await db.products.find({}, {"_id": 0}).to_list(1000)
    if not products:
        for prod in SEED_PRODUCTS:
            await db.products.insert_one(prod)
        products = SEED_PRODUCTS
    
    if category:
        cat_doc = await db.categories.find_one({"slug": category}, {"_id": 0})
        if cat_doc:
            products = [p for p in products if p.get("category_id") == cat_doc.get("id")]
    
    if featured is not None:
        products = [p for p in products if p.get("featured") == featured]
    
    return products[:limit]

@api_router.get("/products/{slug}")
async def get_product(slug: str):
    product = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return product

@api_router.post("/products", response_model=Product)
async def create_product(data: ProductCreate):
    product = Product(**data.model_dump())
    doc = product.model_dump()
    await db.products.insert_one(doc)
    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, data: ProductUpdate):
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Нет данных для обновления")
    
    result = await db.products.update_one({"id": product_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    return updated

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return {"message": "Товар удалён"}

# Reviews
@api_router.get("/reviews", response_model=List[Review])
async def get_reviews(approved_only: bool = True):
    reviews = await db.reviews.find({}, {"_id": 0}).to_list(1000)
    if not reviews:
        for rev in SEED_REVIEWS:
            await db.reviews.insert_one(rev)
        reviews = SEED_REVIEWS
    
    if approved_only:
        reviews = [r for r in reviews if r.get("approved", False)]
    
    return reviews

@api_router.post("/reviews", response_model=Review)
async def create_review(data: ReviewCreate):
    review = Review(**data.model_dump())
    doc = review.model_dump()
    await db.reviews.insert_one(doc)
    return review

@api_router.put("/reviews/{review_id}/approve")
async def approve_review(review_id: str):
    result = await db.reviews.update_one({"id": review_id}, {"$set": {"approved": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Отзыв не найден")
    return {"message": "Отзыв одобрен"}

@api_router.delete("/reviews/{review_id}")
async def delete_review(review_id: str):
    result = await db.reviews.delete_one({"id": review_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Отзыв не найден")
    return {"message": "Отзыв удалён"}

# Instagram (mock data - replace with real API when credentials available)
@api_router.get("/instagram/feed", response_model=List[InstagramPost])
async def get_instagram_feed(limit: int = 6):
    return MOCK_INSTAGRAM_POSTS[:limit]

# Contact info
@api_router.get("/contact", response_model=ContactInfo)
async def get_contact_info():
    return ContactInfo()

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
