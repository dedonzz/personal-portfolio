import * as THREE from 'three'

// Vehicle configuration based on RV Engine physics
export const vehicleConfig = {
  // Mass and inertia
  mass: 250, // kg
  inertia: 800, // kg*m^2 (rotational inertia)
  
  // Dimensions
  length: 4.47,
  width: 1.96,
  height: 1.0,
  wheelBase: 2.8, // Distance between front and rear axles
  track: 1.6, // Distance between left and right wheels
  centerOfGravityHeight: 0.5,
  
  // Engine
  maxForce: 750, // Newton
  brakingForce: 36, // Newton (per second)
  maxSteeringAngle: 0.5, // radians (about 28 degrees)
  
  // Tire friction
  frictionCoefficient: 0.8,
  frictionSlip: 30, // slip threshold
  tireRadius: 0.35,
  
  // Suspension
  suspensionStiffness: 55, // Spring constant
  suspensionRestHeight: 0.5,
  suspensionMaxTravel: 1.0,
  suspensionMaxForce: 10000,
  
  // Damping
  dampingRelaxation: 2.3,
  dampingCompression: 4.3,
  
  // Aerodynamics
  dragCoefficient: 0.3,
  rollingResistance: 0.02,
  
  // Stability
  rollInfluence: 0.01,
  downForceCoefficient: 0.01
}

export function createVehicleState() {
  return {
    // Position and rotation
    position: new THREE.Vector3(0, 0.35, 0),
    rotation: 0,
    
    // Linear velocity
    velocity: new THREE.Vector3(0, 0, 0),
    speed: 0,
    
    // Angular velocity
    angularVelocity: 0,
    
    // Control inputs (0 to 1)
    throttle: 0,
    brake: 0,
    steering: 0,
    
    // Suspension state (for each wheel)
    suspensionLength: [
      vehicleConfig.suspensionRestHeight,
      vehicleConfig.suspensionRestHeight,
      vehicleConfig.suspensionRestHeight,
      vehicleConfig.suspensionRestHeight
    ],
    suspensionVelocity: [0, 0, 0, 0],
    
    // Tire state
    tireSlip: [0, 0, 0, 0],
    tireLongitudinalSlip: [0, 0, 0, 0],
    
    // Wheel rotation
    wheelRotation: [0, 0, 0, 0],
    
    // Steering angle
    steeringAngle: 0,
    steeringVelocity: 0,
    
    // Vehicle state
    isGrounded: true,
    verticalVelocity: 0
  }
}

// Calculate tire grip force based on slip angle
export function calculateTireGripForce(slipAngle, normalForce, config) {
  // Simplified tire model: grip decreases with slip angle
  const maxGripForce = config.frictionCoefficient * normalForce
  const slipFactor = Math.max(0, 1 - Math.abs(slipAngle) / config.frictionSlip)
  return maxGripForce * slipFactor
}

// Calculate suspension force
export function calculateSuspensionForce(suspensionLength, vehicleVelocity, wheelVelocity, config) {
  // Spring force
  const displacement = config.suspensionRestHeight - suspensionLength
  const springForce = displacement * config.suspensionStiffness
  
  // Damping force (based on compression/relaxation)
  const relativeVelocity = vehicleVelocity - wheelVelocity
  let dampingForce = 0
  
  if (relativeVelocity > 0) {
    // Compression
    dampingForce = relativeVelocity * config.dampingCompression
  } else {
    // Relaxation
    dampingForce = relativeVelocity * config.dampingRelaxation
  }
  
  const totalForce = springForce + dampingForce
  
  // Limit suspension force
  return Math.max(-config.suspensionMaxForce, Math.min(config.suspensionMaxForce, totalForce))
}

