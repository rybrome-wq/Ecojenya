import requests
import sys
from datetime import datetime
import json

class EcoJenyaAPITester:
    def __init__(self, base_url="https://homemade-dairy-goods.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test_name": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status=200, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)
            
            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if success:
                if response.content:
                    try:
                        json_data = response.json()
                        if isinstance(json_data, list):
                            details += f", Items: {len(json_data)}"
                        elif isinstance(json_data, dict):
                            details += f", Keys: {list(json_data.keys())[:3]}"
                    except:
                        details += f", Content length: {len(response.content)}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'Unknown error')}"
                except:
                    details += f", Response: {response.text[:100]}"
            
            self.log_test(name, success, details)
            return success, response.json() if success and response.content else {}
            
        except Exception as e:
            details = f"Exception: {str(e)}"
            self.log_test(name, False, details)
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "")

    def test_categories(self):
        """Test categories endpoints"""
        success, data = self.run_test("Get Categories", "GET", "categories")
        
        if success and data:
            # Test specific category
            if len(data) > 0:
                first_category = data[0]
                slug = first_category.get('slug', '')
                if slug:
                    self.run_test("Get Category by Slug", "GET", f"categories/{slug}")
        
        return success

    def test_products(self):
        """Test products endpoints"""
        # Test all products
        success, data = self.run_test("Get All Products", "GET", "products")
        
        if success and data:
            # Test featured products
            self.run_test("Get Featured Products", "GET", "products?featured=true")
            
            # Test category filtering
            self.run_test("Get Products with Limit", "GET", "products?limit=5")
            
            # Test specific product
            if len(data) > 0:
                first_product = data[0]
                slug = first_product.get('slug', '')
                if slug:
                    self.run_test("Get Product by Slug", "GET", f"products/{slug}")
        
        return success

    def test_reviews(self):
        """Test reviews endpoints"""
        # Test approved reviews
        success, data = self.run_test("Get Approved Reviews", "GET", "reviews")
        
        # Test all reviews (admin view)
        self.run_test("Get All Reviews", "GET", "reviews?approved_only=false")
        
        # Test creating a review
        review_data = {
            "author_name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "author_city": "Test City",
            "rating": 5,
            "text": "This is a test review from the automated test suite"
        }
        
        create_success, create_data = self.run_test(
            "Create Review", 
            "POST", 
            "reviews", 
            expected_status=200,
            data=review_data
        )
        
        return success

    def test_instagram_feed(self):
        """Test Instagram feed (mock data)"""
        success, data = self.run_test("Get Instagram Feed", "GET", "instagram/feed")
        
        if success:
            # Test with limit
            self.run_test("Get Instagram Feed with Limit", "GET", "instagram/feed?limit=3")
        
        return success

    def test_contact_info(self):
        """Test contact info endpoint"""
        return self.run_test("Get Contact Info", "GET", "contact")

    def test_admin_operations(self):
        """Test admin-related operations"""
        print("\n📋 Testing Admin Operations...")
        
        # These would typically require authentication in a real system
        # For now, we'll test the endpoints that might be available
        
        # Test getting reviews for admin (unapproved)
        success = self.run_test("Admin - Get Unapproved Reviews", "GET", "reviews?approved_only=false")
        
        return success

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test("Health Check", "GET", "health")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting EcoJenya Static Landing Page API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test basic API endpoints (static version)
        self.test_api_root()
        self.test_health_check()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 TEST SUMMARY")
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Success rate: {(self.tests_passed / self.tests_run * 100):.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} test(s) failed")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test runner"""
    tester = EcoJenyaAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())