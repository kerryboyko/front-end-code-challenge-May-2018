# Applicant Notes

## Decisions and compromises

Code challenges are by their nature difficult to optimize because it's not always 100% clear what a particular reviewer prioritizes in their codebase.  Some would prefer more elegant and functional code, others more object-oriented.  Some prefer speed over robustness, others robustness over speed.  For this codebase, I made the following decisions: 

### Anything worth doing is worth doing well.  

I plan on offering this on my Github as a relevant sample of work for those employees willing to accept it in lieu of a coding challenge. For that reason, I've tried my best to polish this up, leaving no stone unturned, going far beyond the typical 1-3 hours recommended, taking no chances that the one feature I cut for time would be the one feature the evaluator would be looking for.  

(Writing this APPLICANT_NOTES.md file itself will probably take 1-3 hours, by way of comparison.)

### Changes to the backend were designed to match real-world conditions

There are changes made to the original backend of the project - specifically, adding a "categories.json" file containing information not available on the products.json file.  While I could have hardcoded the information in categories.json into the application, this isn't how a real-world application would likely operate, so I made sure to achieve that information with a GET request, as if it had to be retrieved from a database somewhere in a datacenter. 

### Packages added: Lodash, Superagent, and Redux

I attempted to reduce the number of NPM packages that I needed to add to package.json.  The three most important were Lodash, Superagent, and Redux. Here's why I chose those packages.

* Lodash - Lodash's "get" method provides a viable alternative to the lack of a native Javascript "maybe" syntax.  For example, in an object (let foo = {a: { b: "c"}}), referencing foo.d.b will throw an error, as you cannot get a property on an undefined property (even though you can get an undefined property - it will just return "undefined").  While there's a proposal to allow a question mark syntax, the lodash/get function provides a way to handle these failures elegantly; which may occur because a value has not yet been defined, but *will be* after some asynchronous action. "lodash/pick" and "lodash/omit" are useful as well.  

* Superagent - While there are a number of ways to make API calls, Superagent tends to be my favorite. It's simpler to setup than Axios but just as powerful and can return chainable promises, like Axios.  (If necessary, one could use XMLHttpRequest, but that would be verbose and torturous.)

* Redux - There is a new state manager for React every day. Some profer using RxJS Observables, others MobX, still others create a de-facto event bus component, and with React 16+, using the Provider that grants access to context is an option.  Redux, on the other hand, was chosen for three reasons: 1) It's the one I'm most familiar with personally, 2) I like the functional design, as it makes it easy to test in isolation, 3) Redux dev-tools (specifically redux-logger) make it easy to debug your application during the design phase. One final consideration is that Redux allows you to have a single action trigger differences in multiple reducers or a single reducer respond to multiple actions.  

### Normalizing product data and creating hash references

Wherever possible, it is a good practice to avoid duplication of data in the state; if a value is changed in one reference, it's hard to determine if the value is changed in all references. 

For this reason, I create a unique hash (productId) for each product and where required, and where I had to store products in an array, I stored only the productId and relevant information.  For example, the cart object in state only contains two properties: propertyId and quantity.  To de-normalize those values back into an array, I merely pass the state (most often in mapStateToProps) to a utility function "getFullCart". 

There's a very minor efficiency realized here, as in Javascript, looking up an object by property is O(1), compared to finding an object in an array, which is worst case O(n);  There are times I use Array.prototype.find or Array.prototype.findIndex when searching through an array generated during runtime, but these arrays rarely get to such a size that they make anything but a negligible performance difference, and code readability is more paramount.  

### BEM Naming Convention for CSS

I've tried to use BEM naming convention for CSS, for maintainability and at-a-glance "where does this go" CSS debugging. 

### Non-standard Redux actions/reducers

While I am a fan of Redux, I'm not necessarily a fan of how Redux organizes it's files, with seperate /actions and /reducers files. Seperation of concerns, to me, suggests that actions and reducers that deal with the same information should be closer together in the code.  For that reason, I've taken a page out of Vue's state manager, Vuex, and created a modules folder, each exporting types, actions, and reducers in a default object. 

### Not Responsive / Not Pixel Perfect

While the application looks as close to the screenshots as I can make it, the site was not designed to be responsive.  Certainly it is structured in such a way that the only changes needed would be addition of a few @media queries in the CSS file, but that would add significantly to the time of the project, and no screenshots or guidelines were provided on how it should look on mobile devices. 

Additionally, since the screenshot files had no annotation, I often had to guess at distances between objects and specific values.  I'm also not 100% sure I matched the fonts (I chose Roboto for sans-serif and Playfair Display for serif, as these seemed to be the best match out of the Google Fonts library).  As for icons, I used existing unicode characters where appropriate and Font-Awesome (accessed via CDN in index.html) to fill in some gaps. 



# Testing:

## Compromises and pitfalls

### Focus on testing application state. 

With one exception, (/src/Product/ProductOrderButtons.js), the rest of the application is stateless. Instead, the vast majority of the state is contained in the Redux reducers. For that reason, I've chosen to focus on where the tests would do the most good - the reducers. After all, this is where most of the interconnected code lies, and where changes affect the entire application. 

Now, it is possible to use Enzyme or another testing framework to mock the Redux Store and the router, and test every component, but for the most part, testing the components is not as important to long-term stability as making sure the state behaves as expected. 

### No E2E tests

No E2E tests are included, limiting to only functional testing.  Nightwatch or Nightwatch/Selenium seem like overkill to set up for this project. 

### Altering App.test.js

While one would never usually remove a test, in this case, the inclusion of jsdom created a scenario where the test suite was breaking. 

This is NOT to say that the tests *failed*, but that for some reason, at least in the development environment, inclusion of jsdom (required for App.test.js) would create ECONNECT errors on port 80.  Despite googling for an answer, no easy answer was forthcoming. 

One thought might be that JSDom does not play well with Redux, specifically React-Redux's <Provider/> component. 

App, instead, will be tested as a *react class,* instead of creating a mock render to JSDom. 

## Running the tests

### NPM
Ensure the server is running with 

```
npm run start
```

then, in a new window, run

```
npm run test
```

### Yarn

Ensure the server is running with 

```
yarn start
```

then,, in a new window, run 

```
yarn test
```