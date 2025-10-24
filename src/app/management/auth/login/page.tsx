// Route proxy: Chỉ export từ nơi khác (thường là features) để tách logic ra ngoài -> Tách biệt logic UI khỏi định tuyến

// src/app/auth/login/page.tsx
export { default } from '@/feature/auth/page/login'
