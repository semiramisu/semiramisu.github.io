// Service Worker - オフライン対応とキャッシュ戦略
const CACHE_NAME = 'semiramisu-blog-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';

// キャッシュするリソースのパターン
const STATIC_CACHE_PATTERNS = [
  /\/_astro\//,
  /\.woff2?$/,
  /\.webp$/,
  /\.jpg$/,
  /\.png$/,
  /\.css$/,
  /\.js$/
];

// インストール時の処理
self.addEventListener('install', (event) => {
  // 即座にアクティベート
  self.skipWaiting();
});

// アクティベート時の処理
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // 古いキャッシュを削除
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  
  // すべてのクライアントを制御
  self.clients.claim();
});

// フェッチイベントの処理
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 同一オリジンのリクエストのみ処理
  if (url.origin !== location.origin) {
    return;
  }
  
  // キャッシュ戦略を決定
  if (isStaticAsset(url.pathname)) {
    // 静的アセット: Cache First
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.endsWith('.html') || url.pathname === '/') {
    // HTMLページ: Network First
    event.respondWith(networkFirst(request));
  } else {
    // その他: Network First
    event.respondWith(networkFirst(request));
  }
});

// 静的アセットかどうかを判定
function isStaticAsset(pathname) {
  return STATIC_CACHE_PATTERNS.some(pattern => pattern.test(pathname));
}

// Cache First戦略
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // オフラインフォールバック
    return new Response('オフラインです', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain; charset=utf-8'
      })
    });
  }
}

// Network First戦略
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // オフラインページを返す
    return new Response(`
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>オフライン - セミラミスの庭</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
          }
          .offline-message {
            text-align: center;
            padding: 2rem;
          }
          h1 {
            color: #333;
            margin-bottom: 1rem;
          }
          p {
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="offline-message">
          <h1>オフラインです</h1>
          <p>インターネット接続を確認してください。</p>
          <p>接続が回復したら、ページを更新してください。</p>
        </div>
      </body>
      </html>
    `, {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/html; charset=utf-8'
      })
    });
  }
}