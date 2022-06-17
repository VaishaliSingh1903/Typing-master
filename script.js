const dictionary = ["Vexillology",  "Inamorata", "Zooid", "Churrasco", "Dauntless", "Interesting", "Syncope", "Patronized" , "Paradoxes", "Agglutinative"];


const word_typing = document.querySelector(".word-typing p"),
inpField = document.querySelector(".wrapper .input-field"),
correct_tag = document.querySelector(".corrects span"),
timer_tag = document.querySelector(".timer span"),
start_btn = document.querySelector("button"), 
performace_tag = document.querySelector(".performance span");


let time, max_time = 10 , time_left = max_time, current = 0, correct_count = 0, is_typing = false;

function random_word(){
    let word_index = Math.floor(Math.random() * dictionary.length);
    word_typing.innerHTML = "";
    dictionary[word_index].split("").forEach(span => {
        let span_tag = `<span>${span}</span>`;
        word_typing.innerHTML += span_tag;
    });
    document.addEventListener("keydown", () => inpField.focus());
    word_typing.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    const correct_word = word_typing.querySelectorAll("span");
    let typed_word = inpField.value.split("")[current];

    if(current < correct_word.length -1 && time_left > 0 ){
        // console.log(current,correct_word.length);
        if(!is_typing){
            time = setInterval(initTimer,1000);
            is_typing = true ;
        }

        if(typed_word == null){
            current--;
            correct_word[current].classList.remove("correct","incorrect");
        }
        else{
            if(correct_word[current].innerText == typed_word){
                correct_count++;
                correct_word[current].classList.add("correct");
            }
            else{
                correct_word[current].classList.add("incorrect");
                // console.log("Incorrect");
            }
            current++;
        }
        
        correct_word.forEach(span => span.classList.remove("active"));
        correct_word[current].classList.add("active");
        
        let wpm = Math.round(((correct_count)  / 5) / (max_time - time_left) * 60);
        if(wpm < 0 || !wpm || wpm === Infinity){
            wpm = 0;
        }
        correct_tag.innerText = correct_count;
        // console.log(current,correct_word.length);
    }
    else{
        if(correct_word[current].innerText == typed_word){
            correct_count++;
            correct_word[current].classList.add("correct");
        }
        else{
            correct_word[current].classList.add("incorrect");
            // console.log("Incorrect");
        }
        let wpm = Math.round(((correct_count)  / 5) / (max_time - time_left) * 60);
        if(wpm < 0 || !wpm || wpm === Infinity){
            wpm = 0;
        }
        correct_tag.innerText = correct_count;
        if(Math.round((correct_count/current) * 100) > 90){
            performace_tag.innerText =  String.fromCodePoint(0x1F44D) ;
        }
        else{
            performace_tag.innerText  = String.fromCodePoint(0x1F44E)  ;
        }
        // console.log("end");
        inpField.value = "";
        clearInterval(time);
    }
    
}

function initTimer(){
    if(time_left > 0){
        time_left--;
        timer_tag.innerText = time_left;
    }
    else{
        clearInterval(time);
    }
}

function start_agn()
{
    random_word();
    inpField.value = "";
    clearInterval(time);
    time_left = max_time, current = 0, correct_count = 0, is_typing = false;
    timer_tag.innerText = time_left;
    performace_tag.innerText = "";
    correct_tag.innerText = correct_count;
}

random_word();
inpField.addEventListener("input",initTyping);
start_btn.addEventListener("click",start_agn);