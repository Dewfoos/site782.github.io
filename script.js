const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12"
];

const colors = [
    "#ffd6d6",
    "#ffe6b8",
    "#fff8b3",
    "#d5f5c8",
    "#cfeeff",
    "#ddd4ff",
    "#ffd6f5",
    "#f8dcc6",
    "#e7ffcb",
    "#caf5eb",
    "#d7e5ff",
    "#f3d5ff"
];

const radius = 350;
const slice = Math.PI * 2 / items.length;

let rotation = 0;
let spinning = false;

function drawWheel() {

    ctx.clearRect(0,0,700,700);

    ctx.save();
    ctx.translate(radius,radius);
    ctx.rotate(rotation);

    for(let i=0;i<items.length;i++) {

        const start = i*slice;
        const end = start+slice;

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.arc(0,0,radius-10,start,end);
        ctx.closePath();

        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#39291f";
        ctx.stroke();

        ctx.save();
        ctx.rotate(start+slice/2);

        ctx.fillStyle="#39291f";
        ctx.font="22px Yomogi";
        ctx.textAlign="right";

        ctx.fillText(items[i], radius-35, 8);

        ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0,0,35,0,Math.PI*2);
    ctx.fillStyle="#39291f";
    ctx.fill();

    ctx.restore();
}

drawWheel();

document.getElementById("spinBtn").onclick = () => {

    if(spinning) return;

    spinning = true;

    const spin = 1800 + Math.random()*720;

    const start = rotation;
    const target = rotation + spin*Math.PI/180;

    const duration = 5000;
    const startTime = performance.now();

    function animate(now){

        const t = Math.min((now-startTime)/duration,1);
        const ease = 1-Math.pow(1-t,4);

        rotation = start + (target-start)*ease;

        drawWheel();

        if(t<1){
            requestAnimationFrame(animate);
        } else {

            const normalized =
                ((Math.PI*2) - (rotation%(Math.PI*2)))
                %(Math.PI*2);

            const selected =
                Math.floor(normalized/slice)%items.length;

            document.getElementById("result").textContent =
                "Chosen: " + items[selected];

            spinning = false;
        }
    }

    requestAnimationFrame(animate);
};
