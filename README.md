```json
[
	{
		"symbol": "ETHBTC",
		"interval": "1m",
		"time": 1541948760000,
		"open": 0.033042,
		"high": 0.033059,
		"low": 0.033013,
		"close": 0.03305,
		"volume": 89.887
	},
]
```

-- Commandes

			Dans le document de createDataSet que vous avez choisi:
				" npm install i yarn -g "		install yarn
				" yarn "								 	 	installe les dependencies
				" yarn start "				  		Start le programme


-- Faire son variables.env:

		- S'inscrire sur binance.com: https://www.binance.com/?ref=10096558
		- https://www.binance.com/userCenter/createApi.html pour crer api key et secret, gardez en lieu sur.
		- Créez un fichier " variables.env " à la racine du projet/documente avec ce contenue:

	NODE_ENV=production
	APIKEY=[votre api key]
	APISECRET=[votre secret]


	-- Problemes:

			si err: " git pull "  ,
			sinon:  " git reset --hard --force && git pull "
			sinon:  supprimer sous-dossier node-modules et refaire " yarn "
			sinon:	essayer de supprimer les dossier du projet et re-cloner