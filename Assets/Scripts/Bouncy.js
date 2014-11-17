#pragma strict

var speed : float = 6.0f;
var jumpSpeed : float = 8.0f;
var gravity : float = 20.0f;
var moveDirection : Vector3 = Vector3.zero;
var bounce : Vector3 = Vector3.zero;
var controller : CharacterController;
var fireSpeed : float = 20.0f;
var ballFired : boolean = false;
var forceVector = Vector3.zero;
var pinballModep = false;

function Start () {
	controller = gameObject.GetComponent(CharacterController);
}

function Update () {
	if(pinballModep == false){
		if(controller.isGrounded){
			if(bounce.sqrMagnitude > 0){
				moveDirection = bounce;
				bounce = Vector3.zero;
			}else{
				moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
				
				moveDirection = transform.TransformDirection(moveDirection);
							
				moveDirection *= speed;
			}
			
			if(Input.GetKeyUp(KeyCode.Space)){
				moveDirection.y = jumpSpeed;
			}
		}
		
		moveDirection.y -= gravity * Time.deltaTime;
		controller.Move(moveDirection * Time.deltaTime);
	}else if(pinballModep == true){
		if(ballFired == true){
			gameObject.rigidbody.AddForce(new Vector3(1, 0, 1) * fireSpeed, ForceMode.Impulse);
			ballFired = false;
		}else{
			gameObject.rigidbody.velocity = new Vector3(1, 0, 1) * -fireSpeed;
		}
	}
}

function OnControllerColliderHit(col : ControllerColliderHit){
	if(col.gameObject.tag == "BuiltCube"){
	    var kr : float = 0.5f;
	    var v : Vector3 = col.controller.velocity;
	    var n : Vector3 = col.normal;
	    var vn : Vector3 = Vector3.Dot(v,n) * n;
	    var vt : Vector3 = v - vn;
	    bounce = vt -(vn*kr);
	}
}

function FirePinball(mode : boolean){
	ballFired = true;
	pinballModep = mode;
}

function StopPinball(mode : boolean){
	ballFired = false;
	pinballModep = mode;
}