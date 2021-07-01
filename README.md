# Bienvenue sur le Repo du Projet 7 Groupomania du parcours Développeur Web d'OpenClassrooms.

Pour mettre en route le projet :


##  :floppy_disk: Base de données :floppy_disk:

La base de donnée est fournie (fichier `groupomania_db.sql`) et a été créée avec MySQL. Pour l'importer, deux options : 

 - Avec MySQL CLI:
	 - Se connecter à MySQL avec l'utilisateur root,
	 - Importer la base de données  avec la commande `SOURCE /path/groupomania_db.sql;` 
 
 
 - Avec MySQL Workbench
	 - Ouvrir le fichier avec l'option `Open SQL script` et l'exécuter.

## :file_folder: Backend :file_folder:

Pour lancer le serveur

 - Installer les packages du back avec un `npm install`
 - Renommer le fichier `.env-prod` en `.env`. Ajouter si nécessaire le mot de passe requis à la connexion à votre  serveur MySQL. Le token est laissé volontairement afin de pouvoir se connecter avec l'utilisateur admin créé par mes soins.
 - Lancer le back en faisant `nodemon`

## :clipboard:  Frontend :clipboard:

Le front a été réalisé à l'aide du framework Vue 3. 

 - Installer les packages du front avec un `npm install`.
 - Lancer le front en faisant `npm run serve`
 
 :clap: **Si tout est bon, vous pouvez accéder au projet via l'adresse [localhost:8080](http://localhost:8080/#/)** :clap:
 
 *Si le serveur n'écoute pas le port 3000, les images enregistrées dans la base de données et présentes dans le dossier images du back ne chargeront pas :confused: *

 ##  :eyes: Logs de l'admin :eyes:

 - id:  admin@admin.fr
 - mdp: Super@dmin1
