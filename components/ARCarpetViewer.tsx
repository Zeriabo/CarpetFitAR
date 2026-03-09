import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ImageBackground,
  Text,
  Pressable,
} from 'react-native';
import {ArViewerView} from 'react-native-ar-viewer';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';

// Local GLB files for Android, remote USDZ URLs for iOS
const modelMap: {[key: string]: {android: string; ios: string}} = {
  '1.perisian': {
    android: 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet1.glb',
    ios: 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet1.usdz',
  },
  '2.ajam': {
    android: 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet2.glb',
    ios: 'https://raw.githubusercontent.com/Zeriabo/carpetfitAug/master/assets/models/carpet2.usdz',
  },
  '3.italian': {
    // Using sample model until proper carpet3 model is available
    android: 'https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    ios: 'https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
  },
};

const ARCarpetViewer = ({route}: any) => {
  const {imageName} = route.params;
  const isAndroid = Platform.OS === 'android';
  const androidModel = isAndroid
    ? String((Platform.constants as any)?.Model ?? '')
    : '';
  const androidSdk = isAndroid ? Number((Platform.constants as any)?.Version ?? 0) : 0;
  const isKnownArCrashDevice =
    isAndroid &&
    androidSdk <= 29 &&
    /moto g\(8\) power lite|moto g8 power lite|blackjack/i.test(androidModel);
  const [modelPath, setModelPath] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [androidMode, setAndroidMode] = useState<'ar' | 'viewer'>(
    isKnownArCrashDevice ? 'viewer' : 'ar',
  );
  const [androidViroError] = useState<string | null>(
    isKnownArCrashDevice
      ? 'AR is not supported on this device. Showing the 3D viewer instead.'
      : null,
  );

  const ViroARSceneNavigator = isAndroid
    ? require('@viro-community/react-viro').ViroARSceneNavigator
    : null;
  const ViroCarpetScene = isAndroid ? require('./ViroCarpetScene').default : null;

  const [retryCount, setRetryCount] = useState(0);

  // Generate HTML for Android WebView with model-viewer
  const getAndroidARHtml = () => {
    const modelUrls = modelMap[imageName];
    if (!modelUrls) return '';
    
    const modelUrl = modelUrls.android;
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"></script>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body {
              width: 100%;
              height: 100%;
              background: #000;
            }
            model-viewer {
              width: 100%;
              height: 100%;
              background: #1a1a1a;
              --poster-color: #1a1a1a;
            }
            .ui-container {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
              padding: 20px;
              z-index: 100;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 15px;
            }
            .controls {
              display: flex;
              gap: 10px;
              justify-content: center;
              flex-wrap: wrap;
            }
            button {
              background: #2C5F8D;
              color: white;
              border: none;
              padding: 12px 20px;
              border-radius: 24px;
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              transition: background 0.2s;
            }
            button:active:not(:disabled) {
              background: #1a3f5c;
            }
            button:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }
            .info {
              position: fixed;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(255,255,255,0.9);
              color: #333;
              padding: 10px 16px;
              border-radius: 8px;
              font-size: 12px;
              z-index: 99;
            }
            .ar-unavailable {
              background: rgba(255, 152, 0, 0.9);
              color: white;
              text-align: center;
              padding: 12px 16px;
              border-radius: 8px;
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="info">👆 Drag to rotate • 🤏 Pinch to zoom</div>
          <model-viewer 
            id="viewer"
            src="${modelUrl}"
            camera-controls
            auto-rotate
            camera-orbit="0deg 75deg 105%"
            shadow-intensity="1"
            exposure="1"
          ></model-viewer>
          
          <div class="ui-container">
            <div id="ar-status"></div>
            <div class="controls">
              <button id="resetView">↺ Reset View</button>
              <button id="toggleAR" style="display:none;">📱 View AR</button>
            </div>
          </div>
          
          <script>
            const viewer = document.getElementById('viewer');
            const arButton = document.getElementById('toggleAR');
            const arStatus = document.getElementById('ar-status');
            const resetButton = document.getElementById('resetView');
            
            // Check AR support
            viewer.addEventListener('model-visibility', () => {
              setTimeout(() => {
                if (viewer.ar) {
                  arButton.style.display = 'block';
                  arStatus.innerHTML = '';
                } else {
                  arButton.style.display = 'none';
                  arStatus.innerHTML = '<div class="ar-unavailable">⚠️ AR Not Available on This Device</div>';
                }
              }, 500);
            });
            
            arButton.addEventListener('click', async () => {
              try {
                arButton.textContent = '⏳ Starting AR...';
                arButton.disabled = true;
                
                if (viewer.ar) {
                  await viewer.enterAR();
                } else {
                  throw new Error('AR not supported');
                }
              } catch (error) {
                console.error('AR Error:', error);
                arButton.textContent = '❌ AR Failed';
                setTimeout(() => {
                  arButton.textContent = '📱 View AR';
                  arButton.disabled = false;
                }, 2000);
              }
            });
            
            resetButton.addEventListener('click', () => {
              viewer.cameraOrbit = '0deg 75deg 105%';
            });
          </script>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    // Android uses Scene Viewer with direct URL, no download needed
    if (isAndroid) {
      setIsLoading(false);
      return;
    }

    // iOS: Download and prepare USDZ model
    let isMounted = true;

    const loadModel = async () => {
      try {
        if (isKnownArCrashDevice) {
          if (isMounted) {
            setErrorMsg(
              'AR is not supported on this Android device due to a GPU driver crash. Please try another device.',
            );
            setIsLoading(false);
          }
          return;
        }

        const modelUrls = modelMap[imageName];

        if (!modelUrls) {
          if (isMounted) {
            setErrorMsg(`Model not found for: ${imageName}`);
            setIsLoading(false);
          }
          return;
        }

        const modelUrl = modelUrls.ios;
        const extension = 'usdz';
        const fileName = `${imageName}.${extension}`;
        const localModelPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        const exists = await RNFS.exists(localModelPath);
        if (!exists) {
          console.log(
            `[iOS] Downloading USDZ from:`,
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
      }
    };

    loadModel();

    return () => {
      isMounted = false;
    };
  }, [imageName, retryCount, isKnownArCrashDevice, isAndroid]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      {/* Android: AR (Viro) with 3D viewer fallback */}
      {isAndroid && !isLoading && !errorMsg && (
        <View style={styles.androidContainer}>
          <View style={styles.modeToggle}>
            <Pressable
              style={[
                styles.modeButton,
                androidMode === 'ar' && styles.modeButtonActive,
              ]}
              onPress={() => setAndroidMode('ar')}>
              <Text
                style={[
                  styles.modeButtonText,
                  androidMode === 'ar' && styles.modeButtonTextActive,
                ]}>
                AR View
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.modeButton,
                androidMode === 'viewer' && styles.modeButtonActive,
              ]}
              onPress={() => setAndroidMode('viewer')}>
              <Text
                style={[
                  styles.modeButtonText,
                  androidMode === 'viewer' && styles.modeButtonTextActive,
                ]}>
                3D Viewer
              </Text>
            </Pressable>
          </View>

          {androidMode === 'ar' && ViroARSceneNavigator && ViroCarpetScene ? (
            <View style={styles.androidArWrapper}>
              <ViroARSceneNavigator
                style={styles.arView}
                initialScene={{scene: ViroCarpetScene as any}}
                viroAppProps={{imageName}}
              />
              <View style={styles.androidArHint}>
                <Text style={styles.androidArHintText}>
                  Drag to move • Pinch to resize • Twist to rotate
                </Text>
              </View>
            </View>
          ) : (
            <WebView
              source={{html: getAndroidARHtml()}}
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              databaseEnabled={true}
              geolocationEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              mixedContentMode="always"
              allowFileAccess={true}
              onPermissionRequest={(event: any) => {
                event.grant(['camera', 'microphone']);
              }}
              userAgent="Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
            />
          )}

          {androidViroError && androidMode !== 'ar' && (
            <View style={styles.androidBanner}>
              <Text style={styles.androidBannerText}>{androidViroError}</Text>
            </View>
          )}
        </View>
      )}

      {/* Error State */}
      {errorMsg && (
        <View style={styles.errorContainer}>
          <ImageBackground
            source={require('../assets/images/background.jpeg')}
            style={styles.errorBg}
            blurRadius={2}>
            <View style={styles.errorOverlay}>
              <View style={styles.errorCard}>
                <View style={styles.errorContent}>
                  <Text style={styles.errorIcon}>⚠️</Text>
                  <Text style={styles.errorTitle}>Unable to Load Model</Text>
                  <Text style={styles.errorMessage}>{errorMsg}</Text>
                  <Pressable onPress={handleRetry} style={styles.retryButton}>
                    <Text style={styles.retryLabel}>Try Again</Text>
                  </Pressable>
                </View>
              </View>
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
              <Text style={styles.loadingSubtext}>Fetching 3D model</Text>
            </View>
          </ImageBackground>
        </View>
      )}

      {/* AR Viewer - iOS only */}
      {!isAndroid && modelPath && !isLoading && !errorMsg && (
        <ArViewerView
          style={styles.arView}
          model={modelPath}
          lightEstimation
          manageDepth
          allowRotate
          allowScale
          allowTranslate
          planeOrientation="horizontal"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  arView: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  androidContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  modeToggle: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 30,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 14,
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.3)',
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modeButtonText: {
    color: '#B0C4DE',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  modeButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  androidBanner: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 152, 0, 0.95)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    zIndex: 20,
    shadowColor: '#FF9800',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  androidBannerText: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '700',
  },
  androidArWrapper: {
    flex: 1,
  },
  androidArHint: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.3)',
  },
  androidArHintText: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.2,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#B0C4DE',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  errorContent: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  errorIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1F1F1F',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#0891B2',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#E0E7FF',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 22,
  },
});

export default ARCarpetViewer;
