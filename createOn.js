import { isArray } from "../../utils"

function createOn(ee) {
    return function (actionType, fn) {
        if (isArray(actionType))
            actionType.forEach(action => ee.on(action, fn))
        else
            ee.on(actionType, fn)
    }
}

export default createOn