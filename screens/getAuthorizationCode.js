import * as AuthSession from 'expo-auth-session';
import spotifyCredentials from '../screens/secrets';
import { WebView } from 'react-native-webview';

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
 console.log("test") 
 try {
    // const credentials = spotifyCredentials //we wrote this function above
    const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        spotifyCredentials.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl),
    })
    
  } catch (err) {
    console.error(err)
  }
  
  return result.params.code

}

export default getAuthorizationCode