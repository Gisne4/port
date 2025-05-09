$(function () {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);
  var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 5, segments: 32 },
      scene
    );
    // Built-in `box` shape.
    var box = BABYLON.MeshBuilder.CreateBox("box", { size: 4 }, scene);

    //move the box
    box.position.x = -5;

    // Built-in `cylinder` shape.
    var cylinder = BABYLON.MeshBuilder.CreateCylinder(
      "cylinder",
      { height: 5, diameter: 3 },
      scene
    );
    cylinder.position.x = 5;

    var nana = BABYLON.SceneLoader.ImportMesh(
      "",
      "../img/",
      "HVGirl.glb",
      scene
    );

    return scene;
  };

  const scene = createScene();

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
});
