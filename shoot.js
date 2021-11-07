AFRAME.registerComponent("bullets",{
 init:function(){
  this.showBullets()   
 },
 showBullets:function(){
  window.addEventListener("keydown",(e)=>{
   if(e.key==="z"){
    var bullet = document.createElement("a-entity")
    bullet.setAttribute("geometry",{
     primitive:"sphere",
     radius:0.1   
    })
    bullet.setAttribute("material","color","black")
    var cam = document.querySelector("#camera")
    pos = cam.getAttribute("position")
    bullet.setAttribute("position",{
      x:pos.x,
      y:pos.y,
      z:pos.z   
    })
    var scene = document.querySelector("#scene")
    var camera = document.querySelector("#camera").object3D
    var direction = new THREE.Vector3()
    camera.getWorldDirection(direction)
    bullet.setAttribute("velocity",direction.multiplyScalar(-10))
    bullet.setAttribute("dynamic-body",{
     shape:"sphere",
     mass:"0" 
    })
    bullet.addEventListener("collide",this.removeBullets)
  
    scene.appendChild(bullet)   
    

   }   
  })   
 },
 removeBullets:function(e){
   console.log("remove bullets2") 
  var element = e.detail.target.el
  var elementHit = e.detail.body.el

  if(elementHit.id.includes("box")){
    elementHit.setAttribute("material",{
     opacity:1,
     transparent:true 
    })
  }
  var impulse = new CANNON.Vec3(-2,2,1)
  var worldPoint = new CANNON.Vec3().copy(
   elementHit.getAttribute("position") 
  )
  elementHit.body.applyImpulse(impulse,worldPoint)
  element.removeEventListener("collide",this.shoot)
  
  var scene = document.querySelector("#scene")
  scene.removeChild(element) 
  
  
 }

})