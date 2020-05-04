# Winged Velociraptors

A game based on One Night Ultimate Werewolf, but tailored specifically for our college friend group trying to attribute
any card actions based on each individual's personality. 

## Installs

NPM Installs on Client side

```
npm install
npm install antd 
npm install react-router-dom
npm install sass
npm install formik
```

## Gameplay
* 5 Minute Rounds where the Winged Velociraptors try to avoid being discovered and exposed. 
* The Dorsal Fin Gang tries to discover the Winged Velociraptors and expose them in a majority vote

## Card Types / Play Order
These are listed in wake-up order, with 11/12 not waking up and having passive abilities

1. Winged Velociraptor
2. Sydney
3. Rachel
4. Jake
5. Austin
6. Annalise
7. Hannah
8. Daniel
9. Isaac 
10. Cat
11. Lucas
12. Josh

### Winged Velociraptor
Try to Blend in with the Dorsal Fin Gang and not be killed
### Sydney - Witch
Casts a sleeping spell on another player. That player does not wake up for their phase (more precisely they will open their eyes, see that they were put to sleep, and not perform an action). 
### Rachel - Klutz
Phone Makes a noise to alert other players to her innocence
### Jake - I'm Right
Shifts all players cards to the right (the exception being the Josh)
### Austin - No You're Not
Shift all players cards to the left (the exception being the Josh)
### Annalise - Unsure
Views another player's card and can decide to switch cards or not
### Hannah - Troublemaker
Switches two other players cards with each others
### Daniel - Drunk
Switches card with one from the center card without looking at it
### Isaac - Insomniac
Wakes up and views their own card
### Cat - Exposer
Flips over one of the center cards
### Lucas - Tanner
(Passive) Wins if he is killed
### Josh - Samurai
(Passive) Cannot be swapped or stolen (other players don't know if swaps didn't happen) 


## Strech Goals
* Timer Music
* Sound Recording for each player
* Add Ellie as Villager or another player... 
* Make Josh a Villain??? (or Annalise) otherwise too OP
