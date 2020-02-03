function ee(subscription = {}) {
    let subs = subscription
    return {
        on(type, handler) {
            (subs[type] || (subs[type] = [])).push(handler)
        },
        once(type, handler) {
            //TODO:
        },
        off(type, handler) {
            if (subs[type]) {
                subs[type].splice(subs[type].indexOf(handler) >>> 0, 1);
            }
        },
        emit(type, evt) {
            (subs[type] || []).slice().map((handler) => { handler(evt); });
            (subs['*'] || []).slice().map((handler) => { handler(type, evt); });
        }
    }
}

export default ee