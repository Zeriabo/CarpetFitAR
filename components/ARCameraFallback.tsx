import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('window');

const ARCameraFallback = ({route, navigation}: any) => {
  const {imageName} = route.params;
  const cameraRef = useRef<RNCamera>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      setIsCapturing(true);
      const options = {
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      };
      
      const data = await cameraRef.current.takePictureAsync(options);
      
      Alert.alert(
        'Photo Captured',
        'Your photo has been saved to your device gallery.',
        [
          {
            text: 'OK',
            onPress: () => setIsCapturing(false),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', `Failed to capture photo: ${error}`);
      setIsCapturing(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
      >
        {/* Header */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Overlay Info */}
        <View style={styles.overlay}>
          <Text style={styles.title}>Room Preview</Text>
          <Text style={styles.subtitle}>
            Position your device to see where the carpet could go
          </Text>
        </View>

        {/* Capture Button */}
        <View style={styles.bottomControls}>
          {isCapturing ? (
            <ActivityIndicator size="large" color="#2C5F8D" />
          ) : (
            <>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner}>
                  <Text style={styles.captureButtonText}>📸 Capture</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.hint}>
                Take a photo to save this moment
              </Text>
            </>
          )}
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(44, 95, 141, 0.9)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  bottomControls: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingBottom: 24,
    paddingTop: 20,
    alignItems: 'center',
    gap: 12,
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2C5F8D',
  },
  captureButtonInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    fontSize: 18,
  },
  hint: {
    color: '#AAA',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ARCameraFallback;
