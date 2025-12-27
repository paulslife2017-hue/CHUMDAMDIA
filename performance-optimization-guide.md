# PageSpeed Optimization Guide
## 목표: 90점 이상 달성

### 📋 체크리스트

#### 1. 이미지 최적화 ✅
- [x] 이미지 압축 스크립트 생성
- [ ] WebP 포맷 변환
- [ ] Picture 태그로 WebP 지원
- [ ] 중요 이미지 preload 설정

**실행 방법:**
```bash
# 1. 스크립트 실행 권한 부여
chmod +x optimize-images.sh

# 2. 이미지 최적화 실행
./optimize-images.sh

# 3. 최적화된 이미지 확인 후 적용
ls -lh assets/images/optimized/
mv assets/images/optimized/* assets/images/

# 4. WebP 지원 추가
node add-webp-support.js
```

#### 2. 캐시 설정 ✅
- [x] .htaccess 파일 생성 (Apache 서버용)
- [x] _headers 파일 생성 (Cloudflare Pages용)
- [x] 브라우저 캐싱 설정
- [x] GZIP 압축 설정

#### 3. HTML 최적화
- [ ] 불필요한 공백 제거
- [ ] 인라인 크리티컬 CSS
- [ ] JavaScript defer/async 설정
- [x] Lazy loading 적용 (이미 완료)

#### 4. CSS 최적화
- [ ] CSS 최소화 (minify)
- [ ] 사용하지 않는 CSS 제거
- [ ] 크리티컬 CSS 추출

#### 5. JavaScript 최적화
- [ ] JS 최소화 (minify)
- [ ] 불필요한 코드 제거
- [ ] defer/async 속성 추가

### 🚀 즉시 적용 가능한 최적화

#### HTML 수정사항

**1. 중요 리소스 Preload 추가 (이미 있음)**
```html
<link rel="preload" href="./assets/css/style-mobile.css" as="style">
<link rel="preload" href="./assets/js/main.js" as="script">
```

**2. JavaScript defer 추가**
현재:
```html
<script src="./assets/js/translations.js?v=2024122703"></script>
<script src="./assets/js/main.js?v=2024122703"></script>
```

최적화:
```html
<script src="./assets/js/translations.js?v=2024122703" defer></script>
<script src="./assets/js/main.js?v=2024122703" defer></script>
```

**3. DNS Prefetch 추가 (이미 있음)**
```html
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
```

### 📊 예상 성능 개선

| 항목 | 개선 전 | 개선 후 | 개선률 |
|------|---------|---------|--------|
| 이미지 크기 | ~5MB | ~1.5MB | 70% 감소 |
| 첫 로딩 시간 | ~3s | ~1s | 66% 개선 |
| LCP | ~3.5s | ~1.8s | 48% 개선 |
| CLS | 0.1 | 0.05 | 50% 개선 |
| PageSpeed | 70-80 | 90+ | 목표 달성 |

### 🔧 추가 최적화 도구

#### CSS 최소화
```bash
# npx 사용 (Node.js 설치 필요)
npx cssnano assets/css/style-mobile.css assets/css/style-mobile.min.css
```

#### JS 최소화
```bash
npx terser assets/js/main.js -o assets/js/main.min.js -c -m
npx terser assets/js/translations.js -o assets/js/translations.min.js -c -m
```

### 📝 배포 전 확인사항

1. **이미지 최적화 확인**
   - [ ] 모든 이미지가 WebP 포맷으로 변환됨
   - [ ] 원본 JPG/PNG도 유지 (fallback)
   - [ ] 이미지 품질 확인

2. **캐시 설정 확인**
   - [ ] _headers 파일이 루트에 있음
   - [ ] .htaccess 파일이 루트에 있음

3. **HTML 검증**
   - [ ] picture 태그가 올바르게 작동
   - [ ] 모든 페이지가 정상 로딩
   - [ ] JavaScript defer로 변경 후 동작 확인

4. **성능 테스트**
   - [ ] PageSpeed Insights 테스트
   - [ ] Lighthouse 테스트
   - [ ] 실제 로딩 속도 확인

### 🎯 PageSpeed 90+ 달성 전략

1. **LCP (Largest Contentful Paint) < 2.5s**
   - Hero 이미지 최적화 및 WebP 사용
   - Preload 적용
   - 이미지 압축

2. **FID (First Input Delay) < 100ms**
   - JavaScript defer 사용
   - 불필요한 JS 제거

3. **CLS (Cumulative Layout Shift) < 0.1**
   - 이미지 width/height 지정
   - 폰트 로딩 최적화

4. **FCP (First Contentful Paint) < 1.8s**
   - 크리티컬 CSS 인라인
   - 불필요한 CSS 제거

### 📞 문제 해결

**Q: WebP 이미지가 표시되지 않아요**
A: 브라우저가 WebP를 지원하는지 확인하세요. picture 태그의 fallback (img)이 작동해야 합니다.

**Q: 캐시가 적용되지 않아요**
A: 서버 설정을 확인하세요. Cloudflare Pages는 _headers, Apache는 .htaccess를 사용합니다.

**Q: PageSpeed 점수가 개선되지 않아요**
A: 
1. 이미지 최적화가 제대로 되었는지 확인
2. 캐시 설정이 적용되었는지 확인
3. JavaScript가 defer로 로드되는지 확인
4. 불필요한 리소스가 있는지 확인
