import './App.css';
import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GeometryUtils } from 'three';
import * as THREE from 'three';


extend({ OrbitControls });

const Orbit = () => {

  const { camera, gl } = useThree();
  return (
    <orbitControls args={[camera, gl.domElement]} />
  );
}

const Sphere = props => {

  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, '/organic.jpg');

  useFrame(state => {

    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (

    <mesh ref={ref} {...props} castShadow>
      <sphereGeometry />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  )
}

const Box = props => {

  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, '/organic.jpg');

  useFrame(state => {
    ref.current.rotation.y += 0.01;
    ref.current.rotation.x += 0.01;
  });

  const handlePointerDown = e => {
    console.log(e);
    e.object.active = true;
    if (window.activeMesh) {
      scaleDown(window.activeMesh);
      window.activeMesh.active = false;
    }
    window.activeMesh = e.object;
  };

  const handlePointerEnter = e => {

    e.object.scale.x = 1.5;
    e.object.scale.y = 1.5;
    e.object.scale.z = 1.5;
  };

  const handlePointerLeave = e => {
    if (!e.object.active) {
      scaleDown(e.object);
    }
  }

  const scaleDown = object => {

    object.scale.x = 1;
    object.scale.y = 1;
    object.scale.z = 1;
  }

  return (

    <mesh ref={ref}  {...props}
      castShadow
      //receiveShadow
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <boxGeometry />
      <meshPhysicalMaterial
        map={texture}


      //color='white'
      //transparent
      //fog={false} 
      //roughness={0}
      //metalness={1}
      //transmission={0.5}
      //reflectivity={1}
      //side={THREE.//DoubleSide}
      //opacity={0.7}
      //clearcoat={1} 
      />
    </mesh>
  )
};

const Floor = props => {

  return (

    <mesh {...props} receiveShadow>
      <boxGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  )
};

const Background = props => {

  const texture = useLoader(THREE.TextureLoader, 'autoshop.jpg');

  const { gl } = useThree();

  const formated = new THREE.WebGLCubeRenderTarget(texture.image.height).fromEquirectangularTexture(gl, texture);

  return (
    <primitive attach='background' object={texture} />

  );
};

const Bulb = props => {

  return (

    <mesh {...props}>
      <pointLight castShadow />
      <sphereGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive='yellow' />
    </mesh>
  )
}

function App() {

  return (

    <div id='canvas-container' style={{ height: '100vh', width: '100vw' }}>
      <div style={{ position: 'absolute', zIndex: 1 }}>
        <div style={{ background: 'blue', height: 50, width: 50 }}></div>
        <div style={{ background: 'yellow', height: 50, width: 50 }}></div>
        <div style={{ background: 'white', height: 50, width: 50 }}></div>
        <input type='text'></input>
        <button> Enviar </button>


        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input>
        </div>

        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg">Large</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"></input>
        </div>





      </div>

      <Canvas shadows style={{ background: 'black' }} camera={{ position: [7, 7, 7] }}>

        <Bulb position={[0, 3, 0]} />
        <Orbit />
        <axesHelper args={[5]} />
        <ambientLight intensity={0.2} />
        <pointLight />
        <Suspense fallback={null}>
          <Box position={[0, 1, 0]} />
        </Suspense >
        <Suspense>
          <Box position={[2, 1, 0]} />
        </Suspense>
        <Suspense>
          <Sphere position={[2, 1, 3]} />
        </Suspense>
        <Suspense>
          <Background />
        </Suspense>
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
