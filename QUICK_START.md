# Quick Start Guide

## Installation Steps

### 1. Install Dependencies

```bash
cd College-Erp-main/client
npm install
```

This will install the newly added `framer-motion` package along with all other dependencies.

### 2. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 3. Verify Installation

- [ ] Landing page appears at `http://localhost:3000/`
- [ ] No console errors
- [ ] Navigation buttons work
- [ ] Dark mode toggle functions

## Routes Available

### Public Routes

- `/` - Landing Page (CampusSphere)
- `/login` - Unified Login (All Roles)

### Legacy Routes (Backward Compatibility)

- `/login/adminlogin` - Old admin login
- `/login/facultylogin` - Old faculty login
- `/login/studentlogin` - Old student login

### Protected Routes

- `/admin/home` or `/admin-dashboard` - Admin Dashboard
- `/faculty/home` or `/faculty-dashboard` - Faculty Dashboard
- `/student/home` or `/student-dashboard` - Student Dashboard

## Testing the Application

### Test Landing Page

1. Navigate to `http://localhost:3000/`
2. Verify all sections load (Hero, Features, Stats, CTA)
3. Test dark mode toggle (☀️/🌙 button in navbar)
4. Click "Login" button → should redirect to `/login`
5. Click "Get Started" button → should redirect to `/login`
6. Scroll and verify animations

### Test Unified Login

1. Navigate to `http://localhost:3000/login`
2. You should see 3 role selection cards:
   - 👨‍🎓 Student (Red)
   - 👨‍🏫 Faculty (Purple)
   - 🔐 Admin (Teal)
3. Click each role and verify:
   - Form appears with role-specific color
   - Role-specific icon displays
   - Color accent changes
4. Test form validation:
   - Try submitting without credentials
   - Verify error message appears
5. Test password visibility:
   - Click eye icon to show/hide password
6. Test "Change Role" button:
   - Should return to role selection
7. Test "Back to Landing" button:
   - Should navigate to landing page

### Test Authentication Flow

1. Select Student role
2. Enter valid student credentials
3. Click "Sign In"
4. Verify redirect to `/student/home`
5. Repeat for Faculty and Admin

## Environment Configuration

### Development (.env file in server)

```env
REACT_APP_SERVER_URL=http://localhost:5001/
NODE_ENV=development
```

### API Endpoints

The app uses these endpoints (ensure backend is running):

- `POST /api/admin/login`
- `POST /api/faculty/login`
- `POST /api/student/login`

## Troubleshooting

### Issue: "framer-motion not found"

**Solution**: Run `npm install` again

```bash
npm install
```

### Issue: Animations not smooth

**Solution**: Check browser tab is not throttled (DevTools → Performance)

### Issue: Login fails with 404

**Solution**: Ensure backend server is running on port 5001

```bash
cd College-Erp-main/server
npm start
```

### Issue: Dark mode not persisting

**Note**: Current implementation uses local state. To persist, add:

```javascript
useEffect(() => {
  localStorage.setItem("theme", dark ? "dark" : "light");
}, [dark]);

useEffect(() => {
  const saved = localStorage.getItem("theme");
  if (saved) setDark(saved === "dark");
}, []);
```

### Issue: Page looks different on mobile

**Solution**: Check browser viewport is set correctly (not zoomed). This is expected responsive behavior.

## Performance Tips

1. **Clear browser cache** if styles don't update
   - Chrome: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)

2. **Disable extensions** that might interfere with styling
   - Ad blockers can sometimes hide elements

3. **Use Chrome DevTools** to check:
   - Network tab for slow loads
   - Performance tab for animations
   - Console for errors

## Common Next Steps

### Adding More Features

1. Components go to `src/components/`
2. Use same dark theme colors
3. Keep animations consistent with Framer Motion

### Customizing Colors

Edit these values in components:

- **Landing Page**: Lines with `#10b981` and similar hex codes
- **Login Page**: `roleConfig` object at the top

### Updating APIs

Modify in `src/redux/api/index.js`:

```javascript
export const newLoginEndpoint = (formData) =>
  API.post("/api/new/login", formData);
```

## Deployment Checklist

- [ ] Test all routes work
- [ ] Verify responsive design on mobile
- [ ] Check all animations are smooth
- [ ] Verify backend endpoints are correct
- [ ] Test error handling
- [ ] Check console for warnings/errors
- [ ] Update `.env` for production URLs
- [ ] Run `npm build`
- [ ] Test production build locally

## Build for Production

```bash
# Create production build
npm run build

# This creates a `build/` folder ready for deployment
```

## Support Resources

- **React Docs**: https://react.dev
- **Framer Motion**: https://www.framer.com/motion/
- **React Router**: https://reactrouter.com/
- **Tailwind CSS**: https://tailwindcss.com/

---

**Version**: 1.0
**Last Updated**: February 2025
**Status**: ✅ Ready to Use
