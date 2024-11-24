ARG BUILD_FROM=ghcr.io/hassio-addons/base:14.0.3
# Image de base pour Home Assistant Add-ons

# Définir l'image de base
FROM ${BUILD_FROM}

# Variables d'environnement
ENV LANG C.UTF-8

# Copier les fichiers nécessaires
COPY run.sh /
COPY . /app

# Installer Node.js et les dépendances
RUN apk add --no-cache nodejs npm \
  && cd /app \
  && npm install

# Exposer le port 3000
EXPOSE 3000

# Points d'entrée
ENTRYPOINT [ "/run.sh" ]
CMD []
