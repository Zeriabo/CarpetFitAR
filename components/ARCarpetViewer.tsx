import React, {useEffect, useState} from 'react';
<<<<<<< HEAD
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ImageBackground,
} from 'react-native';
import {ArViewerView} from 'react-native-ar-viewer';
import {Text, Button, Card} from 'react-native-paper';
import RNFS from 'react-native-fs';

// Local GLB files for Android, remote USDZ URLs for iOS
const modelMap: {[key: string]: {android: string; ios: string}} = {
  '1.perisian': {
    android: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    ios: 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet1.usdz',
  },
  '2.ajam': {
    android: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    ios: 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet2.usdz',
  },
  '3.italian': {
    android: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    ios: 'https://dl.dropboxusercontent.com/scl/fi/i6fuipr0n07147t2kqa28/carpet3.usdz?rlkey=aq43i8y8zzixsiarx6q3ow6jo&st=fh50whfr',
  },
=======
import {View, Text, Platform, StyleSheet} from 'react-native';
import {ArViewerView} from 'react-native-ar-viewer';
import RNFS from 'react-native-fs';

const modelMap: {[key: string]: string} = {
  '1.perisian':
    Platform.OS === 'android'
      ? 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet1.glb'
      : 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet1.usdz',
  '2.ajam':
    Platform.OS === 'android'
      ? 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet2.glb'
      : 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet2.usdz',
  '3.italian':
    Platform.OS === 'android'
      ? 'https://dl.dropboxusercontent.com/scl/fi/i6fuipr0n07147t2kqa28/carpet3.glb?rlkey=aq43i8y8zzixsiarx6q3ow6jo&st=fh50whfr'
      : 'https://dl.dropboxusercontent.com/scl/fi/i6fuipr0n07147t2kqa28/carpet3.usdz?rlkey=aq43i8y8zzixsiarx6q3ow6jo&st=fh50whfr',
>>>>>>> origin/master
};

const ARCarpetViewer = ({route}: any) => {
  const {imageName} = route.params;
  const [modelPath, setModelPath] = useState<string>('');
<<<<<<< HEAD
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadModel = async () => {
      try {
        const modelUrls = modelMap[imageName];

        if (!modelUrls) {
          if (isMounted) {
            setErrorMsg(`Model not found for: ${imageName}`);
            setIsLoading(false);
          }
          return;
        }

        const modelUrl =
          Platform.OS === 'android' ? modelUrls.android : modelUrls.ios;
        const extension = Platform.OS === 'android' ? 'glb' : 'usdz';
        const fileName = `${imageName}.${extension}`;
        const localModelPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        const exists = await RNFS.exists(localModelPath);
        if (!exists) {
          console.log(
            `[${Platform.OS.toUpperCase()}] Downloading ${extension.toUpperCase()} from:`,
            modelUrl,
          );

          const result = await RNFS.downloadFile({
            fromUrl: modelUrl,
            toFile: localModelPath,
          }).promise;

          if (result.statusCode !== 200) {
            if (isMounted) {
              setErrorMsg(
                `Download failed: ${result.statusCode}. Please check your internet connection.`,
              );
              setIsLoading(false);
            }
            return;
          }
        }

        if (isMounted) {
          setModelPath(localModelPath);
          setIsLoading(false);
          setErrorMsg(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMsg(
            `Error: ${error instanceof Error ? error.message : String(error)}`,
          );
          setIsLoading(false);
        }
=======

  useEffect(() => {
    const loadModel = async () => {
      const extension = Platform.OS === 'android' ? 'glb' : 'usdz';
      const modelSrc = modelMap[imageName];

      const renamedId = imageName;
      const localModelPath = `${RNFS.DocumentDirectoryPath}/${renamedId}.${extension}`;

      try {
        const exists = await RNFS.exists(localModelPath);
        if (!exists) {
          console.log(`Downloading and saving as: ${localModelPath}`);

          const result = await RNFS.downloadFile({
            fromUrl: modelSrc,
            toFile: localModelPath,
          }).promise;

          if (result.statusCode === 200) {
            console.log('Model downloaded and saved as:', localModelPath);
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
>>>>>>> origin/master
      }
    };

    loadModel();
<<<<<<< HEAD

    return () => {
      isMounted = false;
    };
  }, [imageName, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      {/* Error State */}
      {errorMsg && (
        <View style={styles.errorContainer}>
          <ImageBackground
            source={require('../assets/images/background.jpeg')}
            style={styles.errorBg}
            blurRadius={2}>
            <View style={styles.errorOverlay}>
              <Card style={styles.errorCard}>
                <Card.Content style={styles.errorContent}>
                  <Text style={styles.errorIcon}>⚠️</Text>
                  <Text style={styles.errorTitle}>Unable to Load Model</Text>
                  <Text style={styles.errorMessage}>{errorMsg}</Text>
                  <Button
                    mode="contained"
                    onPress={handleRetry}
                    style={styles.retryButton}
                    labelStyle={styles.retryLabel}>
                    Try Again
                  </Button>
                </Card.Content>
              </Card>
            </View>
          </ImageBackground>
        </View>
      )}

      {/* Loading State */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ImageBackground
            source={require('../assets/images/background.jpeg')}
            style={styles.loadingBg}
            blurRadius={2}>
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#2C5F8D" />
              <Text style={styles.loadingText}>Preparing your AR experience...</Text>
              <Text style={styles.loadingSubtext}>
                {Platform.OS === 'android'
                  ? 'Loading carpet model'
                  : 'Fetching 3D model'}
              </Text>
            </View>
          </ImageBackground>
        </View>
      )}

      {/* AR Viewer */}
      {modelPath && !isLoading && !errorMsg && (
=======
  }, [imageName]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AR Carpet Viewer</Text>

      {/* AR Viewer */}
      {modelPath && (
>>>>>>> origin/master
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
<<<<<<< HEAD
          /*
          onStarted={() => console.log('AR Started')}
          onEnded={() => console.log('AR Ended')}
          onModelPlaced={() => console.log('Model Placed')}
          onModelRemoved={() => console.log('Model Removed')}
          */
        />
      )}

      {/* Fallback message */}
      {!modelPath && !isLoading && !errorMsg && (
        <View style={styles.emptyContainer}>
          <ImageBackground
            source={require('../assets/images/background.jpeg')}
            style={styles.emptyBg}
            blurRadius={2}>
            <View style={styles.emptyOverlay}>
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyTitle}>Ready for AR</Text>
              <Text style={styles.emptyMessage}>
                Position your device to place the carpet in your space
              </Text>
            </View>
          </ImageBackground>
        </View>
      )}
=======
          onStarted={() => console.log('AR Started with model:', modelPath)}
          onEnded={() => console.log('AR Ended')}
          onModelPlaced={() => console.log('Model Placed')}
          onModelRemoved={() => console.log('Model Removed')}
        />
      )}
>>>>>>> origin/master
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#FFFBFE',
  },
  arView: {
    flex: 1,
  },

  // Loading State
  loadingContainer: {
    flex: 1,
  },
  loadingBg: {
    flex: 1,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#E0E0E0',
    textAlign: 'center',
  },

  // Error State
  errorContainer: {
    flex: 1,
  },
  errorBg: {
    flex: 1,
  },
  errorOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
  },
  errorContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#2C5F8D',
    width: '100%',
  },
  retryLabel: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
  },
  emptyBg: {
    flex: 1,
  },
  emptyOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#E0E0E0',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  },
});

export default ARCarpetViewer;
=======
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
>>>>>>> origin/master
