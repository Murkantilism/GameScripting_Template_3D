#pragma strict

var speed : float = 6.0f;
var jumpSpeed : float = 8.0f;
var gravity : float = 20.0f;
var moveDirection : Vector3 = Vector3.zero;
var bounce : Vector3 = Vector3.zero;
var controller : CharacterController;
var fireSpeed : float = 10.0f;
var ballFired : boolean = false;

function Start () {
	controller = gameObject.GetComponent(CharacterController);
}

function Update () {
	if(controller.isGrounded){
		if(bounce.sqrMagnitude > 0){
			moveDirection = bounce;
			bounce = Vector3.zero;
		}else{
			moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
			
			if(ballFired == true){
				//gameObject.rigidbody.AddForce(Vector3.right * fireSpeed, ForceMode.Impulse);
				moveDirection = transform.TransformDirection(Vector3.forward * fireSpeed);
				ballFired = false;
			}else{
				moveDirection = transform.TransformDirection(moveDirection);
			}
						
			moveDirection *= speed;
		}
		
		if(Input.GetKeyUp(KeyCode.Space)){
			moveDirection.y = jumpSpeed;
		}
	}
	
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
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

function FirePinball(){
	ballFired = true;
}