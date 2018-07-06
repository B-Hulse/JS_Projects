counters = new Array;
counters[0] = 0;
display = document.getElementById("counter");
max_counter = 1000000000000000;
//1000000000000000
    var padding = "";
    for (let x = 0;x < (""+max_counter).length - 1;x++){
        padding+= "0";
    }
function clicked() {
    counters[0]++;
    for (let i = 0; counters[i] > 0; i++) {
        if (counters[i] == max_counter) {
            counters[i] = 0;
            if (counters[i+1] === undefined)
            {
                counters[i+1] = 1;
            }
            else {
            counters[i+1]++;
            }
        }
        else {
            break;
        }       
    }
    printCount();
}

function printCount() {
    var i = 0;
    var countStr = "";
    for (; counters[i+1] != undefined; i++);
    console.log(i);
    for (;i >= 0; i--) {
        if (counters[i+1] == undefined){
            countStr += counters[i];
        } else {
        var str = "" + counters[i];
        var cnt = padding.substring(0,padding.length - str.length) +str;
        countStr+= cnt;
        }    
    }
    display.innerHTML = countStr;
}