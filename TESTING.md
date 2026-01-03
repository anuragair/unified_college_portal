# Testing Guide - Unified College Portal

## Step-by-Step Testing Instructions

### Prerequisites Check

First, verify Node.js is installed:
```bash
node --version
npm --version
```

If not installed, install Node.js:
- **macOS**: `brew install node` or download from [nodejs.org](https://nodejs.org/)

---

## Part 1: Backend Setup & Testing

### Step 1: Install Dependencies

```bash
cd Backend
npm install
```

**Expected Output:**
- Should see packages being installed
- No errors
- `node_modules` folder created

### Step 2: Verify Environment File

Check that `.env` file exists in `Backend/` directory:
```bash
cat Backend/.env
```

**Should contain:**
```
PORT=3000
NODE_ENV=development
JWT_SECRET=unified-college-portal-secret-key-2024-change-in-production
```

### Step 3: Start the Backend Server

```bash
cd Backend
npm run dev
```

**Expected Output:**
```
Server is running on http://localhost:3000
Environment: development
```

**✅ Success Indicators:**
- Server starts without errors
- Port 3000 is listening
- No error messages

**❌ Common Issues:**
- **Port already in use**: Change PORT in `.env` file
- **Module not found**: Run `npm install` again
- **Permission denied**: Check file permissions

### Step 4: Test Backend Health Endpoint

Open a new terminal and test:
```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{"status":"OK","message":"Server is running"}
```

**✅ If you see this, backend is working!**

---

## Part 2: Frontend Testing

### Step 5: Open the Application

1. Keep the backend server running
2. Open browser: `http://localhost:3000`
3. You should see the landing page

**✅ Success Indicators:**
- Landing page loads
- Navigation menu visible
- All sections accessible (Home, About, Register, Sign In, etc.)

**❌ Common Issues:**
- **Cannot connect**: Make sure backend is running
- **404 errors**: Check file paths
- **CORS errors**: Backend CORS is enabled, should work

---

## Part 3: Feature Testing

### Test 1: User Registration

1. **Navigate to Register section** (scroll or click "Register" in nav)
2. **Fill the registration form:**
   - User Type: Select "Student"
   - Full Name: `Test User`
   - College ID: `TEST001`
   - Email: `test@example.com`
   - Phone: `1234567890`
   - Password: `test123`
   - Confirm Password: `test123`
3. **Click "Register" button**

**Expected Behavior:**
- ✅ Form submits
- ✅ Success message: "Registration successful! Redirecting to login..."
- ✅ Redirects to Sign In section
- ✅ User data saved in `Backend/data/users.json`

**Check Backend Data:**
```bash
cat Backend/data/users.json
```
Should show your registered user (password will be hashed).

**❌ If registration fails:**
- Check browser console (F12) for errors
- Check backend terminal for error messages
- Verify all fields are filled correctly

---

### Test 2: User Login (from Landing Page)

1. **Navigate to Sign In section**
2. **Enter credentials:**
   - Email/Username: `test@example.com` (or `TEST001`)
   - Password: `test123`
3. **Click "Sign In" button**

**Expected Behavior:**
- ✅ Form submits
- ✅ Successfully logs in
- ✅ Redirects to appropriate dashboard based on user type
- ✅ Token stored in browser localStorage

**Check Browser Console:**
- Press F12 → Application/Storage → Local Storage
- Should see `token` and `user` entries

**❌ If login fails:**
- Verify credentials are correct
- Check browser console for errors
- Check backend terminal for errors

---

### Test 3: User Login (from Login Page)

1. **Navigate to:** `http://localhost:3000/src/pages/login.html`
2. **Enter credentials:**
   - Username: `test@example.com` or `TEST001`
   - Password: `test123`
3. **Click "LOGIN" button**

**Expected Behavior:**
- ✅ Logs in successfully
- ✅ Redirects to appropriate dashboard
- ✅ User name displayed on dashboard

---

### Test 4: Protected Pages

Test that pages require authentication:

1. **Logout** (if logged in) or **clear localStorage**
2. **Try to access:** `http://localhost:3000/src/pages/student.html`
3. **Expected:** Should redirect to login page

**Then:**
1. **Login again**
2. **Access:** `http://localhost:3000/src/pages/student.html`
3. **Expected:** Should show student dashboard with user name

**Test all protected pages:**
- `/src/pages/student.html`
- `/src/pages/faculty.html`
- `/src/pages/admin.html`
- `/src/pages/dashboard.html`

**✅ All should:**
- Require authentication
- Display user information
- Have logout button

---

### Test 5: Contact Form

1. **Navigate to Contact section** (scroll or click "Contact Us")
2. **Fill the contact form:**
   - Name: `Test User`
   - Email: `test@example.com`
   - Subject: `Test Inquiry`
   - Message: `This is a test message`
3. **Click "Send Message"**

**Expected Behavior:**
- ✅ Form submits
- ✅ Success message: "Thank you for contacting us! We will get back to you soon."
- ✅ Form clears
- ✅ Data saved in `Backend/data/contacts.json`

**Check Backend Data:**
```bash
cat Backend/data/contacts.json
```
Should show your contact submission.

---

### Test 6: Logout Functionality

1. **While logged in**, go to any dashboard page
2. **Click "Logout" button**

**Expected Behavior:**
- ✅ Redirects to login page
- ✅ Token and user data removed from localStorage
- ✅ Cannot access protected pages without logging in again

---

## Part 4: API Testing (Advanced)

### Test API Endpoints Directly

#### Test Registration API
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "userType": "Student",
    "fullName": "API Test User",
    "cid": "API001",
    "email": "apitest@example.com",
    "phone": "9876543210",
    "password": "test123",
    "confirmPassword": "test123"
  }'
