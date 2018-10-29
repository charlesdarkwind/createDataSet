
	Exemple d'usage une fois importé et nommé "dataset_1h" pour le .json 1 hour:

		JavaScript:
			const dataset = require('dataSets/29-Oct-2018_14h16_1h.json');
			const pair = 'ETHBTC';
			const openTime = dataset.time[pair];
			const close = dataset.close[pair];
			const volume = dataset.volume[pair];

		Intervales: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M

		api binance: https://github.com/binance-exchange/binance-official-api-docs/
		librarie que j'utilise: https://github.com/jaggedsoft/node-binance-api

____________________________________________________________________________________________________


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
		
2)____________________________________________________________________________________________________

	-- ouvrir cmder et installer yarn, un package manager. (rien à voir avec Hadoop);

	" npm install yarn -g "

		- Pour copier la repo avec git desktop, ouvrez le programme et trouvez le bouton "cloner" ou "clone"
		- Pour l'emplacement: faire un dossier dans mes documents, ex:

		C:\Users\[USER]\Documents\createDataSet

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

	" yarn start "

		- Cela va creer un fichier .json pour les 15 grains et contenant les 152 paires
			(Prend 2 mins sur mon ordi mais un laptop est 3-4 fois + lent)
		- Les fichiers sont créers dans le dossier data set.
		- Avec "vscode-json", ouvrez le .json et tappez " ctrl + alt + b " pour beautify

7)____________________________________________________________________________________________________

	--	Pour obtenir la derniere version du code, il faut faire un "pull".
		- Essayez de "pull" dans github desktop si vous voyez qu'il y a du nouveau.
		- Si cela ne marche pas, avec cmder, faites un "git stash" dans le dossier du projet et puis réessayez
			(sauvegardez tout data sets importants en premier lieu)
