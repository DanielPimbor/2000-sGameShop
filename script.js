const sav = document.getElementById("sav");
const ablak = document.getElementById("ablak");
const kartyak = Array.from(sav.querySelectorAll(".kartya"));
const pottyokDiv = document.getElementById("pottyok");
const elozo = document.getElementById("elozo");
const kovetkezo = document.getElementById("kovetkezo");

let index = 0;

// pöttyök létrehozása
const pottyok = kartyak.map((_, i) => {
    const p = document.createElement("div");
    p.className = "potty";
    p.addEventListener("click", () => ugras(i));
    pottyokDiv.appendChild(p);
    return p;
});

function frissit() {
    const k = kartyak[index];
    const eltolas = k.offsetLeft + k.offsetWidth / 2 - ablak.offsetWidth / 2;
    sav.style.transform = `translateX(${-eltolas}px)`;

    kartyak.forEach((el, i) => el.classList.toggle("aktiv", i === index));
    pottyok.forEach((el, i) => el.classList.toggle("aktiv", i === index));
    elozo.disabled = index === 0;
    kovetkezo.disabled = index === kartyak.length - 1;
}

function ugras(i) {
    index = Math.max(0, Math.min(kartyak.length - 1, i));
    frissit();
}

elozo.addEventListener("click", () => ugras(index - 1));
kovetkezo.addEventListener("click", () => ugras(index + 1));

// billentyűzet
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") ugras(index - 1);
    if (e.key === "ArrowRight") ugras(index + 1);
});

// húzás egérrel és ujjal
let kezdoX = 0;
let huzas = false;

ablak.addEventListener("pointerdown", (e) => {
    huzas = true;
    kezdoX = e.clientX;
    ablak.classList.add("huz");
});

window.addEventListener("pointerup", (e) => {
    if (!huzas) return;
    huzas = false;
    ablak.classList.remove("huz");
    const kulonbseg = e.clientX - kezdoX;
    if (kulonbseg < -50) ugras(index + 1);
    else if (kulonbseg > 50) ugras(index - 1);
});

window.addEventListener("resize", frissit);
window.addEventListener("load", frissit);
frissit();