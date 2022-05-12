const { createBluetooth } = require( 'node-ble' );
// Setting up Firebase
var firebase = require('firebase/app');

const{getDatabase,ref,onValue,set,update, get} = require('firebase/database');

// TODO: Replace this with your Arduino's Bluetooth address
// as found by running the 'scan on' command in bluetoothctl
const ARDUINO_BLUETOOTH_ADDR = '4A:7A:D9:8C:D4:67';

const UART_SERVICE_UUID      = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const TX_CHARACTERISTIC_UUID = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';
const RX_CHARACTERISTIC_UUID = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

const EES_SERVICE_UUID       = '0000181a-0000-1000-8000-00805f9b34fb';
const TEMP_CHAR_UUID         = '00002a6e-0000-1000-8000-00805f9b34fb';
const HUM_CHAR_UUID         =  '00002a6f-0000-1000-8000-00805f9b34fb';
const WEI_CHAR_UUID         =  '00002a9e-0000-1000-8000-00805f9b34fb';


// Firebase setUp
const firebaseConfig = {
    apiKey: "AIzaSyDI2mksu7LclnCLwhioy76LemSeBXXSp2A",
    authDomain: "jamspantry.firebaseapp.com",
    databaseURL: "https://jamspantry-default-rtdb.firebaseio.com",
    projectId: "jamspantry",
    storageBucket: "jamspantry.appspot.com",
    messagingSenderId: "845355669248",
    appId: "1:845355669248:web:031fe792479753b84005e5",
    measurementId: "G-8GTLXSC1DT"
  };

firebase.initializeApp(firebaseConfig);
const database = getDatabase();

var num = 0;
var numStop = 100;
console.time("sync");
var databaseVal = ref(database, '/MghsIE6Ln1OaqiTZZERRV67kAMH2/Environment/');
var listHum =[]
var listTemp =[]
let countTemp= 1;
let countHum =1;
let tempCount =0;
let HumCount =0;

