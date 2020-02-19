##Game
**AdVentures Capitalist** is an idle business sim-game.
##Description
The player can buy business and win capital from the business, hire a manager to collect win for the player, and upgrade the business to win more money.
##Gameplay
The game starts with a fixed capital, and 10 businesses to buy. Each business will unlock once the player has enough money to buy the business, hire the manager or upgrade the business.
#Implementation
The game is implemented in Typescript and is an offline game, this means that the game will not restore session once the game is closed, so the backend side of the game is not implemented yet.
##Backend
All the logic for the game status is held in Connection class, which can be easily overriden to connect to a proper server.
A proper backend would be easily implemented using node.js but since the lack of time and having no recent experience with developing backend part, this backend was not implemented.
The Connection class generates 10 business, with a small value for purchase and time to collect the money from businesses, so the gameplay to be fast. The implementation was only for test, 
and things could have been calculated better so the game to be more interactive.
##FrontEnd
The frontend is implemented using MVC (Model View Controller) pattern, one of the best approach when it comes to game development,
because the views can be easily updated without any change on the other classes that contain the game logic.
The frontend implementation is made using pixi.js game engine. 
##Views
The game contains to major view.
- On view holds the game Stats, that contains game logo, and money status, and could contain different information in the future, in-app purchase info, etc
- The other major container contains all businesses. Each business contain 3 level containers, one buy button, one hire manager button, one collect button and one upgrade button. 
Every button will enable once the player has enough money or the time has passed.
- **Building levels** are now 3, first uses an image of a street cart, second uses an image of a small store, and third uses an image of a supermarket (larger building).
This could be changed with different levels, but is true that in the recent implementation, there are only 3 levels and could have been implemented better, using an array for the levels, now are hardcoded (bad design call).
- **Buy button** is available only when the building has level 0. If the player has no money to buy a specific building, the status goes from enable to disable, and button texts becomes "NO MONEY"
- **Hire manager** is available once the building is bought, and gets enable only if the player has enough money to hire the manager. The "payment" is made only once, and not monthly, and that would be a nice feature for the game.
- **Collect button** is available once the building is bough, and gets enable only if the time to collect has passed. 
A nice feature would be to show the progress of time on the yellow circle, but due to lack of time, this was not implemented.
- **Upgrade button** becomes available once the manager is hired, and gets enabled only when the player has enough money to buy the upgrade. A nice feature would be to show to level number somewhere, but I could not find the proper way to display it.
A nice feature would be to add some timing to the upgrading feature, meaning that the upgrade should take some time before being able to make another upgrade.
##Model
The game model is made by the BusinessVO class that will contain all data regarding a business.
Here we can find the current level, amount won for each level, the cost for each level, the time before the money can be collected, the name of each level,  the time before an upgrade can be made.
##Controllers
The game controller is also the main class of the game, AdVentureCapitalist class. Another controller class is the class for the connection to the server (that now is a mock server).
This game controller will listen to connection events, and then will notify the views about the data that needs to be updated.

#Usage
To compile the game, run `tsc` in the command line, in the main folder of the game. The game should be already compiled (latest version).
To play the game, run a local server and open `index.html` file.

#Future release
Things I would like to do for this if I had more time were: 
- make the game responsive, for now the game is not responsive, but for that I would need a proper design layout
- prettier animations on the update of the game stats, like progress show for the remaining time to collect money, better level view 
- better display of the money, for now is not really clear what the price and the amount to collect are
- specific assets for each business, regarding the type of business
- add animations for business upgrade (cross-fade for the levels, confetti, fireworks, or other interesting effects)
- a backend server 

 