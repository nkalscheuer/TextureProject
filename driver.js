
v_shaders = {}
f_shaders = {}

// called when page is loaded
function main() {
    // retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    v_shaders["cube"] = "";
    f_shaders["cube"] = "";
    v_shaders["sky"] = "";
    f_shaders["sky"] = "";
    v_shaders["sphere"] = "";
    f_shaders["pyramid"] = "";
    v_shaders["pyramid"] = "";
    f_shaders["sphere"] = "";
    v_shaders["triang"] = "";
    f_shaders["triang"] = "";

    // v_shaders["sky"] = "";
    // // f_shaders["sky"]="";

    // load shader files (calls 'setShader' when done loading)
    loadFile("shaders/cube_shader.vert", function(shader_src) {
        setShader(gl, canvas, "cube", gl.VERTEX_SHADER, shader_src);
    });

    loadFile("shaders/cube_shader.frag", function(shader_src) {
        setShader(gl, canvas, "cube", gl.FRAGMENT_SHADER, shader_src);
    });

    loadFile("shaders/sky_shader.vert", function(shader_src) {
        setShader(gl, canvas, "sky", gl.VERTEX_SHADER, shader_src);
    });

    loadFile("shaders/sky_shader.frag", function(shader_src) {
        setShader(gl, canvas, "sky", gl.FRAGMENT_SHADER, shader_src);
    });

    // load shader files (calls 'setShader' when done loading)
    loadFile("shaders/sphere_shader.vert", function(shader_src) {
        setShader(gl, canvas, "sphere", gl.VERTEX_SHADER, shader_src);
    });

    loadFile("shaders/sphere_shader.frag", function(shader_src) {
        setShader(gl, canvas, "sphere", gl.FRAGMENT_SHADER, shader_src);
    });

    loadFile("shaders/pyramid_shader.vert", function(shader_src) {
        setShader(gl, canvas, "pyramid", gl.VERTEX_SHADER, shader_src);
    });

    loadFile("shaders/pyramid_shader.frag", function(shader_src) {
        setShader(gl, canvas, "pyramid", gl.FRAGMENT_SHADER, shader_src);
    });

    // load shader files (calls 'setShader' when done loading)
    loadFile("shaders/triang_shader.vert", function(shader_src) {
        setShader(gl, canvas, "triang", gl.VERTEX_SHADER, shader_src);
    });

    loadFile("shaders/triang_shader.frag", function(shader_src) {
        setShader(gl, canvas, "triang", gl.FRAGMENT_SHADER, shader_src);
    });
    canvas.onmousedown = function (ev){onClickDown(ev, canvas)};
    document.onmouseup = function (ev){
            if(ev.button == 0){
                ClickedDown = false;
            }
        };

    canvas.onmousemove = function (ev){onMouseMove(ev, canvas)};

    canvas.onwheel = function (ev) { onScroll(ev, canvas)};

    document.onkeydown = function (ev) {
        switch(ev.key){
            case "w":
                moveLookAt(MOVEVAL);
                break;
            case "s":
                moveLookAt(-MOVEVAL);
                break;
            case "d":
                strafe(MOVEVAL);
                break;
            case "a":
                strafe(-MOVEVAL);
                break;
            case "+":
                scalePlane(SCALEVAL);
                break;
            case "-":
                scalePlane(-SCALEVAL);
                break;
                
            
        }

    };


}

var Camera;
var MouseDownLocation;
var ClickedCameraPosition;
var ClickedCameraCenter;
var ClickedDown = false;
var RightClickDown = false;
var scene;
var Sphere;
var woodPlane1;
var woodPlane2;
var Pyramid;
var MOVEVAL = 0.5;
var PlaneScale = 1;
var SCALEVAL = 0.1;
var ROTATE = 60; //Rotate amount



// set appropriate shader and start if both are loaded
function setShader(gl, canvas, name, shader, shader_src) {
    if (shader == gl.VERTEX_SHADER)
       v_shaders[name] = shader_src;

    if (shader == gl.FRAGMENT_SHADER)
	   f_shaders[name] = shader_src;

    vShadersLoaded = 0;
    for (var shader in v_shaders) {
       if (v_shaders.hasOwnProperty(shader) && v_shaders[shader] != "") {
           vShadersLoaded += 1;
       }
    }

    fShadersLoaded = 0;
    for (var shader in f_shaders) {
        if (f_shaders.hasOwnProperty(shader) && f_shaders[shader] != "") {
            fShadersLoaded += 1;
        }
    }

    if(vShadersLoaded == Object.keys(v_shaders).length &&
       fShadersLoaded == Object.keys(f_shaders).length) {
        start(gl, canvas);
    }
}

