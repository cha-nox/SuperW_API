# Prisma

## ✅ 1. Installer les dépendances
Dans le dossier du projet, exécute :
```bash
npm install
```

---

## ✅ 2. Vérifier ou créer le fichier `.env`
À la racine du projet, tu dois avoir un fichier `.env` avec dedans :

```env
DATABASE_URL="..."
```

Ici tu mets la chaine de connexion à la base de données.

---

## ✅ 3. Générer le client Prisma
À faire **obligatoirement** si tu modifies `schema.prisma` (dans `/prisma/`).

```bash
npx prisma generate
```

---

## ✅ 4. Créer la base (une seule fois)
```bash
npx prisma migrate dev --name init
```

---

## ✅ 5. (Optionnel) Voir les données dans un mini back-office
```bash
npx prisma studio
```
👉 Ouvre une page sur http://localhost:5555

---

## 📚 Utilisation dans le code
Dans les fichiers de routes on utilise Prisma comme ça :

```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = await prisma.user.findMany();
```

---

## 🔁 En résumé : à faire si tu clones ou pull
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init   # uniquement la 1re fois
```