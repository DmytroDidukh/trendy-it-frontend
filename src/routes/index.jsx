import React from "react";
import { Route, Switch } from "react-router-dom";

import {Categories} from "../components";
import {ProductListPage, ProductDetailPage, Cart, ThanksPage} from "../pages";

const Routes = () => {

    return (
        <Switch>
            <Route exact path='/' component={Categories}/>
            <Route exact path='/cart' component={Cart}/>
            <Route exact path='/thanks' component={ThanksPage}/>
            <Route exact path='/:category' render={(routerProps) => <ProductListPage {...routerProps} />}/>
            <Route exact path='/:category/:subcategory/:id' render={({match}) => <ProductDetailPage productId={match.params.id}/>}/>
        </Switch>
    )
}

export default Routes;
