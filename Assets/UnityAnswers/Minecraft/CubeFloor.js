for (var y = -25; y < 26; ++y)
for (var x = -25; x < 26; ++x) {
    var cube : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
    cube.transform.position = transform.position + Vector3(x, 0, y);
}