async function main( )
{

    // Reference the BLE adapter and begin device discovery...
    const { bluetooth, destroy } = createBluetooth();
    const adapter = await bluetooth.defaultAdapter();
    const discovery =  await adapter.startDiscovery();
    console.log( 'discovering...' );

    // Attempt to connect to the device with specified BT address
    const device = await adapter.waitDevice( ARDUINO_BLUETOOTH_ADDR.toUpperCase() );
    console.log( 'found device. attempting connection...' );
    await device.connect();
    console.log( 'connected to device!' );

    // Get references to the desired UART service and its characteristics
    const gattServer = await device.gatt();
    const uartService = await gattServer.getPrimaryService( UART_SERVICE_UUID.toLowerCase() );
    const txChar = await uartService.getCharacteristic( TX_CHARACTERISTIC_UUID.toLowerCase() );
    const rxChar = await uartService.getCharacteristic( RX_CHARACTERISTIC_UUID.toLowerCase() );


    get(ref(database,'/MghsIE6Ln1OaqiTZZERRV67kAMH2/Environment/Humidity/')).then((snapshot)=> {
        listHum= snapshot.val();            
        console.log(listHum);
    });
    get(ref(database,'/MghsIE6Ln1OaqiTZZERRV67kAMH2/Environment/Temperature/')).then((snapshot)=> {
        listTemp= snapshot.val();            
        //console.log(listHum);
    });
    
    dataInterval = 2;
    txChar.writeValue(Buffer.from(dataInterval.toString())).then(() =>
    {
                    console.log('Sent: ' + dataInterval);
    });
    // Get references to the desired ESS service and its temparature characteristic.
    // TODO
    const essService = await gattServer.getPrimaryService( EES_SERVICE_UUID.toLowerCase() );
    const temperatureChar = await essService.getCharacteristic( TEMP_CHAR_UUID.toLowerCase());
    const humidityChar = await essService.getCharacteristic( HUM_CHAR_UUID.toLowerCase());
    const weightChar = await essService.getCharacteristic( WEI_CHAR_UUID.toLowerCase());

    // Register for notifications on the RX characteristic
    await rxChar.startNotifications( );

    // Callback for when data is received on RX characteristic
    rxChar.on( 'valuechanged', buffer =>
    {
        console.log('Received_RX: ' + buffer.toString());
    });

    // Register for notifications on the temperature characteristic
    // TODO
    await temperatureChar.startNotifications( );
    await humidityChar.startNotifications( );
    await weightChar.startNotifications( );

    // Callback for when data is received on the temp characteristic
    // TODO
   
    temperatureChar.on( 'valuechanged', buffer =>
    {
        //buf = buffer.readUInt16LE().replace()
        temp = buffer.readUint16LE().toString().replace(/(\d+)(\d{2})/, '$1' + '.' + '$2');
        console.log('Received_Temp: ');
        console.log(temp);
        if(listTemp.length >= 360){
            listTemp.shift()
        }
        if(countTemp>3){
            temp = tempCount/countTemp;
            console.log(temp);
            tempToList = temp.toString().substring(0,5);
            listTemp.push(tempToList);
            update(ref(database,'/MghsIE6Ln1OaqiTZZERRV67kAMH2/Environment/'), {'Temperature': listTemp});
            countTemp =1;
            tempCount =0;
        }
        tempCount = tempCount+ parseFloat(temp);
        countTemp = countTemp +1;
        console.log("countTemp");
        console.log(countTemp);

    });
    humidityChar.on( 'valuechanged', buffer =>
    {
        hum = buffer.readUint16LE().toString().replace(/(\d+)(\d{2})/, '$1' + '.' + '$2');
        console.log('Received_Hum: ');
        console.log(hum);
        if(listHum.length >= 360){
            listHum.shift()
        }
        if(countHum>3){
            hum = HumCount/countHum;
            console.log(hum);
            humToList = hum.toString().substring(0,5);
            listHum.push(humToList);
            update(ref(database,'/MghsIE6Ln1OaqiTZZERRV67kAMH2/Environment/'), {'Humidity': listHum});
            countHum =1;
            HumCount =0;
        }
        HumCount = HumCount+ parseFloat(hum);
        countHum = countHum +1;
        console.log("countTemp");
        console.log(countHum);
    });
    weightChar.on( 'valuechanged', buffer =>
    {
        let maxWeight = 0.657;
        let emptyWeight = 0.15;
        let containerWeight = 0.183;
        wei = buffer.readUint16LE().toString();
        temp1 = "0.";
        wei = temp1+wei;
        console.log('Received_Wei: ');
        console.log(wei);

        if(wei <=emptyWeight){
            weiValue = -1 
        }
        else{

            weiValue = (((wei-containerWeight)/(maxWeight-containerWeight))*100).toString().substring(0,5);
        }
        update(ref(database,'/MghsIE6Ln1OaqiTZZERRV67kAMH2/Environment/'), {'Weight': weiValue});
    });
    // Set up listener for console input.
    // When console input is received, write it to TX characteristic
    const stdin = process.openStdin( );
    stdin.addListener( 'data', async function( d )
    {
        let inStr = d.toString( ).trim( );

        // Disconnect and exit if user types 'exit'
        if (inStr === 'exit')
        {
            console.log( 'disconnecting...' );
            await device.disconnect();
            console.log( 'disconnected.' );
            destroy();
            process.exit();
        }

        // Specification limits packets to 20 bytes; truncate string if too long.
        inStr = (inStr.length > 20) ? inStr.slice(0,20) : inStr;

        // Attempt to write/send value to TX characteristic
        await txChar.writeValue(Buffer.from(inStr)).then(() =>
        {
            console.log('Sent: ' + inStr);
        });
    });

}

main().then((ret) =>
{
    if (ret) console.log( ret );
}).catch((err) =>
{
    if (err) console.error( err );
});
