class SensEngine{

constructor(){

this.lastX=0
this.lastY=0

this.smooth=0.25
this.pixelLock=30

this.enabled={}

}

bezier(t,p0,p1,p2,p3){

return(
Math.pow(1-t,3)*p0+
3*Math.pow(1-t,2)*t*p1+
3*(1-t)*Math.pow(t,2)*p2+
Math.pow(t,3)*p3
)

}

noiseFilter(value,last){

return last+(value-last)*this.smooth

}

pixelLockCheck(dx,dy){

let dist=Math.sqrt(dx*dx+dy*dy)

if(dist>this.pixelLock){

dx*=0.4
dy*=0.4

}

return{dx,dy}

}

process(x,y){

let dx=x-this.lastX
let dy=y-this.lastY

let speed=Math.sqrt(dx*dx+dy*dy)

let curve=this.bezier(
Math.min(speed/60,1),
0,
0.2,
0.8,
1
)

dx*=curve
dy*=curve

let filteredX=this.noiseFilter(x,this.lastX)
let filteredY=this.noiseFilter(y,this.lastY)

let lock=this.pixelLockCheck(dx,dy)

this.lastX=filteredX
this.lastY=filteredY

return lock

}

setOption(name,val){

this.enabled[name]=val

}

start(){

document.body.classList.add("engine-active")

}

}

window.Engine=new SensEngine()
