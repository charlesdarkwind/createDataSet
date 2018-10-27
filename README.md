
	1- download winrar; https://www.rarlab.com/download.html    	(tp unzip)
	2- download github desktop; https://desktop.github.com/		(to clone repo)
	3- download visual studio code; https://code.visualstudio.com/ 	(text editor)
	4- download cmder; https://github.com/cmderdev/cmder/releases/download/v1.3.6/cmder.zip	(terminal for windows)
	5- download git; https://git-scm.com/downloads	    		(show repo stuff)
	6- download nodejs; https://nodejs.org/en/download/;	 	(needed)

	installez tout en fesant "suivant"

1)____________________________________________________________________________________________________

	- Pour cmder: extraire dans un dossier de de Documents (mes documents),
		Créez des raccourcis du fichier où bon vous semble.

	- Dans visual studio code (or "vscode"):

		"ctrl + shift + x"		pour le menu add-ons
		"ctrl + shift + e"		pour revenir à l'arborescence des fichiers

		Add-ons utiles:

			- vscode-json 		(permettra de rendre le dataset comprehensible)
			- vscode-icons,
			- material theme 	(theme),
			- one dark pro 		(theme),
			- shades of purple 	(theme)

2)____________________________________________________________________________________________________

	-- ouvrir cmder et installer yarn , un package manager. (pas comme YARN de hadoop)

	" npm install yarn -g "

		- Pour copier la repo avec git desktop, trouvez le bouton "cloner" ou "clone"
		- Pour l'emplacement: faire un dossier dans mes documents, ex:

		C:\Users\[VOTRE USER]\Documents\createDataSet

3)____________________________________________________________________________________________________

	-- 	toujours dans cmder, avec la commande cd, rendez vous dans le document de createDataSet, tappez


		" ­yarn "
		- Cela installe toute les dependencies pour le programme:
		- si cela échoue, tentez " npm install ", les warning sont normal.

4)____________________________________________________________________________________________________

	--  s'inscrire sur binance.com: https://www.binance.com/?ref=10096558  ref: 10096558 si demandé, shameless plug :-)

	Allez a https://www.binance.com/userCenter/createApi.html

		- créez votre clef API
		- sauvegarder le API key et le Secret quelque part,

5)____________________________________________________________________________________________________

	-- Créez un fichier " variables.env " à la racine du projet/documente avec ce contenue:

	NODE_ENV=production
	APIKEY=[votre api key]
	APISECRET=[votre secret]

6)____________________________________________________________________________________________________

	-- Pour lancer le programme depuis son répertoire, tappez:

	" yarn createDataSet "

		- Dans le haut du fichier nommé createDataSet.js; ajustez le grain le grain, ex: 1m, 3m, 5m, 15m 1h 1d
		- Les fichiers sont créers dans le dossier data set.
		- Avec "vscode-json", ouvrez le .json et tappez " ctrl + alt + b " pour rendre le json un peu plus comprehensible