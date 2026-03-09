import React, {useState} from 'react';
import {
  ViroARScene,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroQuad,
  ViroAmbientLight,
  ViroMaterials,
  ViroNode,
} from '@viro-community/react-viro';

ViroMaterials.createMaterials({
  carpet1: {
    diffuseTexture: require('../assets/images/1.png'),
  },
  carpet2: {
    diffuseTexture: require('../assets/images/2.png'),
  },
  carpet3: {
    diffuseTexture: require('../assets/images/3.png'),
  },
});

const materialMap: Record<string, 'carpet1' | 'carpet2' | 'carpet3'> = {
  '1.perisian': 'carpet1',
  '2.ajam': 'carpet2',
  '3.italian': 'carpet3',
};

const sizeMap: Record<string, {width: number; height: number}> = {
  '1.perisian': {width: 1.8, height: 1.2},
  '2.ajam': {width: 1.6, height: 1.1},
  '3.italian': {width: 1.7, height: 1.15},
};

const ViroCarpetScene = (props: any) => {
  const imageName = props?.sceneNavigator?.viroAppProps?.imageName as string;
  const material = materialMap[imageName] ?? 'carpet1';
  const size = sizeMap[imageName] ?? {width: 1.6, height: 1.1};
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);
  const [rotationY, setRotationY] = useState(0);

  const handlePinch = (pinchState: number, scaleFactor: number) => {
    if (pinchState === 3) {
      return;
    }

    const clamped = Math.max(0.4, Math.min(2.2, scale[0] * scaleFactor));
    setScale([clamped, clamped, clamped]);
  };

  const handleRotate = (rotateState: number, rotationFactor: number) => {
    if (rotateState === 3) {
      return;
    }

    setRotationY(prev => prev + rotationFactor);
  };

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" intensity={350} />
      <ViroARPlaneSelector>
        <ViroARPlane alignment="Horizontal">
          <ViroNode
            position={[0, 0, 0]}
            scale={scale}
            rotation={[0, rotationY, 0]}
            dragType="FixedToWorld"
            onPinch={handlePinch}
            onRotate={handleRotate}>
            <ViroQuad
              position={[0, 0, 0]}
              rotation={[-90, 0, 0]}
              width={size.width}
              height={size.height}
              materials={[material]}
            />
          </ViroNode>
        </ViroARPlane>
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default ViroCarpetScene;
