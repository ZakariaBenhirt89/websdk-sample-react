import './App.css';
import {useState} from 'react'
import ReactiveButton from 'reactive-button';
declare var ZoomMtg;

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.5/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {
  const [state, setState] = useState('idle');
  var passWord
  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  var signatureEndpoint = 'https://afternoon-tundra-19392.herokuapp.com'
  var apiKey = 'euHrspOISCCyX35TpYeS2w'
  var meetingNumber = 82603001870
  var role = 0
  var leaveUrl = 'http://localhost:3000'
  var userName = 'React'
  var userEmail = 'zaki.soussi1996@gmail.com'
  passWord = 346180
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJldUhyc3BPSVNDQ3lYMzVUcFllUzJ3IiwiZXhwIjozMzQ0NDQ0NDQ0NDQ0OTh9.-aWkRU7tjbCxnhfu6B9BzgkkCVeIwNUGAhAlMBh_NK");
  myHeaders.append("Cookie", "_zm_page_auth=aw1_c_a11QZPCXQIyuHzJKlxTUgA; _zm_ssid=aw1_c_psc4oDw1SiyGg1X9pcAKXQ; cred=79D90E9C4180676F844E9B7B7876EACC");
  myHeaders.append("Origin" , "http://172.0.0.1:3000")
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
    origin: 'http://172.0.0.1:3000',
    host : 'https://api.zoom.us'
  };
  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  const onClickHandler = () => {
    setState('loading');
    setTimeout(() => {
      setState('success');
    }, 2000);
    fetch("https://api.zoom.us/v2/meetings/83635828726", requestOptions)
        .then(response => response.text())
        .then(result => setTimeout(() => {
          console.log(result)
        } , 2000))
        .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom WebSDK Sample React</h1>
        <button onClick={getSignature}>Join Meeting</button>
        <ReactiveButton
            buttonState={state}
            onClick={onClickHandler}
            color={'primary'}
            idleText={'Get my credentials'}
            loadingText={'Loading'}
            successText={'Success'}
            errorText={'Error'}
            type={'button'}
            className={'class1 class2'}
            style={{ borderRadius: '5px' }}
            outline={false}
            shadow={false}
            rounded={false}
            size={'normal'}
            block={false}
            messageDuration={2000}
            disabled={false}
            buttonRef={null}
            width={null}
            height={null}
            animation={true}
        />
      </main>
    </div>
  );
}

export default App;
