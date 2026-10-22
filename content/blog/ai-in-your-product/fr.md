---
title: "Intégrer l'IA dans un produit existant : la méthode pas à pas"
description: "La plupart des projets IA s'enlisent parce qu'ils partent du modèle au lieu du besoin. Une méthode concrète pour choisir, construire et mesurer une première fonctionnalité IA qui fait vraiment gagner du temps."
date: 2026-10-06
tags: ["IA", "Produit", "LLM"]
---

Toutes les équipes produit entendent aujourd'hui la même question : « Qu'est-ce qu'on fait avec l'IA ? » La réponse tentante, c'est d'ajouter un chatbot dans un coin de l'écran. C'est rarement la fonctionnalité qui rapporte.

Les fonctionnalités qui marchent partent d'une tâche que vos utilisateurs font déjà, à la main, chaque semaine. Voici la méthode que je suivrais pour passer de cette question à une fonctionnalité en production.

## Partir d'une tâche, pas d'un modèle

Listez les tâches de votre produit, ou autour de lui, qui sont répétitives et chargées en texte. Quelques exemples qu'on retrouve dans la plupart des entreprises :

- Trier les e-mails de support entrants et les envoyer à la bonne personne.
- Extraire les dix mêmes champs de factures, de contrats ou de formulaires.
- Rédiger un premier jet de rapport à partir de données que vous avez déjà.
- Retrouver une réponse enfouie dans la documentation interne.

Puis évaluez chacune avec quatre questions :

1. **Est-elle fréquente ?** Une tâche faite 200 fois par semaine vaut mieux qu'une tâche faite deux fois par an.
2. **Est-elle longue ?** Comptez les minutes qu'une personne y passe aujourd'hui.
3. **Le résultat peut-il être relu ?** Un brouillon vérifié par quelqu'un est bien plus sûr qu'une action que personne ne voit.
4. **Avez-vous des exemples ?** Anciens e-mails, formulaires remplis, rapports rédigés. Il en faudra pour mesurer la qualité.

Le meilleur premier candidat est fréquent, long, facile à relire et bien documenté. Il est souvent moins spectaculaire qu'un chatbot, et bien plus utile.

## Choisir la plus petite fonctionnalité qui fait gagner du temps

La plupart des fonctionnalités IA utiles relèvent de quelques grands schémas. Les nommer aide à cadrer le travail :

| Schéma | Ce que fait le modèle | Exemple |
| --- | --- | --- |
| Classification | Choisit une étiquette dans une liste fixe | Orienter un ticket vers facturation, livraison ou technique |
| Extraction | Remplit des champs structurés à partir de texte libre | Lire une facture : montant, date, fournisseur |
| Résumé | Raccourcit sans perdre l'essentiel | Un paragraphe par appel client |
| Rédaction | Écrit une première version qu'une personne corrige | Une réponse à un e-mail de support |
| Questions-réponses | Répond à partir de vos propres documents | « Quelle est notre politique de remboursement au Sénégal ? » |
| Agent | Décide quels outils appeler, et dans quel ordre | Vérifier une commande, puis ouvrir une demande de remboursement |

Commencez par le haut du tableau. La classification et l'extraction se mesurent facilement et mettent rarement dans l'embarras. Les agents sont puissants, mais ils viennent en dernier, pas en premier.

## Donner le bon contexte au modèle

Un modèle ne connaît que ses données d'entraînement et ce que vous mettez dans la requête. La valeur de votre produit se trouve dans la seconde partie : vos données, vos règles, votre ton.

Pour quelques dizaines de documents, le plus simple est souvent de les inclure directement dans la requête. Les modèles actuels acceptent des entrées très longues, et le cache de prompt rend le contexte répété beaucoup moins cher.

Quand votre base de connaissances est plus grande, utilisez la **recherche augmentée** (souvent appelée RAG) : on cherche d'abord dans vos documents les passages utiles à la question, puis on n'envoie que ces passages au modèle. Une base Postgres avec l'extension `pgvector` suffit pour la plupart des produits ; pas besoin d'une nouvelle infrastructure pour démarrer.

