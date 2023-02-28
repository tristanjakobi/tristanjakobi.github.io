const preBuilt = ["s", "amogus","amoamogus","amogusgus","amoamomogus","amoamomogusgus","mogus","amogu","amomogu","momogus","mogu","momogu","mogu mogu","mu","am","us","a","usa","amus","amoma","sugus","amomoma","sugugus","as","og","aaaaaaa","amam","usus","asmolgus","abigus","abominatiogus","beef","sugoma","what if","oh no","oh yeah","mug"]

class part {
    element;
    length;
    constructor(length, location){
        this.length = length;
        this.element = document.createElement("img");
        this.element.setAttribute("src", "docs/assets/images/parts/" + location.toLowerCase() + ".png");
    } 
}


let bottomBone = new part(-1, "bottombone")
let topBone = new part(-1, "topbone")


const topParts = {
    "amo": new part(3, "topvisorbody"),
    "am" : new part(2, "topvisor"),
    "us" : new part(2, "upsidedownlegs"),
    "a" : new part(1, "top"),

}

const middleParts = {
    "gug" : new part(3, "hole"),
    "gus" : new part(3, "morebody"),
    "mo" : new part(2, "body"),
    "gu" : new part(2, "body"),
    "o": new part(1, "body"),
    "g" : new part(1, "body"),
}

const endParts = {
    "gus" : new part(3, "legs"),
    "us": new part(2, "legs"),
    "ma": new part(2, "upsidedownhead"),
    "s" : new part(1, "tinylegs"),
}

function find(string, parts){
    for (const [key, value] of Object.entries(parts)) {
        let n = key.length;
        if(string.slice(0, n) == key){
            return value
        }
    }
    return ""
}


function findMiddle(string){
    for (const [key, value] of Object.entries(middleParts)) {
        let n = key.length;
        if(string.slice(0, n) == "gus"){
            if(string.slice(3,6) == "gus"){
                return new part(3, "hole")
            }
            return ""
        }
        if(string.slice(0, n) == key){
            return value
        }
    }
    return ""
}
function buildImage(string){
    let elem = document.getElementById("character")
    let s = string;

    let i = 0;
    let isBottomAtCurrentWord = false;
    let isTopAtCurrentWord = false;

    while(s.length > 0){
        let t = find(s, topParts);
        if(t == ""){
            if(!isTopAtCurrentWord){
                elem.appendChild(topBone.element.cloneNode(true))
                isTopAtCurrentWord = true;
            }
        }else{
            isTopAtCurrentWord = true;
            isBottomAtCurrentWord = false;
            s = s.slice(t.length, s.length)
            elem.appendChild(t.element.cloneNode(true));

        }

        while(true){
            let m = findMiddle(s);
            if(m == ""){
                break;
            }else{
                s = s.slice(m.length, s.length)
                elem.appendChild(m.element.cloneNode(true));
            }
        }

        let e = find(s, endParts);
        if(e == ""){
            if(!isBottomAtCurrentWord){
                elem.appendChild(bottomBone.element.cloneNode(true));
                isBottomAtCurrentWord = true;
            }
        }else{
            isTopAtCurrentWord = true;
            isBottomAtCurrentWord = false;
            s = s.slice(e.length, s.length)
            elem.appendChild(e.element.cloneNode(true));

        }

        i++;
        if(i>3){
            break;
        }
    }


        
}

function tryToGetImage(string){

    if(preBuilt.includes(string.toLowerCase())){
        var elem = document.createElement("img");
        elem.setAttribute("src", "docs/assets/images/" + string.toLowerCase() + ".jpg");
        elem.setAttribute("alt", string);
        return elem;
    }else{
        return false
    }
}



window.addEventListener('load', function () {
    document.getElementById("input").addEventListener('change', (event) => {
        event.preventDefault();
        let character = document.getElementById("character")
        character.innerHTML = '';
        let i = tryToGetImage(event.target.value);
        console.log(character)
        if(i){
            character.appendChild(i)
        }else{
            buildImage(event.target.value);
        }
    });;
  })
  