#pragma strict

var thirdPersonCamera : Camera;
var firstPersonCamera : Camera;

var gameMode : boolean = true;

function Start () {
	thirdPersonCamera.enabled = true;
	firstPersonCamera.enabled = false;
}

function Update () {
	if(Input.GetKeyUp(KeyCode.M)){
		gameMode = !gameMode;
	}

	try{
		// If the gameMode bool is true, set camera to 3rd person view
		if(gameMode == true){
			thirdPersonCamera.enabled = true;
			firstPersonCamera.enabled = false;
			//mainCamera.transform.position = new Vector3(0, 2, -2.75);
			//mainCamera.transform.localEulerAngles = new Vector3(15, 0, 0);
		// If the gameMode bool is false, set camera to 1st person view (default)
		}else{
			thirdPersonCamera.enabled = false;
			firstPersonCamera.enabled = true;
			//mainCamera.transform.position = new Vector3(0, 0, 0);
			//mainCamera.transform.localEulerAngles = new Vector3(0, 0, 0);
		}
	}catch (UnityException){
		if(thirdPersonCamera == null || firstPersonCamera == null){
			Debug.Log("ERROR: Need to assign camera(s) via inspector");
		}
	}
}