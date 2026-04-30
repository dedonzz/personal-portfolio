import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export class Vehicle {
  constructor(scene, world) {
    this.scene = scene
    this.world = world

    this.car = {}
    this.chassis = new THREE.Group()
    this.wheels = []
    
    // Scaling the car down (0.5x smaller)
    this.scale = 0.5
    
    this.chassisDimension = {
      x: 1.96 * this.scale,
      y: 1 * this.scale,
      z: 4.47 * this.scale
    }
    this.chassisModelPos = {
      x: 0,
      y: -0.59 * this.scale,
      z: 0
    }
    this.wheelScale = {
      frontWheel: 0.67 * this.scale,
      hindWheel: 0.67 * this.scale
    }
    this.mass = 150 // Slightly lighter for smaller size
    
    this.position = new THREE.Vector3()
    this.rotation = 0
    this.speed = 0
    this.steeringAngle = 0
    
    console.log('Vehicle class initialized with scale:', this.scale)
  }

  async init() {
    console.log('Vehicle init starting...')
    try {
      await this.loadModels()
      this.setChassis()
      this.setWheels()
      this.setupPhysicsSync()
      console.log('Vehicle init completed')
    } catch (error) {
      console.error('Error during vehicle init:', error)
    }
  }

  loadModels() {
    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()

    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    gltfLoader.setDRACOLoader(dracoLoader)

    const loadChassis = () => {
      return new Promise((resolve, reject) => {
        gltfLoader.load('/models/chassis.gltf', 
          (gltf) => {
            this.chassisMesh = gltf.scene
            // Apply scale to the model
            this.chassisMesh.scale.set(this.scale, this.scale, this.scale)
            this.chassis.add(this.chassisMesh)
            this.chassisMesh.position.set(this.chassisModelPos.x, this.chassisModelPos.y, this.chassisModelPos.z)
            this.scene.add(this.chassis)
            resolve()
          },
          undefined,
          reject
        )
      })
    }

    const loadWheels = () => {
      const wheelPromises = []
      for (let i = 0; i < 4; i++) {
        wheelPromises.push(new Promise((resolve, reject) => {
          gltfLoader.load('/models/wheel.gltf', 
            (gltf) => {
              const model = gltf.scene
              this.wheels[i] = model
              const s = this.wheelScale.frontWheel
              if (i === 1 || i === 3) {
                model.scale.set(-1 * s, 1 * s, -1 * s)
              } else {
                model.scale.set(1 * s, 1 * s, 1 * s)
              }
              this.scene.add(model)
              resolve()
            },
            undefined,
            reject
          )
        }))
      }
      return Promise.all(wheelPromises)
    }

    return Promise.all([loadChassis(), loadWheels()])
  }

  setChassis() {
    const chassisShape = new CANNON.Box(new CANNON.Vec3(this.chassisDimension.x * 0.5, this.chassisDimension.y * 0.5, this.chassisDimension.z * 0.5))
    const chassisBody = new CANNON.Body({ mass: this.mass, material: new CANNON.Material({ friction: 0 }) })
    chassisBody.addShape(chassisShape)
    chassisBody.position.set(0, 1 * this.scale, 0)

    this.car = new CANNON.RaycastVehicle({
      chassisBody,
      indexRightAxis: 0,
      indexUpAxis: 1,
      indexForwardAxis: 2
    })
    this.car.addToWorld(this.world)
  }

  setWheels() {
    const wheelOptions = {
      radius: 0.34 * this.scale,
      directionLocal: new CANNON.Vec3(0, -1, 0),
      suspensionStiffness: 55,
      suspensionRestLength: 0.5 * this.scale,
      frictionSlip: 30,
      dampingRelaxation: 2.3,
      dampingCompression: 4.3,
      maxSuspensionForce: 10000,
      rollInfluence: 0.01,
      axleLocal: new CANNON.Vec3(-1, 0, 0),
      maxSuspensionTravel: 1 * this.scale,
      customSlidingRotationalSpeed: 30
    }

    const s = this.scale
    // Rear Wheels (Z = -1.32)
    this.car.addWheel({ ...wheelOptions, chassisConnectionPointLocal: new CANNON.Vec3(0.75 * s, 0.1 * s, -1.32 * s) }) // 0
    this.car.addWheel({ ...wheelOptions, chassisConnectionPointLocal: new CANNON.Vec3(-0.78 * s, 0.1 * s, -1.32 * s) }) // 1
    
    // Front Wheels (Z = 1.25)
    this.car.addWheel({ ...wheelOptions, chassisConnectionPointLocal: new CANNON.Vec3(0.75 * s, 0.1 * s, 1.25 * s) }) // 2
    this.car.addWheel({ ...wheelOptions, chassisConnectionPointLocal: new CANNON.Vec3(-0.78 * s, 0.1 * s, 1.25 * s) }) // 3
  }

  setupPhysicsSync() {
    this.world.addEventListener('postStep', () => {
      if (!this.car.chassisBody) return

      this.chassis.position.set(
        this.car.chassisBody.position.x,
        this.car.chassisBody.position.y,
        this.car.chassisBody.position.z
      )
      this.chassis.quaternion.copy(this.car.chassisBody.quaternion)

      for (let i = 0; i < 4; i++) {
        if (this.car.wheelInfos[i] && this.wheels[i]) {
          this.car.updateWheelTransform(i)
          this.wheels[i].position.copy(this.car.wheelInfos[i].worldTransform.position)
          this.wheels[i].quaternion.copy(this.car.wheelInfos[i].worldTransform.quaternion)
        }
      }
      
      this.position.copy(this.car.chassisBody.position)
      const euler = new THREE.Euler().setFromQuaternion(this.car.chassisBody.quaternion)
      this.rotation = euler.y
      this.speed = this.car.chassisBody.velocity.length()
    })
  }

  updateControls(keys) {
    const maxSteerVal = 0.5
    const maxForce = 500 * this.scale // Scale force with size
    const slowDownCar = 10.0

    if (keys.r) {
      this.car.chassisBody.position.set(0, 1, 0)
      this.car.chassisBody.quaternion.set(0, 0, 0, 1)
      this.car.chassisBody.angularVelocity.set(0, 0, 0)
      this.car.chassisBody.velocity.set(0, 0, 0)
    }

    let steerVal = 0
    if (keys.a) steerVal = maxSteerVal
    if (keys.d) steerVal = -maxSteerVal
    
    this.car.setSteeringValue(steerVal, 2)
    this.car.setSteeringValue(steerVal, 3)
    this.steeringAngle = steerVal 

    let force = 0
    if (keys.w) force = -maxForce
    if (keys.s) force = maxForce
    
    if (force !== 0) {
      for (let i = 0; i < 4; i++) {
        this.car.applyEngineForce(force, i)
        this.car.setBrake(0, i)
      }
    } else {
      for (let i = 0; i < 4; i++) {
        this.car.applyEngineForce(0, i)
        this.car.setBrake(slowDownCar, i)
      }
    }
  }
}