```

**Expected:** JSON response with `success: true` and token

#### Test Login API
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "loginEmail": "apitest@example.com",
    "loginPassword": "test123"
  }'
```

**Expected:** JSON response with `success: true`, token, and user data

#### Test Contact API
```bash
curl -X POST http://localhost:3000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "contactName": "API Test",
    "contactEmail": "apitest@example.com",
    "contactSubject": "API Test",
    "contactMessage": "Testing via API"
  }'
```

**Expected:** JSON response with `success: true`

---

## Part 5: Browser Console Testing

### Check for Errors

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Navigate through the application**

**✅ Should see:**
- No red error messages
- API calls in Network tab
- Successful responses (200 status)

**❌ If errors appear:**
- Note the error message
- Check if backend is running
- Verify API URL in `Frontend/src/utils/api.js`

### Check Network Requests

1. **Open DevTools** (F12)
2. **Go to Network tab**
3. **Perform actions** (register, login, etc.)

**✅ Should see:**
- API requests to `/api/auth/register`
- API requests to `/api/auth/login`
- Status codes: 200 (success) or 400/401 (expected errors)
- Request/Response data visible

---

## Testing Checklist

Use this checklist to verify everything works:

### Backend
- [ ] Server starts without errors
- [ ] Health endpoint responds
- [ ] Data directory created (`Backend/data/`)
- [ ] Users file created (`users.json`)
- [ ] Contacts file created (`contacts.json`)

### Registration
- [ ] Form validates input
- [ ] Registration succeeds
- [ ] User data saved
- [ ] Password is hashed (not plain text)
- [ ] Success message shown
- [ ] Redirects to login

### Login
- [ ] Login with email works
- [ ] Login with college ID works
- [ ] Invalid credentials show error
- [ ] Token stored in localStorage
- [ ] User data stored in localStorage
- [ ] Redirects to correct dashboard

### Protected Pages
- [ ] Cannot access without login
- [ ] Redirects to login if not authenticated
- [ ] Can access after login
- [ ] User name displayed
- [ ] Logout button works

### Contact Form
- [ ] Form validates input
- [ ] Submission succeeds
- [ ] Success message shown
- [ ] Data saved to contacts.json

### Logout
- [ ] Logout clears token
- [ ] Logout clears user data
- [ ] Redirects to login
- [ ] Cannot access protected pages after logout

---

## Common Issues & Solutions

### Issue: "Cannot GET /"
**Solution:** Make sure backend server is running and serving static files

### Issue: CORS errors
**Solution:** Backend has CORS enabled. Check if server is running on correct port

### Issue: "Module not found"
**Solution:** Run `npm install` in Backend directory

### Issue: "Port 3000 already in use"
**Solution:** 
1. Change PORT in `Backend/.env`
2. Update `API_BASE_URL` in `Frontend/src/utils/api.js`

### Issue: Forms not submitting
**Solution:** 
1. Check browser console for errors
2. Verify backend is running
3. Check API URL in `api.js`

### Issue: Login redirects to wrong page
**Solution:** Check user type in response. Redirect logic is in `login.js`

---

## Quick Test Script

Run this to quickly test the backend:

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"userType":"Student","fullName":"Quick Test","cid":"QT001","email":"quick@test.com","phone":"1234567890","password":"test123","confirmPassword":"test123"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"loginEmail":"quick@test.com","loginPassword":"test123"}'
```

---

## Success Criteria

✅ **Application is working if:**
1. Backend server starts without errors
2. Landing page loads in browser
3. Can register a new user
4. Can login with registered credentials
5. Protected pages require authentication
6. Contact form submits successfully
7. Logout works correctly
8. No console errors in browser

If all these work, your application is fully functional! 🎉

