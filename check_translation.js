const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.goto('https://8000-i9fnlxvpz3zeovm0amr7q-5185f4aa.sandbox.novita.ai/', {
        waitUntil: 'networkidle2'
    });
    
    // 한국어로 변경
    await page.click('[data-lang="ko"]');
    await page.waitForTimeout(1000);
    
    // 리뷰 제목 확인
    const koReviewTitle = await page.$eval('[data-i18n="review1-title"]', el => el.textContent);
    console.log('Korean review1-title:', koReviewTitle);
    
    // 영어로 변경
    await page.click('[data-lang="en"]');
    await page.waitForTimeout(1000);
    
    const enReviewTitle = await page.$eval('[data-i18n="review1-title"]', el => el.textContent);
    console.log('English review1-title:', enReviewTitle);
    
    // Treatment Guide 확인
    const enTreatmentTitle = await page.$eval('[data-i18n="treatment-guide-title"]', el => el.textContent);
    console.log('English treatment-guide-title:', enTreatmentTitle);
    
    // 평균 평점 확인
    const enAvgRating = await page.$eval('[data-i18n="reviews-average-rating"]', el => el.innerHTML);
    console.log('English reviews-average-rating:', enAvgRating);
    
    await browser.close();
})();
