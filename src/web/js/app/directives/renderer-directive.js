angular.module('starXplorer').directive('xRenderer', function () {
    return {
        restrict: 'A',
        scope: true,
        link: function ($scope, element, attrs) {
            var $element = angular.element(element);

            var viewAngle = 45,
                near = 0.1,
                far = 10000;

            var renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0x202020, 1);
            var camera = new THREE.PerspectiveCamera(viewAngle, 1, near, far);
            var scene = new THREE.Scene();
            scene.add(camera);

            camera.position.z = 0;

            var renderF = function () {
                renderer.render(scene, camera);
            };


            var controls = new THREE.TrackballControls(camera);
            controls.noPan
            controls.addEventListener('change', renderF);

            element.append(renderer.domElement);

            var lineMaterial = new THREE.LineBasicMaterial({color: 0xe0e0e0, lineWidth: 2});
            var lineGeometry = new THREE.Geometry();
            var lineN = 100;
            var lineA = 2 * Math.PI / lineN;
            for (var i = 0; i <= lineN; i++) {
                lineGeometry.vertices.push(new THREE.Vector3(0, 100 * Math.cos(i * lineA), 100 * Math.sin(i * lineA)));
            }
            var line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);

            var pointLight = new THREE.PointLight(0xFFFFFF);

            pointLight.position.x = 10;
            pointLight.position.y = 50;
            pointLight.position.z = 130;

            scene.add(pointLight);

            var resizeF = function () {
                var width = element.width();
                var height = element.height();

                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                controls.handleResize();
                renderF();
            };

            $element.resize(resizeF);
            //$( window ).resize(resizeF);
            resizeF();

            (function animate() {
                requestAnimationFrame(animate, $element);
                controls.update();
            })();
        }
    };
});

