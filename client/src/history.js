//because we want to use progmatic navigation inside actions, we are creating our own history object oppose
//to default created by react-router. We do it because it would be more convniet to import and use our own object, 
//when to pass it every time we want to navigate inside actions from components (where it's available)

import { createBrowserHistory } from 'history';

export default createBrowserHistory();