var blockLayer : LayerMask = 1;
var range : float = Mathf.Infinity;
var hit : RaycastHit;

function Update () {
    if (Input.GetMouseButtonDown(0))
        Build();
    if (Input.GetMouseButtonDown(1))
        Erase();
}

function Build() {
    if (HitBlock()) {
        var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
        cube.renderer.material.color = Color.gray;
        cube.transform.position = hit.transform.position + hit.normal;
    }
}

function Erase() {
    if (HitBlock())
        Destroy(hit.transform.gameObject);
}

function HitBlock() : boolean {
    return Physics.Raycast(transform.position, transform.forward, hit, range, blockLayer);
}