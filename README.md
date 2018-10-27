
	1- download winrar; https://www.rarlab.com/download.html    	(or 7-zip)
	2- download github desktop; https://desktop.github.com/		(for cloning the repo)
	3- download visual studio code; https://code.visualstudio.com/ 	(text editor)
	4- download cmder; https://github.com/cmderdev/cmder/releases/download/v1.3.6/cmder.zip	(terminal for windows)
	5- download git; https://git-scm.com/downloads	    		(needed)
	6- download nodejs; https://nodejs.org/en/download/;	 	(needed)

	Installez tout en fesant "suivant"

1)____________________________________________________________________________________________________

	- Pour cmder: extraire dans un dossier de de Documents (mes documents),
		Créez des raccourcis du fichier cmder.exe.

	- Dans visual studio code (or "vscode"):

		"ctrl + shift + x"		shortcut pour le menu add-ons
		"ctrl + shift + e"		shortcut pour revenir à l'arborescence des fichiers
		"ctrl + b"				ferme le pannel

		Add-ons utiles:

			- vscode-json 		(permettra de rendre le dataset comprehensible)
			- vscode-icons,		(meilleur icones)
			- material theme 	(theme),
			- one dark pro 		(theme),
			- shades of purple 	(theme)

2)____________________________________________________________________________________________________

	-- ouvrir cmder et installer yarn, un package manager. (rien à voir avec Hadoop);

	" npm install yarn -g "

		- Pour copier la repo avec git desktop, ouvrez le programme et trouvez le bouton "cloner" ou "clone"
		- Pour l'emplacement: faire un dossier dans mes documents, ex:

		C:\Users\[VOTRE USER]\Documents\createDataSet

3)____________________________________________________________________________________________________

	-- 	toujours dans cmder, avec la commande cd, rendez vous dans le document de createDataSet que vous avez choisi;

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

		- Cela va creer un fichier .json pour les 15 grains et contenant les 152 paires
			(Prend 2 mins sur mon ordi mais un laptop est 3-4 fois + lent)
		- Les fichiers sont créers dans le dossier data set.
		- Avec "vscode-json", ouvrez le .json et tappez " ctrl + alt + b " pour beautify

7)____________________________________________________________________________________________________

	--	Pour obtenir la derniere version du code, il faut fair eun pull.
		Essayez de "pull" dans git hub desktop si vous voyez qu'il y a du nouveau, le dossier "dataSets"
		Si cela ne marche pas, avec cmder, faites un "git stash" dans le dossier du projet et puis réessayez
			sauvegardez tout dataset