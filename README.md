# Doggo React Web Task

Bu proje, **Doggo React Web Task** adıyla bir sosyal medya uygulaması geliştirme amacı taşımaktadır. Projenin temel amacı, modern web teknolojilerini kullanarak dinamik, performanslı ve kullanıcı dostu bir sosyal medya platformu oluşturmaktır. Proje kapsamında **React**, **Redux**, **TypeScript**, **Tailwind CSS** gibi teknolojilerin yanı sıra **JSON Server** ve **Next.js** altyapısı kullanılmıştır. Aynı zamanda bu proje, staj başvuru sürecinde verilen teknik görevlerin yerine getirilmesi için hazırlanmıştır.

---

## Geliştirici Bilgileri

- **Adı Soyadı**: Halil Yuşa Ağca  
- **E-posta**: [hyagca@hotmail.com](mailto:hyagca@hotmail.com)

---

## Projenin Amacı

Doggo React Web Task, aşağıdaki temel amaçlara hizmet etmektedir:

1. **Modern Teknolojilerle Geliştirme**:
   - React ve Next.js gibi frameworklerin etkin kullanımı.
   - Redux Toolkit ile global state yönetimi.
   - TypeScript ile statik tip kontrolü.

2. **Performans ve Optimizasyon**:
   - Büyük veri kümelerinde sanal listeleme ve performanslı yükleme.
   - Infinite Scroll ile kullanıcı deneyimini artırma.

3. **Duyarlı Tasarım**:
   - Mobil ve masaüstü cihazlarda uyumlu arayüz.

4. **Uygulamalı Öğrenme**:
   - Gerçek bir uygulama senaryosunda, karşılaşılan sorunların çözümü ve farklı yaklaşımlar geliştirme.

---

## Kullanılan Teknolojiler

### Frontend
- **React**: UI bileşenlerini geliştirmek için kullanılan temel framework.
- **Next.js**: Server-side rendering (SSR) ve statik site oluşturma desteği.
- **TypeScript**: Kod güvenilirliği için statik tip kontrolü.
- **Redux Toolkit**: Uygulama durumunu merkezi bir şekilde yönetmek için kullanıldı.
- **Tailwind CSS**: Hızlı ve özelleştirilebilir UI geliştirme.
- **React Window**: Büyük veri kümelerinde performansı artırmak için sanal listeleme.

### Backend
- **JSON Server**: Sahte bir REST API oluşturularak veri işlemleri için kullanıldı.

### Araçlar ve Kütüphaneler
- **ESLint ve Prettier**: Kod standartlarını koruma ve düzenleme.
- **Axios**: API isteklerini kolaylaştırmak için HTTP istemcisi.

---

## Uygulama Özellikleri

### 1. **Gönderi Paylaşma**
- Kullanıcılar etiket ekleyerek gönderi paylaşabilir.
- Paylaşılan gönderiler, diğer kullanıcılar tarafından görülebilir ve etkileşimde bulunulabilir.

### 2. **Beğenme ve Yorum Yapma**
- Her gönderi, kullanıcılar tarafından beğenilebilir.
- Gönderinin detay görünümünde yorumlar görüntülenebilir.

### 3. **Favorilere Ekleme**
- Kullanıcılar, ilgilendikleri gönderileri favorilere ekleyerek daha sonra görüntüleyebilir.

### 4. **Etiket Filtreleme**
- Explore sayfasında, gönderiler etiketlere göre filtrelenebilir.

### 5. **Infinite Scroll**
- Sonsuz kaydırma sayesinde gönderiler sayfa yenilemeye gerek kalmadan yüklenir.

### 6. **Responsive Tasarım**
- Mobil ve masaüstü cihazlar için optimize edilmiş kullanıcı arayüzü.

---

## Uygulama Modülleri ve Teknik Detaylar

### A. Komponentler
1. **PostCard**:
   - Gönderilerin ana bileşeni.
   - Yorum yapma, beğenme ve detay görünüm işlevlerini içerir.
