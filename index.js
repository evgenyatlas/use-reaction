import React, { useEffect, useCallback, useContext } from 'react'
import EE from '../ee'
import createOn from './createOn'
import createOff from './createOff'

export const on = Symbol("reaction-on")
export const off = Symbol("reaction-off")

export const reactionContext = React.createContext(null)

export function useReactionMiddleware(store) {
    const ee = new EE()

    store.getState[on] = createOn(ee)
    store.getState[off] = createOff(ee)

    return next => {
        return action => {
            const result = next(action)
            ee.emit(action.type, action)
            return result
        }
    }
}

export function useReaction(actionType, fn) {
    const store = useContext(reactionContext)
    useEffect(function () {
        store.getState[on](actionType, fn)
        return () => {
            store.getState[off](actionType, fn)
        }
    }, [])
}

export function ReactionProvider({ store, children }) {
    return (
        <reactionContext.Provider value={store}>
            {children}
        </reactionContext.Provider>
    )
}