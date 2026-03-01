# 🛒 Digital PROJET POS - Point of Sale & E-commerce Platform

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.1-brightgreen?style=flat-square&logo=spring)
![Angular](https://img.shields.io/badge/Angular-17+-dd0031?style=flat-square&logo=angular)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Hibernate](https://img.shields.io/badge/Hibernate-ORM-darkgray?style=flat-square)

**Digital PROJET POS** est une plateforme complète Full-Stack de point de vente (Caisse Enregistreuse) et d'administration e-commerce spécialisée pour un **supermarché d'électronique**. Ce projet inclut un Back-end robuste en Java/Spring Boot sécurisé aux normes, et un Front-end moderne et performant en Angular 17.

---

## ✨ Fonctionnalités Principales

### 🖥️ Interface Frontend (Point de Vente Angular)

- **POS Interactif** : Une interface de caisse visuelle, fluide, optimisée par de robustes grilles Tailwind.
- **Panier Réactif** : Les articles scannés se cumulent dynamiquement avec du calcul algorithmique instantané.
- **Impression Thermique 80mm** : Génération native et purement "HTML Table" (compatible avec toutes imprimantes thermiques du marché) de ticket de caisse en isolant CSS.
- **Tableau de Bord Admin** : Graphiques, gestionnaires complets des produits et des fiches employés/utilisateurs.
- **Standalone Angular v17** : Architecture moderne sans les anciens `NGModules`, tirant parti des Interceptors et Router Guards.

### ⚙️ Moteur Backend (API Spring Boot)

- **RESTful API** : Routes segmentées pour l'administration et pour les interfaces clientes `/api/produits`, `/api/users`.
- **Mécanisme JWT State-less** : L'authentification passe par un `SecurityFilter` interceptant le token décrypté dans le Header des requêtes sans aucune session backend gérée. L'accès est conditionné par des Rôles (ADMIN vs USER).
- **CRUD Avancé** : Connexion SQL solide avec Spring Data JPA. Gestion des suppressions asynchrones.
- **Auto-Génération Tests** : Tests d'intégration propulsés par Mockito / JUnit couvrant l'intégrité de la Base de Données.

---

## 🛠️ Stack Technique

### Backend

- **Langage :** Java 17
- **Framework :** Spring Boot 3.3.1
- **Sécurité :** Spring Security, JWT (io.jsonwebtoken)
- **Data & ORM :** Spring Data JPA, Hibernate, MySQL Driver 8.0+

### Frontend

- **Framework Core :** Angular 17.0+ (ES Modules, RxJs)
- **Styling :** Tailwind CSS
- **Modèle Formulaire :** Reactive Forms Module

---

## 🚀 Installation & Lancement Rapide

### 📋 Prérequis Locaux

- [JDK 17+](https://adoptium.net/) pour compiler le code Java.
- Serveur local [MySQL](https://dev.mysql.com/downloads/mysql/).
- [Node.js & npm](https://nodejs.org/en) (Version v18 ou v20 recommandées) pour la partie Angular.

### Étape 1 : Démarrer le Backend (Spring Boot)

1. Assurez-vous que votre console MySQL est allumée en arrière-plan.
2. Créez manuellement la base : `CREATE DATABASE spring_DB;`
3. Vérifiez les mots de passe (root, "", 3306) au sein du fichier :
   `produits_backend/src/main/resources/application.properties`
4. Depuis un terminal ouvert à la racine de la branche `/produits_backend` :

   ```bash
   # Sous Windows
   .\mvnw spring-boot:run

   # Sous Mac/Linux
   ./mvnw spring-boot:run
   ```

   _(L'API s'allume alors sur http://localhost:8080)_

### Étape 2 : Démarrer le Frontend (Angular)

1. Ouvrez un second terminal à la racine `/Produit_frontend/`.
2. Installez tout l'environnement javascript Node `node_modules` avec :
   ```bash
   npm install
   ```
3. Exécutez le développement natif :
   ```bash
   npm run start
   # ou
   npx ng serve -o
   ```
   _(L'application va se compiler un package virtuel et s'ouvrir automatiquement sur le lien Web http://localhost:4200)_

---

## 🔐 Identifiants par défaut (Database Initialization)

Lorsque Spring se lance pour la première fois avec `createDatabaseIfNotExist=true`, le composant de base `DataInitializer.java` injecte de façon sécurisée des rôles et comptes de tests valides :

- **Administrateur** : `awtyfysl@gmail.com` / `admin` (Peut gérer les comptes et la caisse)
- **Caissier Standard** : `caissier@market.com` / `12345` (Accès POS exclusif)

## 📁 Architecture des dossiers

- `/produits_backend/` → Dossier du serveur Serveur Spring Boot `pom.xml`, Logique JPA `Entities` et Services sécurisés de chiffrement (Bcrypt).
- `/Produit_frontend/` → Single Page Application sous configuration `angular.json`, contenant dans `/src/app/` les services `Rxjs`, et interfaces modulées via Tailwind dans les dossiers `components/`.

---

_Développé pour la plateforme Digital PROJET POS_