2. **PostForm**:
   - Yeni gönderi paylaşımı için kullanılan form bileşeni.
   - Modal olarak da kullanılabilir.
3. **Sidebar**:
   - Uygulamanın ana navigasyon bileşeni.
   - Mobil cihazlarda hamburger menü olarak çalışır.

### B. Sayfalar
1. **Home**:
   - Kullanıcının tüm gönderilerini listeler.
   - Infinite Scroll ile sonsuz kaydırma özelliği.
2. **Explore**:
   - Etiketlere göre filtreleme ve gönderi keşfi.
3. **Bookmarks**:
   - Kullanıcının favorilere eklediği gönderileri listeler.
4. **Profile**:
   - Kullanıcı bilgileri ve kullanıcının gönderilerini içerir.

### C. Durum Yönetimi
Redux Toolkit kullanılarak aşağıdaki özellikler merkezi bir şekilde yönetildi:
- Gönderiler (Posts)
- Beğeniler (Likes)
- Yorumlar (Comments)
- Kullanıcı bilgileri (Current User)

### D. Performans Optimizasyonu
- **React Window**: Yalnızca görünür gönderiler DOM’a eklenir, bu da büyük veri kümelerinde performansı artırır.
- **Debounce ve Throttle**: Sonsuz kaydırma ve API isteklerini optimize etmek için kullanıldı.

---

## Karşılaşılan Problemler ve Çözümleri

### 1. **Tip Problemleri**
#### Problem:
Redux store'da tanımlanan `Post` ve `Comment` türlerinin farklı alanlarda farklı şekillerde tanımlanması uyumsuzluklara neden oldu.
#### Çözüm:
`Post` ve `Comment` tipleri merkezi bir dosyada yeniden tanımlandı ve her yerde bu ortak tanımlar kullanıldı.

---

### 2. **React Window ve Infinite Scroll**
#### Problem:
`react-window` kütüphanesi ile sanal listeleme sırasında TypeScript tip hataları ortaya çıktı.
#### Çözüm:
`@types/react-window` paketi kurularak eksik tip tanımlamaları tamamlandı. Ayrıca `itemSize` ve `onItemsRendered` gibi işlevlere doğru tipler atandı.

---

### 3. **Duyarlı Tasarım**
#### Problem:
Farklı ekran boyutlarında, özellikle mobil cihazlarda PostForm ve Sidebar bileşenlerinde taşma problemleri görüldü.
#### Çözüm:
Tailwind CSS’in duyarlı sınıfları (`lg:`, `sm:`) kullanılarak tüm bileşenler optimize edildi. Hamburger menü gibi mobil cihazlara özel bileşenler geliştirildi.

---

### 4. **Performans Sorunları**
#### Problem:
Büyük veri kümeleri yüklendiğinde uygulamanın performansı ciddi şekilde etkilendi.
#### Çözüm:
Sanallaştırma için `react-window` kullanılarak yalnızca görünür öğelerin DOM’a eklenmesi sağlandı. Bu yöntem, özellikle çok sayıda gönderi olduğunda performansı önemli ölçüde artırdı.

---

## Uygulama Mimarisi

1. **Komponentler**:
   - **PostCard**: Gönderi bileşeni.
   - **PostForm**: Yeni gönderi paylaşma.
   - **Sidebar**: Navigasyon.

2. **Sayfalar**:
   - Home, Explore, Bookmarks, Profile.

3. **State Yönetimi**:
   - Redux Toolkit.

4. **Performans Optimizasyonu**:
   - React Window ve Tailwind CSS.

---

## Sonuç

Doggo React Web Task, modern bir sosyal medya uygulaması oluşturmak için gerekli olan teknik detayları ve işlevselliği kapsamlı bir şekilde ele almıştır. Proje sırasında yaşanan zorluklar, farklı teknolojilerle çözülmüş ve kullanıcılara akıcı bir deneyim sunulmuştur.

**Geliştirici**:  
Halil Yuşa Ağca  
[hyagca@hotmail.com](mailto:hyagca@hotmail.com)
