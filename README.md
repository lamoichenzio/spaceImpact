# SpaceImpact

## The Game
### The game consist in a very light reply of the game SpaceImpact. When the shuttle shoot and hit an enemy, the enemy is destroyed and the palyer earns 100 points. When an enemy hit the shuttle, the player lose 1 life of 3. The shuttle can be moved only up and down. Every 2 second the moving speed and the respwan speed of the enemy are increased.

## The Space
### The space consists in a table 25x60 created programmatically in which each cell have an id in this format: y-x where y is the row index and x the column index. In this table, all the elements are only represented wich a defined css class. In the space every empty cell is represented by the css class "empty-cell". 

## The Shuttle
### The shuttle is represented by the css class "shuttle". It is placed on the table in the initial position defined in the x and y array defined in the Shuttle class. In the class are also defined the action that the shuttle can do: move up and move down.

## The Fire
### The fire is represented by the css class "fire". It is a class containted in shuttle.js because there is a strong relationship beetwen them. In the fire class is also defined the function that moves the fire trhought the space. In this function there is also a cotroll for determining if the fire hits the enemies.

## The Enemies
### The enemies are represented by the css class "enemy". In the index.js there is a controllor for the loop of the respawn of the enemies.

## congif.js
### In the config.js file are defined all the constants used in the others file of the game.

## PageCreator
### In this class are defined all the html parts of the page, and are programmatically added to the document body.

## index.js
### In the index.js there is all the logic of the game.

## 
## 
#### For more details see the comments in the classes.

