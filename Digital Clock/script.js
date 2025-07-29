let is24HourFormat = false;

function updateClock(){
    let now = new Date();
    let hrs = now.getHours();
    let min = now.getMinutes().toString().padStart(2, "0");
    let sec = now.getSeconds().toString().padStart(2, "0");
    let ampm = "";

    const days = [
        "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    document.getElementById("day-name").textContent = days[now.getDay()];
    document.getElementById("day-num").textContent = now.getDate().toString().padStart(2, "0");
    document.getElementById("month").textContent = months[now.getMonth()];
    document.getElementById("year").textContent = now.getFullYear();

    if(!is24HourFormat){
        ampm = hrs >= 12 ? "PM" : "AM";
        hrs = hrs % 12;
        if (hrs === 0) {
            hrs = 12;   
        }
        document.getElementById("format").style.display = "block";
    }else{
        document.getElementById("format").style.display = "none"; 
    }
    
    hrs = hrs.toString().padStart(2, "0");

    document.getElementById("hrs1").textContent = hrs[0];
    document.getElementById("hrs2").textContent = hrs[1];
    document.getElementById("mins1").textContent = min[0];
    document.getElementById("mins2").textContent = min[1];
    document.getElementById("sec1").textContent = sec[0];
    document.getElementById("sec2").textContent = sec[1];
    document.getElementById("format").textContent = ampm;

    const f12hrBtn = document.getElementById("12hr");
    const f24hrBtn = document.getElementById("24hr");

    if (is24HourFormat) {
        f24hrBtn.classList.add("active");
        f12hrBtn.classList.remove("active");
    } else {
        f12hrBtn.classList.add("active");
        f24hrBtn.classList.remove("active");
    }
}

function switchFormat(format) {
    if (format === 12) {
        is24HourFormat = false;
    } else {
        is24HourFormat = true;
    }
    updateClock();
}

updateClock();
setInterval(updateClock, 1000);
