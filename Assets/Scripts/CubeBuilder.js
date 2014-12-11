var blockLayer : LayerMask = 1;
var range : float = Mathf.Infinity;
var hit : RaycastHit;

var firstPersonCamera : GameObject;

function Start () {
    firstPersonCamera = GameObject.Find("1st Person Camera");
}

function Update () {
    if (Input.GetMouseButtonDown(0))
        Build();
    if (Input.GetMouseButtonDown(1))
        Build_alternate();
    if (Input.GetMouseButtonDown(2))
        Erase();
}

function Build() {
    if (HitBlock()) {
        var bumper = Instantiate(Resources.Load("bumper_circle01"), hit.transform.position + hit.normal, Quaternion.identity);
        bumper.renderer.material.color = Color.gray;
        bumper.gameObject.tag = "BuiltCube";
        bumper.collider.material = Resources.Load("Bouncy") as PhysicMaterial;
    }
}

function Build_alternate() {
    if (HitBlock()) {
        var bumper = Instantiate(Resources.Load("bumper_triangle01"), hit.transform.position + hit.normal, Quaternion.identity);
        bumper.renderer.material.color = Color.gray;
        bumper.gameObject.tag = "BuiltCube";
        bumper.collider.material = Resources.Load("SlightlyLessBouncy") as PhysicMaterial;
    }
}

function Erase() {
    if (HitBlock() && (hit.transform.gameObject.tag == "BuiltCube"))
        Destroy(hit.transform.gameObject);
}

function HitBlock() : boolean {
    return Physics.Raycast(transform.position, transform.forward, hit, range, blockLayer);
}