function start(gl, canvas) {

    // Create Camera
    Camera = new PerspectiveCamera(80, 1, 1, 200);
    //Camera.move(0,0, 150,1);
    Camera.move(-8,1,0,0);
    Camera.move(2, 0, 0, -1);
    Camera.rotate(230,0,1,0);

    // Create scene
    scene = new Scene(gl, Camera);

    // Create a cube
    var cube = new CubeGeometry(1);
    cube.setVertexShader(v_shaders["sky"]);
    cube.setFragmentShader(f_shaders["sky"]);
    //cube.setRotation(new Vector3([1,45,45]));
    cube.setPosition(new Vector3([0.0,0.0,0.0]));
    cube.setScale(new Vector3([30,30,30]));
    scene.addGeometry(cube);

    var woodBox = new CubeGeometry(1);
    woodBox.setVertexShader(v_shaders["cube"]);
    woodBox.setFragmentShader(f_shaders["cube"]);
    //cube.setRotation(new Vector3([1,45,45]));
    woodBox.setPosition(new Vector3([0.0,0.0,0.0]));
    woodBox.setScale(new Vector3([1.5, 1.5, 1.5]));
    woodBox.setRotation(new Vector3([1,45,45]));
    scene.addGeometry(woodBox);

    woodPlane1 = new CubeGeometry(1);
    woodPlane1.setVertexShader(v_shaders["cube"]);
    woodPlane1.setFragmentShader(f_shaders["cube"]);
    //cube.setRotation(new Vector3([1,45,45]));
    woodPlane1.setPosition(new Vector3([0.0,-4,0.0]));
    woodPlane1.setScale(new Vector3([PlaneScale, 0.00001, PlaneScale]));
    //woodPlane1.setRotation(new Vector3([1,45,45]));
    scene.addGeometry(woodPlane1);

    woodPlane2 = new CubeGeometry(1);
    woodPlane2.setVertexShader(v_shaders["cube"]);
    woodPlane2.setFragmentShader(f_shaders["cube"]);
    //cube.setRotation(new Vector3([1,45,45]));
    woodPlane2.setPosition(new Vector3([PlaneScale*2,-4,0.0]));
    woodPlane2.setScale(new Vector3([PlaneScale, 0.00001, PlaneScale]));
    //woodPlane1.setRotation(new Vector3([1,45,45]));
    scene.addGeometry(woodPlane2);


    var triang = new Geometry();
    triang.vertices = [-1, -1, 0.0, 0.0, 1.0, 0.0, 1, -1, 0.0];
    triang.indices = [0, 1, 2];
    var uvs = [0.0, 0.0, 0.0, 0.5, 1.0, 0.0, 1.0, 0.0, 0.0];
    triang.addAttribute("a_uv", uvs);

    

    triang.setVertexShader(v_shaders["triang"]);
    triang.setFragmentShader(f_shaders["triang"]);
    scene.addGeometry(triang);

    // Create a Sphere
    Sphere = new SphereGeometry(0.5, 32, 32);
    Sphere.v_shader = v_shaders["sphere"];
    Sphere.f_shader = f_shaders["sphere"];
    //sphere.setPosition(new Vector3([-5, 0, 0]));
    Sphere.setPosition(new Vector3([-3,0.0,0.0]));
    //sphere.addUniform("u_EyePos", "v3", Camera.position);
    Sphere.addUniform("u_EyePos", "v3", Camera.position.elements);

    scene.addGeometry(Sphere);

    Pyramid = makePyramid();
    Pyramid.setVertexShader(v_shaders["pyramid"]);
    Pyramid.setFragmentShader(f_shaders["pyramid"]);
    Pyramid.setPosition(new Vector3([-3, -3, 4]));
    Pyramid.setScale(new Vector3([2, 2, 2]));
    Pyramid.addUniform("u_EyePos", "v3", Camera.position.elements);

    scene.addGeometry(Pyramid);

    // scene.draw();

    var tex2 = new Texture2D(gl, 'img/beach/posz.jpg', function(tex) {
        console.log(tex);
        triang.addUniform("u_tex", "t2", tex);
        //scene.draw();
    });
    var cubeMap = "img/Maskonaive3/";
    var tex = new Texture3D(gl, [
        cubeMap + 'negx.jpg',
        cubeMap + 'posx.jpg',
        cubeMap + 'negy.jpg',
        cubeMap + 'posy.jpg',
        cubeMap + 'negz.jpg',
        cubeMap + 'posz.jpg'
    ], function(tex) {
        cube.addUniform("u_cubeTex", "t3", tex);
        Sphere.addUniform("u_sphereTex", "t3", tex);
        Pyramid.addUniform("u_sphereTex", "t3", tex);
        scene.draw();
    });
    var woodPath = "img/Wood/Wood.jpg";
    var texWood = new Texture3D(gl, [
        woodPath,
        woodPath,
        woodPath,
        woodPath,
        woodPath,
        woodPath
    ], function (texWood){
        woodBox.addUniform("u_cubeTex", "t3", texWood);
        woodPlane1.addUniform("u_cubeTex", "t3", texWood);
        woodPlane2.addUniform("u_cubeTex", "t3", texWood);
        
        scene.draw();
    });
    scene.draw();
}

