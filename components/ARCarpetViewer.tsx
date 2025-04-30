import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import {ArViewerView} from 'react-native-ar-viewer';
import RNFS from 'react-native-fs';

const ARCarpetViewer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modelPath, setModelPath] = useState<string>('');

  const handleImageSelection = async (imageName: string) => {
    console.log('Image selection');
    setSelectedImage(imageName);

    const extension = Platform.OS === 'android' ? 'glb' : 'usdz';
    const modelSrc =
      Platform.OS === 'android'
        ? 'https://github.com/riderodd/react-native-ar/blob/main/example/src/dice.usdz?raw=true'
        : 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet1.usdz';

    const localModelPath = `${RNFS.DocumentDirectoryPath}/model.${extension}`;

    console.log('Model will be saved at:', localModelPath);

    const exists = await RNFS.exists(localModelPath);
    if (exists) {
      const stat = await RNFS.stat(localModelPath);
      console.log('Downloaded model path:', localModelPath);
      console.log('File size:', stat.size);
    }
    if (!exists) {
      console.log('Model does not exist, downloading...');
      await RNFS.downloadFile({
        fromUrl: modelSrc,
        toFile: localModelPath,
      }).promise;
      console.log('Model downloaded successfully.');
    } else {
      console.log('Model already exists locally.');
    }
    setModelPath(localModelPath);
    console.log('model path is :  ' + modelPath);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AR Carpet Viewer</Text>

      {/* Image Selection */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleImageSelection('1.png')}>
          <Image
            source={require('../assets/images/1.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImageSelection('2.png')}>
          <Image
            source={require('../assets/images/1.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      {/* AR Viewer */}
      {modelPath && (
        <ArViewerView
          style={styles.arView}
          model={modelPath}
          lightEstimation
          manageDepth
          allowRotate
          allowScale
          allowTranslate
          disableInstructions={false}
          disableInstantPlacement={false}
          planeOrientation="horizontal"
          onStarted={() => console.log('AR Started with model:', modelPath)}
          onEnded={() => console.log('AR Ended')}
          onModelPlaced={() => console.log('Model Placed')}
          onModelRemoved={() => console.log('Model Removed')}
        />
      )}

      {/* Display selected image info */}
      {selectedImage && (
        <Text style={styles.selectedText}>
          Selected Carpet: {selectedImage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  arView: {
    flex: 1,
  },
  selectedText: {
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default ARCarpetViewer;
