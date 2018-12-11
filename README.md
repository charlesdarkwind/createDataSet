```json
{ "ETHBTC":
	{ "1m":
		{ "time": 	[1541588640000, 1541588700000, 1541588760000 ],
			"open": 	[0.033697, 0.033696, 0.033707, 0.033727 ],
			"high": 	[0.033727, 0.033727, 0.033735, 0.033737 ],
			"low": 		[0.033696, 0.033696, 0.033707, 0.033727 ],
			"close": 	[0.033696, 0.033726, 0.033727, 0.03312 ],
			"volume": [96.88, 89.276, 99.191, 71.893, 107.075 ]
		}
	}
}
```

-- Commandes

			Dans le document de createDataSet que vous avez choisi:
				" npm install i yarn -g "	install yarn
				" yarn "								 	 installe les dependencies
				" yarn start "				  	Start le programme


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