# 📦 Produits Management API

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.1-brightgreen?style=flat-square&logo=spring)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Hibernate](https://img.shields.io/badge/Hibernate-ORM-darkgray?style=flat-square)

Une API RESTful développée avec **Spring Boot** pour la gestion de produits. Ce projet permet d'effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur une base de données **MySQL** via une architecture logicielle propre (Controller, Service, Repository).

---

## ✨ Fonctionnalités

- 🛒 **Opérations CRUD complètes** sur l'entité `Produit` (Nom, Prix, Date de création).
- 🔌 **API RESTful** respectant les bonnes pratiques (GET, POST, PUT, DELETE).
- 🗄️ **Base de données relationnelle** gérée via Spring Data JPA / Hibernate.
- 🧪 **Tests automatisés** avec JUnit 5 et Spring Boot Test.
- 🚀 **Prêt pour le déploiement** avec Maven.

---

## 🛠️ Stack Technique

- **Langage :** Java 17
- **Framework :** Spring Boot
- **Accès aux données :** Spring Data JPA
- **Base de données :** MySQL
- **Outil de build :** Maven
- **Tests :** JUnit 5 & Mockito

---

## 🚀 Installation & Lancement Rapide

### 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Java Development Kit (JDK) 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/) (optionnel, le wrapper `mvnw` est inclus)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

### 🛠️ Configuration de la Base de Données

1. Démarrez votre serveur MySQL.
2. Créez une base de données nommée `spring_DB` :
   ```sql
   CREATE DATABASE spring_DB;
   ```
3. Modifiez le fichier `src/main/resources/application.properties` si votre mot de passe ou port MySQL est différent :
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/spring_DB?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=votre_mot_de_passe
   spring.jpa.hibernate.ddl-auto=update
   ```

### ▶️ Exécuter l'application

Clonez le projet, naviguez dans le dossier racine, puis lancez la commande Maven suivante :

```bash
# Sous Windows
.\mvnw spring-boot:run

# Sous Linux/Mac
./mvnw spring-boot:run
```

L'API sera accessible sur `http://localhost:8080`.

---

## 📡 Endpoints de l'API

L'API expose les routes suivantes pour interagir avec les produits :

| Méthode  | Endpoint    | Description                       | Body (Exemple)                                                                                |
| :------- | :---------- | :-------------------------------- | :-------------------------------------------------------------------------------------------- |
| `GET`    | `/api/all`  | Récupérer tous les produits       | N/A                                                                                           |
| `GET`    | `/api/{id}` | Récupérer un produit via son ID   | N/A                                                                                           |
| `POST`   | `/api`      | Ajouter un nouveau produit        | `{"nomProduit": "PC Dell", "prixProduit": 2200.5, "dateProduit": "2024-02-24"}`               |
| `PUT`    | `/api`      | Mettre à jour un produit existant | `{"idProduit": 1, "nomProduit": "PC HP", "prixProduit": 1900.0, "dateProduit": "2024-02-24"}` |
| `DELETE` | `/api/{id}` | Supprimer un produit via son ID   | N/A                                                                                           |

---

## 🧪 Exécuter les Tests

Le projet inclut une suite de tests unitaires et d'intégration pour garantir la fiabilité des opérations CRUD.

Pour lancer tous les tests :

```bash
# Sous Windows
.\mvnw clean test

# Sous Linux/Mac
./mvnw clean test
```

---

## 📁 Structure du Projet

```text
src/main/java/com/gt/produits/
├── entities/           # Modèles de la base de données (Ex: Produit)
├── repos/              # Interfaces Spring Data JPA pour l'accès aux données
├── service/            # Logique métier et interfaces de service
├── restcontrollers/    # Contrôleurs exposant l'API REST
└── ProduitsApplication # Point d'entrée principal de l'application Spring Boot
```

---

_Fait avec ❤️ avec Spring Boot._