// Calculate vehicle dynamics
export function updateVehiclePhysics(state, deltaTime, config) {
  const dt = deltaTime || 0.016

  // Wheel positions relative to car center
  const wheelPositions = [
    { x: -config.track / 2, z: config.wheelBase / 2 },  // Front left
    { x: config.track / 2, z: config.wheelBase / 2 },   // Front right
    { x: -config.track / 2, z: -config.wheelBase / 2 }, // Rear left
    { x: config.track / 2, z: -config.wheelBase / 2 }   // Rear right
  ]

  // Update steering angle (smooth steering)
  const maxSteeringRate = 0.1
  const targetSteering = state.steering * config.maxSteeringAngle
  const steeringDiff = targetSteering - state.steeringAngle
  state.steeringVelocity = Math.max(-maxSteeringRate, Math.min(maxSteeringRate, steeringDiff / dt))
  state.steeringAngle += state.steeringVelocity * dt

  // Calculate forces
  let totalLongitudinalForce = 0
  let totalLateralForce = 0
  let totalYawMoment = 0
  let totalVerticalForce = 0

  // Process each wheel
  for (let i = 0; i < 4; i++) {
    const isFront = i < 2
    const isLeft = i % 2 === 0

    // Wheel position in world space
    const wheelWorldPos = new THREE.Vector3(
      state.position.x + wheelPositions[i].x * Math.cos(state.rotation) - wheelPositions[i].z * Math.sin(state.rotation),
      state.position.y - config.centerOfGravityHeight,
      state.position.z + wheelPositions[i].x * Math.sin(state.rotation) + wheelPositions[i].z * Math.cos(state.rotation)
    )

    // Ground contact (simplified: wheels always on ground)
    const normalForce = (config.mass / 4) * 9.81

    // Tire slip angle
    const forwardDir = new THREE.Vector3(Math.sin(state.rotation), 0, Math.cos(state.rotation))
    const rightDir = new THREE.Vector3(Math.cos(state.rotation), 0, -Math.sin(state.rotation))

    const localVelocity = state.velocity.clone().sub(forwardDir.multiplyScalar(state.velocity.dot(forwardDir)))
    let slipAngle = Math.atan2(localVelocity.dot(rightDir), Math.max(0.1, state.speed))

    // Add steering influence to front wheels
    if (isFront) {
      slipAngle -= state.steeringAngle
    }

    state.tireSlip[i] = slipAngle

    // Tire grip force
    const gripForce = calculateTireGripForce(slipAngle, normalForce, config)

    // Longitudinal force (traction/braking)
    let longitudinalForce = 0
    if (isFront) {
      // Front wheel drive (adjust if rear-wheel drive)
      longitudinalForce = state.throttle * config.maxForce / 2
    } else {
      // Rear wheels
      longitudinalForce = state.throttle * config.maxForce / 2
    }

    // Braking force (all wheels)
    longitudinalForce -= state.brake * config.brakingForce

    // Lateral force from tire slip
    const lateralForce = gripForce * Math.sin(slipAngle)

    // Add to totals
    const forceDir = new THREE.Vector3(
      Math.sin(state.rotation + (isFront ? state.steeringAngle : 0)),
      0,
      Math.cos(state.rotation + (isFront ? state.steeringAngle : 0))
    )

    totalLongitudinalForce += longitudinalForce
    totalLateralForce += lateralForce * Math.cos(isFront ? state.steeringAngle : 0)

    // Yaw moment from lateral forces
    const wheelDistance = wheelPositions[i].z // Distance from center
    totalYawMoment += lateralForce * wheelDistance

    // Suspension force
    const suspensionForce = calculateSuspensionForce(
      state.suspensionLength[i],
      state.velocity.y,
      0,
      config
    )
    totalVerticalForce += suspensionForce
  }

  // Apply drag and rolling resistance
  const speed = state.speed
  const dragForce = -0.5 * config.dragCoefficient * speed * speed * Math.sign(speed)
  const rollingResistance = -config.rollingResistance * config.mass * 9.81 * Math.sign(state.speed)

  totalLongitudinalForce += dragForce + rollingResistance

  // Update linear velocity
  const longitudinalAccel = (totalLongitudinalForce / config.mass) * Math.cos(state.rotation)
  const lateralAccel = (totalLateralForce / config.mass) * Math.sin(state.rotation)

  state.velocity.x += longitudinalAccel * dt
  state.velocity.z += lateralAccel * dt

  // Update speed
  state.speed = Math.sqrt(state.velocity.x * state.velocity.x + state.velocity.z * state.velocity.z)
  if (state.velocity.x * state.velocity.x + state.velocity.z * state.velocity.z < 0.01) {
    state.speed = 0
  }

  // Update position
  state.position.x += state.velocity.x * dt
  state.position.z += state.velocity.z * dt

  // Update angular velocity
  state.angularVelocity = totalYawMoment / config.inertia
  state.rotation += state.angularVelocity * dt

  // Normalize rotation
  if (state.rotation > Math.PI) state.rotation -= 2 * Math.PI
  if (state.rotation < -Math.PI) state.rotation += 2 * Math.PI

  // Update wheel rotations
  for (let i = 0; i < 4; i++) {
    state.wheelRotation[i] += state.speed / config.tireRadius
  }

  // Vertical physics (gravity)
  state.verticalVelocity += -9.81 * dt
  state.position.y += state.verticalVelocity * dt

  // Ground collision
  if (state.position.y <= 0) {
    state.position.y = 0
    state.verticalVelocity = 0
    state.isGrounded = true
  } else {
    state.isGrounded = false
  }

  return {
    acceleration: longitudinalAccel,
    lateralAcceleration: lateralAccel,
    yawRate: state.angularVelocity
  }
}

