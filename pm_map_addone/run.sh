#!/usr/bin/with-contenv bashio

# Démarrer l'application
bashio::log.info "Démarrage de l'add-on PM Map..."
cd /app || exit
npm start
