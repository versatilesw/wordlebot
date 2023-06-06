# Wordle Bot Technical Take Home

Congrats on making it to our technical evaluation!  To help us understand your capabilities with our front-end technologies, we've put together a fun little project - a Wordle Bot.

Your task is to create a user interface for our wordle solver API that gives the user recommendations for each guess in solving a wordle.  If you you aren't familiar with wordle, you can play a game here: [https://nytimes.com/games/wordle/index.html]([Wordle](https://nytimes.com/games/wordle/index.html)).

The user flow as follows:
1. User gets a suggestion including the initial first guess by the bot.
2. User enters in the puzzle clues from wordle (green, yellow, white colored squares) to pass back to the API.
3. API responds with the next guess which should be displayed to the user.
4. Repeat steps 2 & 3 until the all boxes are green.



You'll be expected to build and deploy a working application against the API.  This app has been designed to be no more than a few hours from start to finish.  Below are various details that you may find helpful in completing the project.

## Functional Requirements

1. Users should see an initial guess loaded from the API
2. Users should be able to enter in the puzzle clues back from Wordle, which will provide a new suggestion to the user
3. Upon submitting all greens, display a success message to the user and don't show or solicit any more suggestions.
4. Users should have responsive feedback when the app is interacting with the server.
    - Loading indicator while fetching the initial guess
    - When submitting clues to the API, the submit button should be disabled and the user should have a loading indicator.
5. Errors from the API should be displayed to the end user and handled appropriately.


## Example Visuals

The goal of this test is around implementing a web application.  To help, below are some sample visuals to help understand the requirements.  You are welcome to change the user experience as you see desire so long as it meets the above functional requirements.

### Iterating through the guesses
<img src="images/wordle-sample.png" height="400" />

### Completing the puzzle
<img src="images/wordle-sample-complete.png" height="400" />

### Handling initial load
<img src="images/wordle-sample-loading.png" height="400" />

### Handling submission load
<img src="images/wordle-sample-loading-2.png" height="400" />

### Error Handling
<img src="images/wordle-sample-error.png" height="400" />

## API Details

Endpoint:
POST https://interviewing.venteur.co/api/wordle

request body schema:

```tsx
type WordleRequestItem = {
	word: string;
	clue: string;
};

type WordleRequest = WordleRequestItem[];
```

response body schema:

```tsx
type WordleResponse = {
	guess: string;
}
```

sample request:

```tsx
[
	{
		"word": "serai",
		"clue": "gxyxx"
	}
]
```

sample response:

```tsx
{
	"guess": "barye"
}
```

There is some level of validation on the request object. Attempts to pass invalid input will likely end in an error. Examples:

| Error | Example message |
| --- | --- |
| Empty request body | Invalid request: must have a valid state object as the HTTP body |
| Passing in too many items (6 or more) | Invalid request: state must be an array with 0-5 items in it |
| Array entry is not an object | Invalid request: state item at index 0 is not a valid object |
| Array entry is missing “word” field OR ”word” field is not a string OR ”word” field is not 5 characters long | Invalid request: state item at index 0 does not have a 'word' string property that is 5 characters long |
| “word” field is not 5 alpha (a-z, A-Z) characters | Invalid request: state item at index 0 has a 'word' string property with invalid characters |
| Array entry is missing “clue” field OR ”clue” field is not a string OR ”clue field is not 5 characters long | Invalid request: state item at index 0 does not have a 'clue' string property that is 5 characters long |
| “clue” field is not 5 clue (g, G, y, Y, x, X) characters | Invalid request: state item at index 0 has a 'clue' string property with invalid characters |
| The set of items eliminates all the words in the dictionary (i.e. not solvable) | Invalid request: state leaves no remaining words in the dictionary |

## Project Details

In this repo, we've included a starter project with some of our technologies we use - React, Typescript, and Material UI.  The goal of the starter is to help accelerate the project and reduce the overall time commitment while focusing on some of the user experience requirements.  If you are comfortable with other libraries or methods of accomplishing functionality in the starter, please use what is comfortable for you.

To run this project, you can use `npm start`  This will run the app in development mode at http://localhost:3000

## Deployment Details

We largely use Azure and below we'll cover deployment instructions using a free Azure account.  If you are comfortable deploying on other platforms (AWS, Netlify, etc), you are welcome to choose your own hosting provider.

### Azure Instructions
Deploying on this on Azure should be free or at most cost pennies with pay-as-you-go if you are following these instructions.

1. Create a free Azure account or use an existing Azure account
2. Create a **Storage Account** in your subscription.  Standard storage and Local Redundancy is sufficient.
3. In the storage account, on the left nav, click **Data Management > Static Website**.
4. Enable the static website feature and set both index document name and error document name to ```index.html```
5. In the left nav under **Data Storage > Containers**, click into the ```$web``` container.
6. On your local machine, create a production React build with `npm run build`.
7. Upload the contents of `/build` into the ```$web``` container such that ```index.html``` and the associated react files are at the root of the container
8. Go to the primary endpoint listed in the **Static Website** page

## Submission

Email dev@venteur.co with the following:
1. Github repo link of the project
2. Link to the hosted web app
3. (Optional) Paragraph on implementation choices or any notes while reviewing the project


