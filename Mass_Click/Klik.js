counters = new Array;

// Max = 1000000000000000

function clicked() {
    counters[0]++;
    for (let i = 0; counters[i] > 0; i++) {
        if (counters[i] == 1000000000000000) {
            counters[i+1]++;
        }
        else {
            break;
        }       
    }
    
}