export function createVehicleMesh(scene, state, config) {
  const vehicle = new THREE.Group()

  // Chassis body
  const chassisGeometry = new THREE.BoxGeometry(config.width, config.height, config.length)
  const chassisMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
  const chassis = new THREE.Mesh(chassisGeometry, chassisMaterial)
  chassis.castShadow = true
  chassis.receiveShadow = true
  chassis.position.y = config.height / 2 + config.suspensionRestHeight
  vehicle.add(chassis)

  // Roof
  const roofGeometry = new THREE.BoxGeometry(config.width * 0.85, config.height * 0.6, config.length * 0.5)
  const roofMaterial = new THREE.MeshPhongMaterial({ color: 0xcc0000 })
  const roof = new THREE.Mesh(roofGeometry, roofMaterial)
  roof.castShadow = true
  roof.receiveShadow = true
  roof.position.y = config.height + config.suspensionRestHeight
  roof.position.z = -config.length * 0.1
  vehicle.add(roof)

  // Windows
  const windowMaterial = new THREE.MeshPhongMaterial({ color: 0x88ccff, transparent: true, opacity: 0.6 })
  const windowGeometry = new THREE.BoxGeometry(config.width * 0.7, config.height * 0.4, 0.05)
  const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial)
  frontWindow.position.y = config.height + config.suspensionRestHeight - 0.1
  frontWindow.position.z = config.length / 2 - 0.05
  vehicle.add(frontWindow)

  // Create wheels
  const wheels = []
  const wheelPositions = [
    [-config.track / 2, config.suspensionRestHeight, config.wheelBase / 2],
    [config.track / 2, config.suspensionRestHeight, config.wheelBase / 2],
    [-config.track / 2, config.suspensionRestHeight, -config.wheelBase / 2],
    [config.track / 2, config.suspensionRestHeight, -config.wheelBase / 2]
  ]

  wheelPositions.forEach((pos, index) => {
    const wheelGroup = new THREE.Group()
    
    // Tire
    const tireGeometry = new THREE.CylinderGeometry(config.tireRadius, config.tireRadius, 0.2, 16)
    const tireMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
    const tire = new THREE.Mesh(tireGeometry, tireMaterial)
    tire.rotation.z = Math.PI / 2
    tire.castShadow = true
    tire.receiveShadow = true
    wheelGroup.add(tire)

    // Rim
    const rimGeometry = new THREE.CylinderGeometry(config.tireRadius * 0.7, config.tireRadius * 0.7, 0.15, 16)
    const rimMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 })
    const rim = new THREE.Mesh(rimGeometry, rimMaterial)
    rim.rotation.z = Math.PI / 2
    rim.castShadow = true
    rim.receiveShadow = true
    wheelGroup.add(rim)

    wheelGroup.position.set(...pos)
    vehicle.add(wheelGroup)
    
    wheels.push({
      group: wheelGroup,
      isFront: index < 2,
      rotationX: 0
    })
  })

  vehicle.position.copy(state.position)
  vehicle.rotation.y = state.rotation
  vehicle.castShadow = true
  scene.add(vehicle)

  return {
    mesh: vehicle,
    wheels,
    chassis
  }
}
