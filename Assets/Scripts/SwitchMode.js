#pragma strict

var thirdPersonCamera : Camera;
var firstPersonCamera : Camera;

var gameMode : boolean = true;

var player : GameObject;

function Start () {
	thirdPersonCamera.enabled = true;
	firstPersonCamera.enabled = false;
	player = GameObject.Find("First Person Controller");
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
		// If the gameMode bool is false, set camera to 1st person view (default)
		}else{
			thirdPersonCamera.enabled = false;
			firstPersonCamera.enabled = true;

		}
	}catch (UnityException){
		if(thirdPersonCamera == null || firstPersonCamera == null){
			Debug.Log("ERROR: Need to assign camera(s) via inspector");
		}
	}
	
	// If we are in 1st person view, and the player hits F, fire the "pinball"
	if(gameMode == false && Input.GetKeyUp(KeyCode.F)){
		player.SendMessage("FirePinball");
	}
}