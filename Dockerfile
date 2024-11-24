# Utiliser une image Node.js légère
FROM node:16-alpine

# Créer le dossier de l'application
WORKDIR /app

# Copier les fichiers nécessaires
COPY server/ /app/server/
COPY public/ /app/public/

# Installer les dépendances
WORKDIR /app/server
RUN npm install

# Exposer le port de l'application
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["node", "server.js"]
