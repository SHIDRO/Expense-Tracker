import React, {useState, useEffect} from 'react';

let globalState = {};
let listeners = [];
let actions = {};

const useStore = (shouldListen = true) => {
    const setState = useState()[1];

    useEffect(() => {
        if(shouldListen){
            listeners.push(setState);
        }

        return () => {
            if(shouldListen){
                listeners = listeners.filter(li => li !== setState);
            }
        }
    }, [setState, shouldListen]);

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = {...globalState, ...newState};
        for(const listener of listeners){
            listener(globalState);
        }
    }

    return [globalState, dispatch];
}

export function initStore(initialState, initialActions){
    if(initialState){
        globalState = {...globalState, ...initialState};
    }
    actions = {...actions, ...initialActions};
}

export default useStore;