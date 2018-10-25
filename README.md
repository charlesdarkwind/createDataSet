
1. download winrar; https://www.rarlab.com/download.htm											(pour un-zip)

2. download github desktop; https://desktop.github.com/											(pour pouvoir cloner le repository du code)

3. download visual studio code; https://code.visualstudio.com/ 									(un editeur de text pour developpeurs)

4. download cmder; https://github.com/cmderdev/cmder/releases/download/v1.3.6/cmder.zip  		(un terminal bien sympa pour windows permettant d'utiliser des commandes linux)

5. download git; https://git-scm.com/downloads													(va être dans vscode pour voir si il y a du nouveau sur la repo à aller chercher (pull))


	installez tout en fesant "suivant".

    pour cmder, l'extraire dans un dossier de vos documents et il suffit ensuite de double-cliquer l'icone,
	j'ai personnelement mit des raccourcis dans le menu demarrer, bureau ect

	vscode remarquera que vous utilisez node/json/javascript et vous proposera des add-on, c'est essentiel de les installer (puis ensuite restart vscode apres que tout est installé)

	Aussi:
		"ctrl + shift + x"		pour le menu add-ons
		"ctrl + shift + e"		pour revenir à l'arborescence des fichiers

	Add-ons utiles:
		- dotENV,
		- material theme (puis l'activer dans les options),
		- one dark pro (un autre theme sympa),
		- vscode-icons,
		- vscode-json (permettra de rendre le dataset comprehensible)


6.


7. ouvrir cmder et installer yarn (pas comme YARN, cest autre chose, un package manager), tappez:

	" npm install yarn -g "


8. toujours dans cmder, avec la commande cd, rendez vous dans le document de createDataSet,
	vous devez installer toute les dependencies pour le programme, tappez:

	" ­yarn "       *si cela échoue, tentez "npm install"

	Il y a toutjours des warnings, c'est normal.


9. Variable.env: il est n'écéssaire d'avoir un fichier nommé " variables.env " à la racine du projet/document
	(celui qui à été créé en clonant la repo dans github desktop).

	Le contenu doit être comme suit:


	NODE_ENV=production
	APIKEY=[votre api key]
	APISECRET=[votre secret]


	Pour les variables APIKEY et APISECRET, vous avez besoin d'un compte binance;
	s'inscrire sur binance.com en utilisant ce lien https://www.binance.com/?ref=10096558  (ref: 10096558 si demandé)

	Allez a https://www.binance.com/userCenter/createApi.html  et créez votre clef API, sauvegarder le API key et le "secret",
	(il n'apparaitra plus ensuite) Faites save.

10. Dans le haut du fichier createDataSet.js, changez le grain


11. Pour lancer le programme tappez:

	" yarn createDataSet "

	Dans le sous-dossier nommé "dataSets", il va y avoir un nouveau fichier json.

	Le fichier sera incompréhensible, si vous avez installé le add-on "vscode-json", ouvrez le .json et tappez " ctrl + alt + b "