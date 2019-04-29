import React, { Component } from 'react';
import ListBooksComponent from './ListBooksComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EditBooksComponent from './EditBooksComponent';

class MainApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1 style={{"margin-bottom": "4%"}}>Test-assignment for Ignite</h1>
                    <Switch>
                        <Route path="/" exact component={ListBooksComponent} />
                        <Route path="/books" exact component={ListBooksComponent} />
                        <Route path="/books/:id" component={EditBooksComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default MainApp