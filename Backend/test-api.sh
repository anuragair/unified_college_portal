#!/bin/bash

# API Testing Script
# Make sure the backend server is running before executing this script

BASE_URL="http://localhost:3000/api"

echo "========================================="
echo "API Testing Script"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "Test 1: Health Check"
echo "-------------------"
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/health")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ Health check passed${NC}"
    echo "Response: $body"
else
    echo -e "${RED}❌ Health check failed (HTTP $http_code)${NC}"
    echo "Response: $body"
fi
echo ""

# Test 2: Registration
echo "Test 2: User Registration"
echo "-------------------------"
timestamp=$(date +%s)
email="test${timestamp}@example.com"
cid="TEST${timestamp}"

response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"userType\": \"Student\",
    \"fullName\": \"Test User\",
    \"cid\": \"$cid\",
    \"email\": \"$email\",
    \"phone\": \"1234567890\",
    \"password\": \"test123\",
    \"confirmPassword\": \"test123\"
  }")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" -eq 201 ]; then
    echo -e "${GREEN}✅ Registration successful${NC}"
    echo "Email: $email"
    echo "College ID: $cid"
    # Extract token
    token=$(echo "$body" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "Token received: ${token:0:20}..."
else
    echo -e "${RED}❌ Registration failed (HTTP $http_code)${NC}"
    echo "Response: $body"
    # Try to extract error message
    error=$(echo "$body" | grep -o '"message":"[^"]*' | cut -d'"' -f4)
    if [ ! -z "$error" ]; then
        echo "Error: $error"
    fi
    exit 1
fi
echo ""

# Test 3: Login
echo "Test 3: User Login"
echo "------------------"
response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"loginEmail\": \"$email\",
    \"loginPassword\": \"test123\"
  }")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ Login successful${NC}"
    # Extract token
    token=$(echo "$body" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "Token: ${token:0:20}..."
else
    echo -e "${RED}❌ Login failed (HTTP $http_code)${NC}"
    echo "Response: $body"
    exit 1
fi
echo ""

# Test 4: Verify Token
echo "Test 4: Token Verification"
echo "-------------------------"
response=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/auth/verify" \
  -H "Authorization: Bearer $token")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ Token verification successful${NC}"
else
    echo -e "${RED}❌ Token verification failed (HTTP $http_code)${NC}"
    echo "Response: $body"
fi
echo ""

# Test 5: Get User Profile
echo "Test 5: Get User Profile"
echo "------------------------"
response=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/users/profile" \
  -H "Authorization: Bearer $token")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ Profile retrieval successful${NC}"
    # Extract user name
    name=$(echo "$body" | grep -o '"fullName":"[^"]*' | cut -d'"' -f4)
    if [ ! -z "$name" ]; then
        echo "User: $name"
    fi
else
    echo -e "${RED}❌ Profile retrieval failed (HTTP $http_code)${NC}"
    echo "Response: $body"
fi
echo ""

# Test 6: Contact Form
echo "Test 6: Contact Form Submission"
echo "--------------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/contact/submit" \
  -H "Content-Type: application/json" \
  -d "{
    \"contactName\": \"Test User\",
    \"contactEmail\": \"$email\",
    \"contactSubject\": \"API Test\",
    \"contactMessage\": \"This is a test message from API testing script\"
  }")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" -eq 201 ]; then
    echo -e "${GREEN}✅ Contact form submission successful${NC}"
else
    echo -e "${RED}❌ Contact form submission failed (HTTP $http_code)${NC}"
    echo "Response: $body"
fi
echo ""

# Summary
echo "========================================="
echo -e "${GREEN}All API tests completed!${NC}"
echo "========================================="
echo ""
echo "Test Credentials Created:"
echo "  Email: $email"
echo "  College ID: $cid"
echo "  Password: test123"
echo ""
echo "You can now test the frontend with these credentials!"