Dans les deux cas, écrivez les règles que le modèle doit suivre, comme vous briefez un nouveau collègue : qui sont les utilisateurs, ce qu'il ne doit jamais faire, quoi répondre quand il ne sait pas.

## Un appel, un workflow ou un agent ?

Il existe trois niveaux de complexité, et il faut choisir le plus bas qui fait le travail :

- **Un appel unique** : une entrée, une sortie. La classification, l'extraction et les résumés vivent ici.
- **Un workflow** : plusieurs étapes que votre code enchaîne dans un ordre fixe. Par exemple, extraire les champs, les vérifier dans votre base, puis rédiger une réponse.
- **Un agent** : le modèle décide quels outils appeler et quand s'arrêter. À réserver aux cas où le chemin ne peut pas être écrit à l'avance, car c'est plus cher, plus lent et plus difficile à tester.

Si vous pouvez dessiner le logigramme, c'est un workflow. Construisez celui-là.

## Mesurer avant de livrer

C'est l'étape que la plupart des équipes sautent, et la raison pour laquelle beaucoup de fonctionnalités IA sont discrètement désactivées un mois plus tard.

Rassemblez 30 à 100 exemples réels avec la réponse attendue. Faites tourner votre fonctionnalité sur tous et notez les résultats. Certaines vérifications peuvent être automatiques (a-t-il choisi la bonne étiquette ? les montants extraits sont-ils justes ?). Pour du texte libre, une courte grille d'évaluation et une relecture humaine vont très loin.

Gardez ce jeu d'exemples. À chaque changement de prompt, de modèle ou de contexte, relancez-le. « Ça a l'air mieux » devient un chiffre.

## Coût, latence et confidentialité

Trois questions que votre client ou votre service juridique poseront, alors répondez-y tôt :

- **Le coût** : vous payez au token, en entrée et en sortie. Estimez-le sur vos exemples réels, multipliez par votre volume mensuel, et vérifiez que le temps gagné vaut plus. Mettre en cache le contexte répété et utiliser un modèle plus léger ou un niveau d'effort plus bas pour les tâches simples peut diviser la facture.
- **La latence** : affichez la réponse en streaming pour que le texte apparaisse tout de suite, et gardez les tâches longues en arrière-plan.
- **La confidentialité** : sachez quelles données quittent vos serveurs, vérifiez les politiques de conservation et d'entraînement de votre fournisseur, signez un accord de traitement des données, et retirez les données personnelles inutiles. Pour des clients en Europe, c'est une question de RGPD, pas une option.

## Garder un humain dans la boucle quand l'erreur coûte cher

Laissez le modèle préparer, et une personne décider, dès qu'une action est difficile à annuler. Rédiger l'e-mail, pas l'envoyer. Ouvrir la demande de remboursement, pas payer. À mesure que la fonctionnalité prouve sa fiabilité, vous pouvez automatiser davantage. Faire le chemin inverse est beaucoup plus difficile.

## Un plan de deux semaines pour une première fonctionnalité

1. **Jours 1 et 2** : choisir la tâche avec la grille ci-dessus et rassembler 50 exemples réels.
2. **Jours 3 à 5** : écrire le prompt et le contexte, et construire le jeu d'évaluation. Itérer jusqu'à des scores suffisants pour montrer la fonctionnalité.
3. **Jours 6 à 8** : intégrer la fonctionnalité derrière un feature flag, avec un journal des entrées, des sorties et des coûts.
4. **Jours 9 et 10** : la tester avec quelques utilisateurs internes et recueillir leurs corrections.
5. **Ensuite** : l'ouvrir à un premier groupe de clients, suivre les chiffres, et ajouter les corrections au jeu d'évaluation.

Deux semaines ne donneront pas une fonctionnalité parfaite. Elles en donneront une vraie, avec des chiffres pour décider s'il faut aller plus loin.

Si vous voulez de l'aide pour choisir ou construire cette première fonctionnalité, [parlez-moi de votre produit](/fr#contact).