function onScroll(ev, canvas){
    let scaleRatio = 15;
    console.log(ev.deltaY);
    let movement = (ev.deltaY/Math.abs(ev.deltaY))/scaleRatio;
    Camera.move(movement, 0, 1, 0);
    updateCameraPosition();
    scene.draw();

}
function onClickDown(ev, canvas){
    console.log("Clicked down");
    ClickedDown = true;
    MouseDownLocation = getCanvasCoordinates(ev, canvas);
    // LastMouseLocation = MouseDownLocation;
    ClickedCameraPosition = Camera.position;
    ClickedCameraCenter = Camera.center;
}
function onRightClickDown(ev, canvas){

}
function onMouseMove(ev, canvas){
    if(RightClickDown){

    }
    if(ClickedDown){
        //Get the change
        var change = getMouseChange(ev, canvas);

        //Do math with vector
        let axis2 = getPerp(change);

        let axis3 = new Vector3([axis2[0], axis2[1], 0]);

        Camera.position = ClickedCameraPosition;
        Camera.center = ClickedCameraCenter;

        let mag = VectorLibrary.magnitude(axis3);
        let angle = ROTATE * mag;
        Camera.rotate(angle, axis3.elements[0], axis3.elements[1], axis3.elements[2]);
        console.log(Camera);
        console.log(scene);
        scene.draw();
    }
}

function getMouseChange(ev, canvas){
    var current = getCanvasCoordinates(ev, canvas);
    return [current[0] - MouseDownLocation[0], current[1] - MouseDownLocation[1]];
}
function getPerp(change){
    return [-change[1], change[0]];
}
function getCanvasCoordinates(ev, canvas){
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect() ;
  
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
    return [x, y];
  }
  function moveLookAt(value){
    //Get look at vector
    var lookAt = VectorLibrary.getVector(Camera.position, Camera.center);
    lookAt.normalize();

    //Move camera
    var l = lookAt.elements;
    Camera.move(value,l[0], l[1], l[2]);
    updateCameraPosition();
    scene.draw();
  }
  function strafe(value){
    var lookAt = VectorLibrary.getVector(Camera.position, Camera.center);
    lookAt.normalize();

    var strafe = VectorLibrary.crossProduct(lookAt, Camera.up);

    var s = strafe.elements;
    Camera.move(value, s[0], s[1], s[2]);
    updateCameraPosition();
    scene.draw();
  }
  function updateCameraPosition(){
    Sphere.addUniform("u_EyePos", "v3", Camera.position.elements);
    Pyramid.addUniform("u_EyePos", "v3", Camera.position.elements);
  }

  function scalePlane(value){
    PlaneScale += value;
    woodPlane1.setScale(new Vector3([PlaneScale, 0.0001, PlaneScale]));
    woodPlane2.setScale(new Vector3([PlaneScale, 0.0001, PlaneScale]));

    woodPlane2.setPosition(new Vector3([PlaneScale * 2, -4, 0]));
    scene.draw();
  }

  function makePyramid(){
      var pyramid = new Geometry();

      pyramid.vertices = [
          0,1,0,  1,0,0,   0,0,1,  //First triangle
          0,1,0,  0,0,-1,  1,0,0,  //Second Triangle
          0,1,0,  -1,0,0,  0,0,-1, //Third triangle
          0,1,0,  0,0,1,   -1,0,0  //Fourth triangle
      ]
      var tri1Norm = VectorLibrary.crossProduct(
        new Vector3([-1, 0, 1]), new Vector3([-1, 1, 0])
      ).elements;

      var tri2Norm = VectorLibrary.crossProduct(
        new Vector3([-1, 1, 0]), new Vector3([-1, 0, -1])
      ).elements;

      var tri3Norm = VectorLibrary.crossProduct(
          new Vector3([0, 1, 1]), new Vector3([-1, 0, 1])
      ).elements;

      var tri4Norm = VectorLibrary.crossProduct(
          new Vector3([1, 1, 0]), new Vector3([1, 0, 1])
      ).elements;

      var normals = [
          tri1Norm[0], tri1Norm[1], tri1Norm[2], tri1Norm[0], tri1Norm[1], tri1Norm[2], tri1Norm[0], tri1Norm[1], tri1Norm[2],
          tri2Norm[0], tri2Norm[1], tri2Norm[2],  tri2Norm[0], tri2Norm[1], tri2Norm[2],  tri2Norm[0], tri2Norm[1], tri2Norm[2],
          tri3Norm[0], tri3Norm[1], tri3Norm[2],  tri3Norm[0], tri3Norm[1], tri3Norm[2],  tri3Norm[0], tri3Norm[1], tri3Norm[2],
          tri4Norm[0], tri4Norm[1], tri4Norm[2],  tri4Norm[0], tri4Norm[1], tri4Norm[2],  tri4Norm[0], tri4Norm[1], tri4Norm[2]
      ];
      pyramid.indices = [0,1,2,3,4,5,6,7,8,9,10,11];
      pyramid.addAttribute("a_Normal", normals);
      return pyramid;

    //   var triang = new Geometry();
    //   triang.vertices = [-1, -1, 0.0, 0.0, 1.0, 0.0, 1, -1, 0.0];
    //   triang.indices = [0, 1, 2];
    //   var uvs = [0.0, 0.0, 0.0, 0.5, 1.0, 0.0, 1.0, 0.0, 0.0];
    //   triang.addAttribute("a_uv", uvs);

  }
