import { h, app } from "hyperapp";
import { Route, location } from "hyperapp-hash-router/src/index";
import { Question } from "../common/components/Question";
import { decodeState } from "./utils/decodeState";

const QuestionView = (state, actions) => ({ match, location }) => {
    return (
        <Question
            state={state}
            actions={actions}
            match={match}
            location={location}
        />
    );
};

const state = { location: location.state };
const actions = { location: location.actions };

const view = (_state, _actions) => {
    const appState = decodeState(window.location.hash);

    return (
        <div className="app app-cattell">
            <Route path="/" render={QuestionView(appState)} />
            <Route parent path="/session/:session" render={QuestionView(appState)} />
        </div>
    );
};

const main = app(state, actions, view, document.body);

/* const unsubscribe = */ location.subscribe(main.location);