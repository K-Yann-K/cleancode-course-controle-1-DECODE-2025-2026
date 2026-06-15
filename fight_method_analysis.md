# Analyse de la méthode fight

La méthode fight bien que fonctionnel n'as pas été écrite en faisant du clean code. Plusieurs points sur le fichier index.ts amènent à une réecriture du code pour une meilluere maintenabilité et lisibilité.

## Utilisation des if/else
Il est préférable d'éviter d'utiliser des if/else en règle général. Sur ce code il y en a en grande quantité et imbriqué entre eux. Il faudrait remplacer ça par l'utilisation d'if unique, polymorphisme, ou une règle métier. 
Pour la première option il faut commencer par le else ( qui devient donc un if)

## Responsabilités
La méthode à un trop grand nombre de responsabilités. Elle gère aussi bien l'état du jeu que les points de vie en passant par l'attribution des armes et les dégats du joueur/ennemi. C'est donc contraire au principle solid (single responsability principle). il faudrait décomposer ça en plusieurs sous fonctions spécifiques. Chacunes ayant un nom intuitif et auto-descriptif de la logique appliquée

## typage any
L'utilisation d'any est plutôt contraire au clean code et enlève l'intérêt du Typescript en plus d'être une potentielle source d'erreur car ce dernir ne l'accepte pas/plus selon certaine version (déjà rencontrée des erreurs de redéploiement de projet via l'utilisation de ce typage)
Dans ce cas il faut utiliser une interface

## Utilisation du switch
- Pour fight on a deux switch qui ont le même objectif. On peut condenser ça dans une fonction
- le switch est d'ailleurs long car il y a une modification pour chaque arme. 

Il faut déplacer ce calcul dans une fonction

## Pureté de la méthode
La fonction fight n'est pas pure car elle dépend de weaponList qui est modifié durant la méthode

## Valeurs magiques
Il faut utiliser des constantes plutôt que de simples valeurs directement dans le code

## Commentaire
Le code dispose de commentaire. Il faut que le code soit auto-descriptif avec des noms de fonctions et variables parlantes et claires

## Retour de fonction
- la longueur du tableau retour est variable selon le cas
- fight retourne un tableau qui dépend du positionnement, préférable un objet pour éviter des erreurs

### secondaire
- if(playerHealth <= 0) plutôt playerHealth = Math.max(0, playerHealth);
- la fonction init contient deux fois la même ligne weaponList = weapon;
- simplifier le if/else de la fonction newRound
