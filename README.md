# Flappy Bird Style Game

Flappy Bird was a hit mobile game in mid 2013. This game is similar in simplicity, but instead of flying a bird between pipes, users will fly ships around obstacles to go as far as possible. Users press the space bar or click the window to make the ship go up and release and the ship will fall. The main issue I had with the flappy bird game is that it was too difficult to judge how to fly the bird because it would fall so quickly. I plan to experiment with the rise and fall speeds to make the game challenging but not so hard that users fail so quickly.

## Functionality and MVP

With this game, users will be able to:
- [ ] Use either the space bar or mouse click to raise and lower the ship.
- [ ] Track their current score and personal best for the session.
- [ ] Change background layouts.
- [ ] Choose between different ships.
- [ ] I would like to also include the option to upload a custom theme for the game.

This project will also include:
- [ ] A production README

## Wireframes

The app will be a single page app that has a modal for uploading backgrounds if the user would like. The game screen will take up most of the screen with ship options to the left and preloaded themes on the right. Game instructions and my contact information will be under the game screen.

![Wireframes](http://res.cloudinary.com/dfmvfna21/image/upload/v1479101575/JS_Project_mockup_wziokb.png)

I will use the cloudinary upload widget to handle uploading user's custom backgrounds for custom themes.
![Wireframes](http://res.cloudinary.com/dfmvfna21/image/upload/v1479101575/Upload_Widget_jmvtyv.png)


## Architecture and Technologies

The game will use the following technologies:

- Vanilla Javascript and JQuery to handle game logic
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering
- Webpack to bundle

I also plan on using the following scripts in the game:

`Board.js` This will handle rendering and handing the scenes for the game. Including background, floor, ceiling, and obstacles.

`Ship.js` This will handle controlling the ship, and any logic needed to control how the ship moves on the DOM.

`Game.js` Handles any game logic such as starting, stoping, and scores.

## Timeline

### Day 1
Set up the project, get webpack set up, start to learn how to use `Easel` to begin rendering a stage on the screen. Goals for the day:
- Get webpack and all my packages setup
- Render some objects on the screen with Canvas!
- Get cloudinary widget set up.

### Day 2
Learn how to render the objects that I want on the canvas using `Easel`. Learn how to get objects moving across the screen and begin implementing logic for the game. Goals for the day:
- Get objects rendering and moving across the screen
- Have themes render. Have custom themes rendering as well.
- Possibly start to have the different ships rendering on the screen.

### Day 3
Implement the rules for the game. The game ends when a user runs into an object, the ceiling, or the floor. Score is compared to the top score and updated if necessary. Ship moves up and down at a rate that is challenging but not impossible for users. Goals for the day:
- The ship moves up and down, speed is fine tuned to make the game enjoyable
- Scoring works
- Game is playable.

### Day 4
Style the page around the stage. Make sure that ships are interchangeable, themes are interchangeable, and users can make custom themes. Goals for the day:
- Game is completely functional and bug free
- Page is styled and all works bug free
- Ships and themes are interchangeable

## Bonus Features
- Users can upload custom ships and use them
- Users can change the speed that obstacles move towards them and change rise and fall speeds of the ship.
