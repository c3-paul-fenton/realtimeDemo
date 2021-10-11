function increaseRate() {
    var INITIAL_RATE = 5;
    var RATE_INCREMENT = 5;
    var currentRate = RateState.fetch().objs;
    var newRate = null;
    if (currentRate.length > 0) {
        newRate = currentRate[0].rate + RATE_INCREMENT;
    } else {
        newRate = INITIAL_RATE;
    }
    RateState.upsert({
        id: "0",
        rate: newRate
    });
}