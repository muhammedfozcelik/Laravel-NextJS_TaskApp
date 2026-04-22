<<<<<<< HEAD
# Laravel-NextJS_TaskApp
Laravel 13 REST API ve Next.js 16 frontend ile geliştirilmiş basit bir Görev Yönetim Modülü (CRUD + filtreleme).
=======
# Görev Yönetim Modülü

Bu proje, Laravel API ve Next.js arayüzü ile geliştirilmiş basit bir görev yönetim modülüdür.

- Backend: `Laravel` REST API
- Frontend: `Next.js` (App Router + TypeScript)
- Özellikler: Görev listeleme, ekleme, güncelleme, silme ve `status` / `priority` filtreleme

## Mimari Özet

### Backend (`/backend`)

- `Task` modeli ve migration ile görev verisi tutulur.
- `StoreTaskRequest` ve `UpdateTaskRequest` ile merkezi validation uygulanır.
- `TaskController`:
  - `GET /api/tasks` (opsiyonel `status`, `priority` filtreleri)
  - `POST /api/tasks`
  - `PUT /api/tasks/{task}`
  - `DELETE /api/tasks/{task}`
- `TaskResource` ile API response formatı standardize edilir.
- `TaskApiTest` ile temel API davranışları test edilir.

### Frontend (`/frontend`)

- Component bazlı yapı:
  - `TaskForm`: ekleme/güncelleme formu
  - `TaskFilters`: status ve priority filtreleri
  - `TaskList`: görevlerin listelenmesi
- `src/lib/api.ts` içinde API istekleri tek noktada yönetilir.
- `src/app/page.tsx` state ve ekran orkestrasyonunu yönetir.

## Kurulum (Windows / PowerShell)

## 1) Backend kurulumu

```powershell
cd backend
copy .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

Backend varsayılan olarak `http://127.0.0.1:8000` adresinde çalışır.

## 2) Frontend kurulumu

Yeni bir terminal açın:

```powershell
cd frontend
copy .env.example .env.local
npm install
npm run dev
```

Frontend varsayılan olarak `http://localhost:3000` adresinde çalışır.

## 3) Uygulamayı kullanma

- Tarayıcıdan `http://localhost:3000` adresine gidin.
- Görev ekleyin / düzenleyin / silin.
- Status ve priority filtreleri ile listeyi daraltın.

## Test ve kalite komutları

### Backend

```powershell
cd backend
php artisan test
./vendor/bin/pint
```

### Frontend

```powershell
cd frontend
npm run lint
```

## Mimari kararlar

- Validation, controller dışında `FormRequest` sınıflarında konumlandırıldı.
- API çıktıları `Resource` yapısı ile tek bir kontrata bağlandı.
- Frontend tarafında component sorumlulukları ayrıldı (form, filtre, liste).
- API katmanı ayrık tutuldu (`lib/api.ts`) ve UI'dan soyutlandı.
>>>>>>> d372f57 (ilk commit)
