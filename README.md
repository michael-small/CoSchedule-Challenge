# My take on CoSchedule's Coding Challenge
## A React App for the xkcd API

My take on a headless API that reads [xkcd's](https://xkcd.com/) API and displays xkcd comics and their meta information.

## Project Specs
The general idea of this challenge is to create a headless API that retrieves some data (e.g. xkcd comics) for the client. 
* Supports CRUD operations related to a user's "favorite" responses. 
* Should be searchable by the client. 
* Should support creating and updating comments by users. 
* Doesn't have to be styled well, but I'll give it a go because I'm tired of being confined to Angular Material UI or existing CSS from starter code. 
* BONUS: Simple username/password authentication endpoint

### Links
* [xkcd API](https://xkcd.com/json.html)
* [Challenge specs/info](https://drive.google.com/file/d/1hp3cX3iKbKVR0ObMXdzb7pIsZinA_krV/view)
* [My hiring packet responses](https://docs.google.com/document/d/1LgYmcGxWLrovjyu68215bAwZrTWMYDqbHf9vk_Cv2ps/edit#heading=h.gjdgxs)
* [Software Engineer job description](https://www.ziprecruiter.com/jobs/coschedule-62154287/software-engineer-9919034d)

## xkcd API basics
Retrieves [xckd comics](https://xkcd.com/) by their comic number. Each endpoint is a variation on 
`https://xkcd.com/{integer}/info.0.json`, where `{integer}` is a number ranging from 1 to the current comic number (2329 as of Jul 7, 2020). One edge case is that 404 doesn't exist, which I am 99.99% sure is a joke about the HTTP 404 error response code. Though as far as programming easter eggs go, I suppose the Randall Munroe, the comic's creator, didn't have the foresight to start the comics at 0.

