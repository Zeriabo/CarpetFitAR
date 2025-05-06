import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {ArViewerView} from 'react-native-ar-viewer';
import RNFS from 'react-native-fs';

const modelMap: {[key: string]: string} = {
  '1.png':
    Platform.OS === 'android'
      ? 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet1.glb'
      : 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet1.usdz',
  '2.png':
    Platform.OS === 'android'
      ? 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet2.glb'
      : 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet2.usdz',
  '3.png':
    Platform.OS === 'android'
      ? 'https://dl.dropboxusercontent.com/scl/fi/i6fuipr0n07147t2kqa28/carpet3.glb?rlkey=aq43i8y8zzixsiarx6q3ow6jo&st=fh50whfr'
      : 'https://dl.dropboxusercontent.com/scl/fi/i6fuipr0n07147t2kqa28/carpet3.usdz?rlkey=aq43i8y8zzixsiarx6q3ow6jo&st=fh50whfr',
};

const ARCarpetViewer = ({route}: any) => {
  const {imageName} = route.params;
  const [modelPath, setModelPath] = useState<string>('');

  useEffect(() => {
    const loadModel = async () => {
      const extension = Platform.OS === 'android' ? 'glb' : 'usdz';
      const modelSrc = modelMap[imageName];
      const localModelPath = `${RNFS.DocumentDirectoryPath}/model_${imageName}.${extension}`;
      if (Platform.OS === 'ios') {
        setModelPath(localModelPath);
        return;
      }
      try {
        const exists = await RNFS.exists(localModelPath);
        if (!exists) {
          const result = await RNFS.downloadFile({
            fromUrl: modelSrc,
            toFile: localModelPath,
          }).promise;

          if (result.statusCode === 200) {
            console.log('Model downloaded:', localModelPath);
          } else {
            console.error('Download failed with status:', result.statusCode);
            return;
          }
        } else {
          console.log('Model already exists:', localModelPath);
        }
        setModelPath(localModelPath);
      } catch (err) {
        console.error('Error loading model:', err);
      }
    };

    loadModel();
  }, [imageName]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AR Carpet Viewer</Text>

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
