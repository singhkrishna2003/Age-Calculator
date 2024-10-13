const button = document.querySelector("button");

const yourdays = document.querySelector(".yourdays");
const yourmonths = document.querySelector(".yourmonths");
const youryears = document.querySelector(".youryears");

const day = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");

const daye = document.querySelector(".dayempty");
const monthe = document.querySelector(".monthempty");
const yeare = document.querySelector(".yearempty");

const dayi = document.querySelector(".dayinvalid");
const monthi = document.querySelector(".monthinvalid");
const yeari = document.querySelector(".yearinvalid");

const dayh = document.querySelector(".dayh");
const monthh = document.querySelector(".monthh");
const yearh = document.querySelector(".yearh");

const color = getComputedStyle(document.documentElement).getPropertyValue('--Lightred');
const color1 = getComputedStyle(document.documentElement).getPropertyValue('--Smokeygrey');
const color2 = getComputedStyle(document.documentElement).getPropertyValue('--Lightgrey');

const headery = document.querySelector(".headeryear");
const headerm = document.querySelector(".headermonth");
const headerd = document.querySelector(".headerday");


var flags = [true, true, true, true];
var overallFlag = true;
button.addEventListener("click", () => {
    const currenDate = new Date();
    var inputdays = 0;
    var inputmonths = 0;
    var inputyears = 0;
    if(month.value.toString() == ""){
        monthe.style.display = "block";
        monthi.style.display = "none";
        coloring(month, monthh);
        flags[0] = false;
    }
    else if(month.value - 1 > 11 || month.value - 1 < 0){
        monthi.style.display = "block";
        monthe.style.display = "none";
        coloring(month, monthh);
        flags[0] = false;

    }
    else{
        monthi.style.display = "none";
        monthe.style.display = "none";
        inputmonths += parseInt(month.value) - 1;
        decoloring(month, monthh);
        flags[0] = true;
    }

    if(year.value.toString() == ""){
        yeare.style.display = "block";
        yeari.style.display = "none";
        coloring(year, yearh);
        flags[1] = false;
    }
    else if(year.value < 0 ||  year.value > currenDate.getFullYear()){
        yeari.style.display = "block";
        yeare.style.display = "none";
        coloring(year, yearh);
        flags[1] = false;
    }
    else{
        yeari.style.display = "none";
        yeare.style.display = "none";
        inputyears = year.value;
        decoloring(year, yearh);
        flags[1] = true;
    }

    if(day.value.toString() == ""){
        daye.style.display = "block";
        dayi.style.display = "none";
        coloring(day, dayh);
        flags[2] = false;
    }
    else if(day.value < 1 ||  day.value > (new Date(inputyears, inputmonths + 1, 0).getDate())){
        dayi.style.display = "block";
        daye.style.display = "none";
        coloring(day, dayh);
        flags[2] = false;
    }
    else{
        dayi.style.display = "none";
        daye.style.display = "none";
        inputdays = day.value;
        decoloring(day, dayh);
        flags[2] = true;
    }

    if(inputyears == currenDate.getFullYear()){
        if(inputmonths > currenDate.getMonth()){
            yeari.style.display = "block";
            coloring(year, yearh);
            flags[3] = false;
        }
        else if(inputmonths == currenDate.getMonth() && inputdays >= currenDate.getDate()){
            yeari.style.display = "block";
            coloring(year, yearh);
            flags[3] = false;
        }
        else{
            yeari.style.display = "none";
            decoloring(year, yearh);
            flags[3] = true;
        }
    }

    flags.forEach(fl => {
        if(!fl) overallFlag = false;
    })
    youryears.classList.add('fade-out');
    yourmonths.classList.add('fade-out');
    yourdays.classList.add('fade-out');
    setTimeout(() => {
        if(overallFlag){
            var agediff = currenDate.getFullYear() - inputyears;
            var monthdiff = currenDate.getMonth() - inputmonths;
            var daydiff = currenDate.getDate() - inputdays;

            if(monthdiff < 0){
                agediff--;
                monthdiff += 12;
            }

            if(daydiff < 0){
                if(monthdiff === 0) {
                    agediff--;
                    monthdiff = 11;
                }
                else monthdiff--;
                const prevmonthdays = new Date(inputyears, inputmonths, 0).getDate();
                daydiff += prevmonthdays;
            }
            agediff <= 1 ? headery.textContent = " year" : headery.textContent = " years";
            monthdiff <= 1 ? headerm.textContent = " month" : headerm.textContent = " months";
            daydiff <= 1 ? headerd.textContent = " day" : headerd.textContent = " days";
            
            youryears.textContent = agediff;
            // if(monthdiff == -1 )
            yourmonths.textContent = monthdiff;
            yourdays.textContent = daydiff;

            youryears.classList.remove('fade-out');
            yourmonths.classList.remove('fade-out');
            yourdays.classList.remove('fade-out');

            youryears.classList.add('fade-in');
            yourmonths.classList.add('fade-in');
            yourdays.classList.add('fade-in');
            
            youryears.classList.remove('fade-in');
            yourmonths.classList.remove('fade-in');
            yourdays.classList.remove('fade-in');
        }
        else{
            youryears.textContent = "- -";
            yourmonths.textContent = "- -";
            yourdays.textContent = "- -";

            youryears.classList.remove('fade-out');
            yourmonths.classList.remove('fade-out');
            yourdays.classList.remove('fade-out');

            youryears.classList.add('fade-in');
            yourmonths.classList.add('fade-in');
            yourdays.classList.add('fade-in');
        }
        overallFlag = true;
    }, 500);
})

function coloring(bordering, header){
    bordering.style.border = `2px solid ${color}`;
    header.style.color = color;
}
function decoloring(bordering, header){
    bordering.style.border = `1px solid ${color2}`;
    header.style.color = color1;
}