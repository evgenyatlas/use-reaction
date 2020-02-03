import { isArray } from "../../utils"

function createOff(ee) {
    return function (actionType, fn) {
        if (isArray(actionType))
            actionType.forEach(action => ee.off(action, fn))
        else
            ee.off(actionType, fn)
    }
}

export default createOff