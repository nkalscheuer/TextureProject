
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
    v_shaders["sphere"] = "";
    f_shaders["sphere"] = "";
    v_shaders["triang"] = "";
    f_shaders["triang"] = "";

    // load shader files (calls 'setShader' when done loading)
    loadFile("shaders/cube_shader.vert", function(shader_src) {
        setShader(gl, canvas, "cube", gl.VERTEX_SHADER, shader_src);
    });

    loadFile("shaders/cube_shader.frag", function(shader_src) {
        setShader(gl, canvas, "cube", gl.FRAGMENT_SHADER, shader_src);
    });

    // load shader files (calls 'setShader' when done loading)
    loadFile("shaders/sphere_shader.vert", function(shader_src) {
        setShader(gl, canvas, "sphere", gl.VERTEX_SHADER, shader_src);
    });

    loadFile("shaders/sphere_shader.frag", function(shader_src) {
        setShader(gl, canvas, "sphere", gl.FRAGMENT_SHADER, shader_src);
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


}

var Camera;
var MouseDownLocation;
var ClickedCameraPosition;
var ClickedCameraCenter;
var ClickedDown = false;
var RightClickDown = false;
var scene;

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
    cube.setVertexShader(v_shaders["cube"]);
    cube.setFragmentShader(f_shaders["cube"]);
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

    var woodPlane1 = new CubeGeometry(1);
    woodPlane1.setVertexShader(v_shaders["cube"]);
    woodPlane1.setFragmentShader(f_shaders["cube"]);
    //cube.setRotation(new Vector3([1,45,45]));
    woodPlane1.setPosition(new Vector3([0.0,-4,0.0]));
    woodPlane1.setScale(new Vector3([2.0, 0.00001, 2.0]));
    //woodPlane1.setRotation(new Vector3([1,45,45]));
    scene.addGeometry(woodPlane1);

    var woodPlane2 = new CubeGeometry(1);
    woodPlane2.setVertexShader(v_shaders["cube"]);
    woodPlane2.setFragmentShader(f_shaders["cube"]);
    //cube.setRotation(new Vector3([1,45,45]));
    woodPlane2.setPosition(new Vector3([4,-4,0.0]));
    woodPlane2.setScale(new Vector3([2.0, 0.00001, 2.0]));
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
    var sphere = new SphereGeometry(0.5, 32, 32);
    sphere.v_shader = v_shaders["sphere"];
    sphere.f_shader = f_shaders["sphere"];
    //sphere.setPosition(new Vector3([-5, 0, 0]));
    sphere.setPosition(new Vector3([-3,0.0,0.0]));
    //sphere.addUniform("u_EyePos", "v3", Camera.position);
    sphere.addUniform("u_EyePos", "v3", Camera.position.elements);

    scene.addGeometry(sphere);

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
        sphere.addUniform("u_sphereTex", "t3", tex);

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

  }
  function updateCameraPosition(){
      
  }
