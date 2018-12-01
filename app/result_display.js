const Observable = require('rxjs').Observable;

// compute #positive, #negative, #neutural
// take an observable of objects with 'score' field assigned
function simple_classification(results) {
    let positive = 0;
    let negative = 0;
    let neutural = 0;

    return Observable.create(observer => {
        results.subscribe({
            next: res => {
                if (res.score > 0) positive++;
                else if (res.score < 0) negative++;
                else neutural++;
            },
            error: err => { observer.error(err) },
            complete: () => {
                observer.next({
                    positive: positive,
                    negative: negative,
                    neutural: neutural
                });
                observer.complete();
            }
        });
    })
}

module.exports = simple_classification;