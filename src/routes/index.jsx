import React from "react";
import { Route, Switch } from "react-router-dom";

import {
    ProductListPage,
    ProductDetailPage,
    Cart,
    ThanksPage,
    Home,
    AboutUs,
    Production,
    PaymentAndShipping,
    Contacts,
} from "../pages";

const Routes = () => {

    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/cart' component={Cart}/>
            <Route exact path='/thanks' component={ThanksPage}/>
            <Route exact path='/about-us' component={AboutUs}/>
            <Route exact path='/contacts' component={Contacts}/>
            <Route exact path='/payment-and-shipping' component={PaymentAndShipping}/>
            <Route exact path='/production' component={Production}/>
            <Route exact path='/catalog' component={ProductListPage}/>
            <Route exact path='/:catalog/:id' render={({match}) => <ProductDetailPage productId={match.params.id}/>}/>
        </Switch>
    )
}

export default Routes;
