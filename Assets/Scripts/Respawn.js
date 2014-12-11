#pragma strict

var player : GameObject;
var respawnPoint : GameObject;

function Start () {
    player = GameObject.Find("First Person Controller");
    respawnPoint = GameObject.Find("RespawnPoint");
}

function Update () {
    if (!(player.transform.position.x > -30 && player.transform.position.x < 30)){
        Debug.Log("Went out of X bounds");
        ResetPosition();
    }else if (!(player.transform.position.y > -10 && player.transform.position.y < 25)){
        Debug.Log("Went out of Y bounds");
        ResetPosition();
    }else if (!(player.transform.position.z > -30 && player.transform.position.z < 30)){
        Debug.Log("Went out of Z bounds");
        ResetPosition();
    }
}

function ResetPosition(){
    player.transform.position = respawnPoint.transform.position;
    Debug.Log("Position reset");
}